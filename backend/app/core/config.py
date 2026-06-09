from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DATABASE_URL: str = "postgresql+asyncpg://dataco:dataco_secret@localhost:5432/supplychain"
    SYNC_DATABASE_URL: str = "postgresql://dataco:dataco_secret@localhost:5432/supplychain"
    SECRET_KEY: str = "changeme"
    ENVIRONMENT: str = "development"
    MODEL_DIR: str = "/app/models"
    DATA_DIR: str = "/data"


settings = Settings()
