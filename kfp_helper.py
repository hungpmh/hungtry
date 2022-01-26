"""All KFP helpers."""

import logging
import sys

logging.basicConfig(level=logging.INFO)
import kfp

JOB_TYPES = ["PIPELINE_VERSION", "PIPELINE"]


def get_or_create_pipeline(client,
                           pipeline_name: str, pipeline_description: str, version: str):
    """
    Get the latest or create a new pipeline version.

    Parameters:
    ---
    client: (object) KFP Client.
    pipeline_name: (string)
    pipeline_description: (string)
    version: (string)

    Returns:
    ---
    pipeline_version: (object) Latest KFP pipeline
    """
    logging.info(f"Namespace: {client.get_user_namespace()}")
    pipeline_package_path = f"pipeline_{version}.yaml"
    pipeline = None
    pipeline_version = None
    pipeline_id = client.get_pipeline_id(pipeline_name)

    # If no pipeline found by name, create a new pipeline
    # Else get the latest pipeline version
    if pipeline_id is None:
        logging.info(f"Creating pipeline {pipeline_name}")
        pipeline = client.upload_pipeline(
            pipeline_package_path=pipeline_package_path,
            pipeline_name=pipeline_name,
            description=pipeline_description
        )
        pipeline_id = pipeline.id
        client.pipelines.delete_pipeline_version(pipeline_id)
    else:
        pipeline = client.get_pipeline(pipeline_id)

    # Always try to upload a pipeline version.
    try:
        pipeline_version = client.upload_pipeline_version(
            pipeline_package_path=pipeline_package_path,
            pipeline_version_name=f"{pipeline_name} {version}",
            pipeline_id=pipeline_id
        )
    except ValueError as e:
        # none or both of pipeline_id and pipeline_name are specified
        logging.info(f"[Error] Failed to upload version {pipeline_name} {version}: {e}")
        sys.exit(1)
    except Exception as e:
        logging.info(f"[Exception] Failed to upload version {pipeline_name} {version}: {e}")

    if pipeline_version is None:
        pipeline_version = pipeline.default_version

    return pipeline_version


def get_or_create_experiment(client, name: str):
    """
    Get or create a new experiment by name.

    Parameters:
    ---
    client: (object) KFP Client.
    name: (string) Experiment name.

    Returns:
    ---
    experiment: (object) An experiment.
    """
    try:
        experiment = client.get_experiment(
            experiment_name=name
        )
    except Exception:
        logging.info(f"Creating new experiment: {name}")
        experiment = client.create_experiment(name)

    return experiment


def disable_last_recurring_run(client: kfp.Client, experiment_id: str, resource_id: str):
    """
    Create a new recurring job and disable all previous version.

    Parameters:
    ---
    client: (object) KFP Client
    """
    version_ids = _find_sibling_versions(client=client, pipeline_version=resource_id)

    result = client.list_recurring_runs(experiment_id=experiment_id, sort_by='created_at desc').jobs

    # Get list of (job_id, count), count = number of keys which in pipeline JOB_TYPES
    ds = map(lambda x: (f"{x.id}", len(list(_find_jobs(version_ids[0:3], x.resource_references)))), result)
    jobs = list(map(lambda x: x[0], filter(lambda y: y[1] > 0, ds)))

    for j in jobs:
        logging.info(f"Disabling job {j}")
        client.jobs.disable_job(j)


def _find_sibling_versions(client: kfp.Client, pipeline_version: str):
    pv = client.pipelines.get_pipeline_version(version_id=pipeline_version)
    ps = filter(lambda x: x.key.type == 'PIPELINE', pv.resource_references)
    pipeline_id = list(ps)[0].key.id

    pvs = client.pipelines.list_pipeline_versions(resource_key_type="PIPELINE", resource_key_id=pipeline_id, sort_by="created_at desc")
    return list(map(lambda x: x.id, pvs.versions))


def _find_jobs(version_ids: [], resource_refs):
    return filter(lambda y: (y.key.type in JOB_TYPES and y.key.id in version_ids), resource_refs)
