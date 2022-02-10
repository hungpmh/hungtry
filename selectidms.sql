SELECT
    distinct { DocumentRequest }.[Id] AS 'DocumentRequestId',
    { DocumentRequest }.[RequestNo] AS 'RequestNo',
    { DocumentRequest }.[Title] AS 'Title',
    { DocumentRequest }.[Level] AS 'DocumentLevel',
    { DocumentRequest }.[ExpectedEffectiveDate] as 'ExpectEffectiveDate',
    { DocumentRequest }.[RequestStatusId] as 'RequestStatusId',
    { RequestStatus }.[Name] as 'RequestStatus',
    { RequestStatus }.[Color] as 'RequestStatusColor',
    submitterAssign.[AssigneeUserId] as 'SubmitterUserId',
    submitter.[Name] as 'SubmitterName',
    submitterAssign.[CompletedDate] as 'RequestSubmitDate',
    { DocumentRequest }.[CreatedTime] as 'RequestCreatedTime',
    { DocumentRequest }.[LastModifiedBy] as 'LastModifiedBy',
    modifiedBy.[Name] as 'LastModifiedName',
    { DocumentRequest }.[LastModifiedTime] as 'LastModifiedTime',
    { DocumentRequestAssignment }.[AssigneeUserId] as 'PendingFor',
    pendingFor.[Name] as 'PendingForName',
    { DocumentRequestAssignment }.[RequestRoleId] as 'PendingForRoleId',
    { RequestRole }.[Label] as 'PendingForRole',
    { DocumentRequestAssignment }.[AssignedDate] as 'PendingSince',
    complianceAdminAssign.[AssigneeUserId] as 'ComplianceAdminUserId',
    stuff(
        (
            select
                ',' + convert(
                    varchar,
                    { DocumentRequestAssignment }.[AssigneeUserId]
                )
            from
                { DocumentRequestAssignment }
            where
                { DocumentRequestAssignment }.[DocumentRequestId] = { DocumentRequest }.[Id]
                and { DocumentRequestAssignment }.[IsActive] = 1
                and { DocumentRequestAssignment }.[RequestRoleId] = @RequestRoleId_Reviewer for xml path('')
        ),
        1,
        1,
        ''
    ) as 'ReviewerUserIds',
    stuff(
        (
            select
                ',' + convert(
                    varchar,
                    { DocumentRequestAssignment }.[AssigneeUserId]
                )
            from
                { DocumentRequestAssignment }
            where
                { DocumentRequestAssignment }.[DocumentRequestId] = { DocumentRequest }.[Id]
                and { DocumentRequestAssignment }.[IsActive] = 1
                and { DocumentRequestAssignment }.[RequestRoleId] = @RequestRoleId_Approver for xml path('')
        ),
        1,
        1,
        ''
    ) as 'ApproverUserIds',
    case
        when { DocumentRequestAssignment }.[ActivityId] is not null then { DocumentRequestAssignment }.[ActivityId]
        else pendingActivity.[Id]
    end as PendingActivityId,
    { DocumentRequest }.[IssuanceNumber] AS 'IssuanceNumber'
from
    { DocumentRequest }
    join { RequestStatus } on { RequestStatus }.[Id] = { DocumentRequest }.[RequestStatusId]
    join { User } modifiedBy on modifiedBy.[Id] = { DocumentRequest }.[LastModifiedBy]
    join { DocumentRequestAssignment } submitterAssign on submitterAssign.[DocumentRequestId] = { DocumentRequest }.[Id]
    and submitterAssign.[IsActive] = 1
    and submitterAssign.[RequestRoleId] = @RequestRoleId_Submitter
    join { User } submitter on submitter.[Id] = submitterAssign.[AssigneeUserId]
    left join { DocumentRequestAssignment } on { DocumentRequestAssignment }.[DocumentRequestId] = { DocumentRequest }.[Id]
    and { DocumentRequestAssignment }.[IsActive] = 1
    and { DocumentRequestAssignment }.[AssignmentStatusId] = @AssignmentStatusId_Open
    left join { RequestRole } on { RequestRole }.[Id] = { DocumentRequestAssignment }.[RequestRoleId]
    left join { User } pendingFor on pendingFor.[Id] = { DocumentRequestAssignment }.[AssigneeUserId]
    left join { DocumentRequestAssignment } complianceAdminAssign on complianceAdminAssign.[DocumentRequestId] = { DocumentRequest }.[Id]
    and complianceAdminAssign.[IsActive] = 1
    and complianceAdminAssign.[RequestRoleId] = @RequestRoleId_ComplianceAdmin
    left join { Activity } pendingActivity on pendingActivity.[Process_Id] = { DocumentRequest }.[ProcessId]
    and pendingActivity.[Status_Id] in (@ActivityStatusIds_Inbox)
    join { Process } on { Process }.[Id] = { DocumentRequest }.[ProcessId]
where
    1 = 1
    and (
        @SearchKeyword = ''
        or { DocumentRequest }.[RequestNo] like '%' + @SearchKeyword + '%'
        or { DocumentRequest }.[Title] like '%' + @SearchKeyword + '%'
        or { DocumentRequest }.[IssuanceNumber] like '%' + @SearchKeyword + '%'
    )
    and (
        @RequestStatusId = ''
        or { DocumentRequest }.[RequestStatusId] = @RequestStatusId
    )
    and not { DocumentRequest }.[RequestStatusId] = @DeletedRequest
    and (
        @DocumentLevel = ''
        or { DocumentRequest }.[Level] = @DocumentLevel
    )
    and { DocumentRequest }.[LastModifiedTime] >= @From
    and { DocumentRequest }.[LastModifiedTime] <= @To @SearchQuerySubmitter @SearchQueryReviever @SearchQueryApprover
ORDER BY
    @OrderBy OFFSET @PageSize * (@PageNo - 1) ROWS FETCH NEXT @PageSize ROWS ONLY
---
---
