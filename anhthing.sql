with reg_serv as (
  select *
  from(
      SELECT id,
        merchant_id,
        REGISTER_SERVICE_ID,
        STATUS,
        UPDATED_AT,
        ROW_NUMBER() OVER (
          PARTITION BY MERCHANT_ID,
          REGISTER_SERVICE_ID,
          STATUS
          ORDER BY UPDATED_AT desc
        ) rn
      FROM merchant_service.MERCHANT_REGISTER_SERVICES
    )
  where rn = 1
),
voucher as (
  select id,
    CREATED_AT,
    MERCHANT_ID,
    IS_ACTIVE,
    AVAILABLE_FROM,
    AVAILABLE_TO
  from(
      select id,
        CREATED_AT,
        MERCHANT_ID,
        IS_ACTIVE,
        AVAILABLE_FROM,
        AVAILABLE_TO,
        row_number() OVER (
          PARTITION BY MERCHANT_ID
          ORDER BY CREATED_AT desc
        ) rn
      from cms_service.voucher @STG2
    )
  where rn = 1
),
contact as (
  select
    /*ContactTypeRepresent    = 1
     ContactTypeContactPoint = 2
     ContactTypeBusinessMan  = 3 */
    MERCHANT_ID,
    count(name) count_name,
    count(phone) count_phone,
    count(email) count_email
  from merchant_service.contact_pii
  where type = 2
  group by merchant_id
)
Select m.id merchant_id,
  m.code merchant_code,
  m.domain_config_id,
  LISTAGG(rs.NAME, '; ') service_name,
  LISTAGG(rs.domain_id, '; ') domain_id,
  LISTAGG(rs.DISPLAY_NAME, '; ') domain_display_name,
  m.created_at merchant_created,
  m.status merchant_status,
  v.IS_ACTIVE voucher_active,
  v.AVAILABLE_FROM voucher_AVAILABLE_FROM,
  v.AVAILABLE_TO voucher_available_to,
  c.count_name,
  count_phone,
  count_email
From merchant_service.MERCHANT_PII m
  left join reg_serv s on (m.id = s.MERCHANT_ID)
  left join merchant_service.REGISTER_SERVICE rs on (rs.id = s.REGISTER_SERVICE_ID)
  left join voucher v on (m.id = v.merchant_id)
  left join contact c on (m.id = c.merchant_id)
where s.status = 'ACTIVE' --and m.id=860
group by m.id,
  m.id,
  m.code,
  m.domain_config_id,
  m.created_at,
  m.status,
  v.IS_ACTIVE,
  v.AVAILABLE_FROM,
  v.AVAILABLE_TO,
  c.count_name,
  count_phone,
  count_email;