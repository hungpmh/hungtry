`onemg-data-playground.hungpm11.

select 
ord.ORDER_DATE, ord.ORDER_TOTAL,
cus.NAME, cus.ADDRESS, 
con.EMAIL, con.PHONE, 
ordit.QUANTITY, ordit.QUANTITY*ordit.UNIT_PRICE, 
pro.PRODUCT_NAME, 
procat.CATEGORY_NAME

select ord.ORDER_DATE, ord.ORDER_TOTAL,
cus.NAME, cus.ADDRESS, 
con.EMAIL, con.PHONE, 
ordit.QUANTITY, ordit.QUANTITY*ordit.UNIT_PRICE, 
pro.PRODUCT_NAME, 
procat.CATEGORY_NAME
from `onemg-data-playground.hungpm11.ORDERS` as ord
left join `onemg-data-playground.hungpm11.CUSTOMERS` as cus on ord.customer_id = cus.customer_id
left join `onemg-data-playground.hungpm11.CONTACTS` as con on cus.customer_id = con.customer_id
left join `onemg-data-playground.hungpm11.ORDER_ITEMS` as ordit on ord.order_id = ordit.order_id
left join `onemg-data-playground.hungpm11.PRODUCTS` as pro on ordit.product_id = pro.product_id
left join `onemg-data-playground.hungpm11.PRODUCT_CATEGORIES` as procat on pro.category_id = procat.category_id;


select ord.ORDER_DATE, countPRODUCT_NAME as OrderTotal,
cus.NAME, cus.ADDRESS, 
con.EMAIL, con.PHONE, 
ordit.QUANTITY, ordit.QUANTITY*ordit.UNIT_PRICE, 
pro.PRODUCT_NAME, 
procat.CATEGORY_NAME
from `onemg-data-playground.hungpm11.ORDERS` as ord
left join `onemg-data-playground.hungpm11.CUSTOMERS` as cus on ord.customer_id = cus.customer_id
left join `onemg-data-playground.hungpm11.CONTACTS` as con on cus.customer_id = con.customer_id
left join `onemg-data-playground.hungpm11.ORDER_ITEMS` as ordit on ord.order_id = ordit.order_id
left join `onemg-data-playground.hungpm11.PRODUCTS` as pro on ordit.product_id = pro.product_id
left join `onemg-data-playground.hungpm11.PRODUCT_CATEGORIES` as procat on pro.category_id = procat.category_id
group by pro.PRODUCT_NAME;

select ord.order_date,cus.NAME, cus.ADDRESS, con.EMAIL, con.PHONE, pro.PRODUCT_NAME,count(pro.PRODUCT_NAME) as TotalOrder, ordit.QUANTITY*ordit.UNIT_PRICE, procat.category_name
from `onemg-data-playground.hungpm11.PRODUCTS` as pro
join `onemg-data-playground.hungpm11.ORDER_ITEMS` as ordit on pro.product_id = ordit.product_id
join `onemg-data-playground.hungpm11.ORDERS` as ord on ordit.order_id = ord.order_id
join `onemg-data-playground.hungpm11.CUSTOMERS` as cus on ord.customer_id = cus.customer_id
join `onemg-data-playground.hungpm11.CONTACTS` as con on cus.customer_id = con.customer_id
join `onemg-data-playground.hungpm11.PRODUCT_CATEGORIES` as procat on pro.category_id = procat.category_id
group by pro.product_name, ord.order_date, cus.NAME, cus.address,con.EMAIL, con.PHONE, procat.category_name;

select ord.order_date,cus.NAME, cus.ADDRESS, con.EMAIL, con.PHONE, pro.PRODUCT_NAME,count(pro.PRODUCT_NAME) as TotalOrder, ordit.UNIT_PRICE, count(pro.PRODUCT_NAME) *  ordit.UNIT_PRICE, , procat.category_name
from `onemg-data-playground.hungpm11.PRODUCTS` as pro
join `onemg-data-playground.hungpm11.ORDER_ITEMS` as ordit on pro.product_id = ordit.product_id
join `onemg-data-playground.hungpm11.ORDERS` as ord on ordit.order_id = ord.order_id
join `onemg-data-playground.hungpm11.CUSTOMERS` as cus on ord.customer_id = cus.customer_id
join `onemg-data-playground.hungpm11.CONTACTS` as con on cus.customer_id = con.customer_id
join `onemg-data-playground.hungpm11.PRODUCT_CATEGORIES` as procat on pro.category_id = procat.category_id
group by pro.product_name, ord.order_date, cus.NAME, cus.address,con.EMAIL, con.PHONE,ordit.UNIT_PRICE, procat.category_name;

select cus.customer_id, cus.name, Doanh thu, ordit.quantity*ordit.unit_price
from `onemg-data-playground.hungpm11.ORDERS` as ord and `onemg-data-playground.hungpm11.CUSTOMERS` as cus
where cus.customer_id = ord.customer_id
join `onemg-data-playground.hungpm11.ORDER_ITEMS` as ordit on ord.order_id = ordit.order_id
group by cus.customer_id, cus.name;

select emp.EMPLOYEE_ID
from `onemg-data-playground.hungpm11.ORDERS` as ord
left join `onemg-data-playground.hungpm11.EMPLOYEES` as emp on emp.employee_id = ord.salesman_id
left join `onemg-data-playground.hungpm11.ORDER_ITEMS` as ordit on ord.order_id = ordit.order_id
group by emp.EMPLOYEE_ID;

select *
from `onemg-data-playground.hungpm11.PRODUCTS` as pro
left join `onemg-data-playground.hungpm11.PRODUCT_CATEGORIES` as procat on pro.category_id = procat.category_id
left join `onemg-data-playground.hungpm11.INVENTORIES` as inv on pro.product_id = inv.product_id;

select *
from `onemg-data-playground.hungpm11.EMPLOYEES` as emp
left join `onemg-data-playground.hungpm11.ORDERS` as ord on emp.employee_id = ord.salesman_id;

select *
from `onemg-data-playground.hungpm11.EMPLOYEES` as emp
where emp.JOB_TITLE = 'Sales Presentative';

(select emp.EMPLOYEE_ID, emp.FIRST_NAME
from `onemg-data-playground.hungpm11.EMPLOYEES` as emp
where emp.JOB_TITLE = 'Sales Representative'
order by emp.JOB_TITLE)
UNION
(select cus.CUSTOMER_ID, cus.NAME
from `onemg-data-playground.hungpm11.CUSTOMERS` as cus
order by cus.CUSTOMER_ID);
where cus.CREDIT_LIMIT >=2000

select *
from `onemg-data-playground.hungpm11.khach_hang` as kh
where not exists 
(select ID_don_hang 
FROM `onemg-data-playground.hungpm11.don_hang` as dh
WHERE dh.ID_khach_hang = kh.ID);

select * 
from `onemg-data-playground.hungpm11.khach_hang` as kh
join `onemg-data-playground.hungpm11.don_hang` as dh 
on kh.id = dh.id_khach_hang; 

---Thuc hanh exists 3
select *
from `onemg-data-playground.hungpm11.khach_hang` as kh
where not exists 
(select ID_don_hang 
FROM `onemg-data-playground.hungpm11.don_hang` as dh
WHERE dh.ID_khach_hang = kh.ID
AND dh.ngay_dat > '2018-07-30'
AND dh.ngay_dat < '2018-09-01')
INTERSECT DISTINCT
select * from `onemg-data-playground.hungpm11.khach_hang` as kh
where exists
(select ID_don_hang 
FROM `onemg-data-playground.hungpm11.don_hang` as dh
WHERE dh.ID_khach_hang = kh.ID
AND dh.ngay_dat < '2018-07-30'
AND dh.ngay_dat > '2018-07-01');

---Thuc hanh exists 4
select *
from `onemg-data-playground.hungpm11.khach_hang` as kh
where not exists 
(select ID_don_hang 
FROM `onemg-data-playground.hungpm11.don_hang` as dh
WHERE dh.ID_khach_hang = kh.ID
AND dh.ngay_dat > '2018-07-30'
AND dh.ngay_dat < '2018-09-01')
INTERSECT DISTINCT
select * from `onemg-data-playground.hungpm11.khach_hang` as kh
where not exists
(select ID_don_hang 
FROM `onemg-data-playground.hungpm11.don_hang` as dh
WHERE dh.ID_khach_hang = kh.ID
AND dh.ngay_dat < '2018-07-30'
AND dh.ngay_dat > '2018-07-01');

---Thuc hanh exists 4
select *
from `onemg-data-playground.hungpm11.khach_hang` as kh
where exists 
(select ID_don_hang 
FROM `onemg-data-playground.hungpm11.don_hang` as dh
WHERE dh.ID_khach_hang = kh.ID
AND dh.ngay_dat > '2018-07-30'
AND dh.ngay_dat < '2018-09-01')
INTERSECT DISTINCT
select * from `onemg-data-playground.hungpm11.khach_hang` as kh
where exists
(select ID_don_hang 
FROM `onemg-data-playground.hungpm11.don_hang` as dh
WHERE dh.ID_khach_hang = kh.ID
AND dh.ngay_dat < '2018-07-30'
AND dh.ngay_dat > '2018-07-01');

---Thuc hanh exists 5
select *
from `onemg-data-playground.hungpm11.khach_hang` as kh
where exists 
(select ID_don_hang 
FROM `onemg-data-playground.hungpm11.don_hang` as dh
WHERE dh.ID_khach_hang = kh.ID
AND dh.ngay_dat > '2018-07-30'
AND dh.ngay_dat < '2018-09-01')
INTERSECT DISTINCT
select * from `onemg-data-playground.hungpm11.khach_hang` as kh
where not exists
(select ID_don_hang 
FROM `onemg-data-playground.hungpm11.don_hang` as dh
WHERE dh.ID_khach_hang = kh.ID
AND dh.ngay_dat < '2018-07-30'
AND dh.ngay_dat > '2018-07-01');

---Thuc hanh exists 6
select *
from `onemg-data-playground.hungpm11.khach_hang` as kh
where exists 
(select ID_don_hang 
FROM `onemg-data-playground.hungpm11.don_hang` as dh
WHERE dh.ID_khach_hang = kh.ID
AND dh.ngay_dat > '2018-09-01'
AND dh.ngay_dat < '2018-10-01')
INTERSECT DISTINCT
select * from `onemg-data-playground.hungpm11.khach_hang` as kh
where not exists
(select ID_don_hang 
FROM `onemg-data-playground.hungpm11.don_hang` as dh
WHERE dh.ID_khach_hang = kh.ID
AND dh.ngay_dat < '2018-09-01');

---With Clause 1
With Doanh_thu_SP as
(select pro.product_id, pro.product_name,sum(ordit.quantity*ordit.unit_price) as tong 
from `onemg-data-playground.hungpm11.PRODUCTS` pro
left join `onemg-data-playground.hungpm11.ORDER_ITEMS` ordit
on pro.product_id = ordit.product_id
group by pro.PRODUCT_ID, pro.PRODUCT_NAME),
Doanh_thu_toan_bo as
(select sum(ordit.quantity*ordit.unit_price) as sum1 
from `onemg-data-playground.hungpm11.ORDER_ITEMS` ordit
group by sum1);
select *, DTS.tong/sum1 from Doanh_thu_SP as DTS, Doanh_thu_toan_bo as DTTB;

---With clause 2
With Doanh_thu_SP as
(select pro.product_id, pro.product_name,sum(ordit.quantity*ordit.unit_price) as tong 
from `onemg-data-playground.hungpm11.PRODUCTS` pro
left join `onemg-data-playground.hungpm11.ORDER_ITEMS` ordit
on pro.product_id = ordit.product_id
group by pro.PRODUCT_ID, pro.PRODUCT_NAME),
Doanh_thu_toan_bo as
(select sum(ordit.quantity*ordit.unit_price) as sum1 
from `onemg-data-playground.hungpm11.ORDER_ITEMS` ordit
group by sum1);
select *, DTS.tong/sum1 from Doanh_thu_SP as DTS, Doanh_thu_toan_bo as DTTB;



