/* Formatted on 9/2/2019 11:06:00 AM (QP5 v5.215.12089.38647) */
DROP SEQUENCE SEQ_VEH_APP_ID;

CREATE SEQUENCE ETDWEB.SEQ_VEH_APP_ID
   START WITH 450
   MAXVALUE 999999999999999999999999999
   MINVALUE 1
   NOCYCLE
   NOCACHE
   NOORDER;


CREATE SEQUENCE ETDWEB.SEQ_online_appiontment_ID
   START WITH 1
   MAXVALUE 999999999999999999999999999
   MINVALUE 1
   NOCYCLE
   NOCACHE
   NOORDER;

CREATE TABLE mvrs_online_appiontment
(
   id           NUMBER PRIMARY KEY,
   window       VARCHAR2 (50) NOT NULL,
   start_time   DATE NOT NULL,
   duration     NUMBER NOT NULL
);


 ALTER TABLE veh_app
 ADD online_appriontment_id NUMBER;


 ALTER TABLE ETDWEB.VEH_APP
 ADD CONSTRAINT VEH_APP_R01
  FOREIGN KEY (ONLINE_APPRIONTMENT_ID)
  REFERENCES ETDWEB.MVRS_ONLINE_APPIONTMENT (ID)
  ENABLE VALIDATE;

INSERT INTO mvrs_online_appiontment
   (SELECT SEQ_online_appiontment_ID.NEXTVAL, x.*
      FROM (    SELECT 'Online Regisrtaion Window I',
                         TRUNC (SYSDATE + 3)
                       + 9.25 / 24
                       + INTERVAL '15' MINUTE * (LEVEL - 1)
                          AS start_time,
                       15
                  FROM DUAL
            CONNECT BY   TRUNC (SYSDATE + 3)
                       + 9.25 / 24
                       + INTERVAL '15' MINUTE * (LEVEL - 1) <=
                          TRUNC (SYSDATE + 3) + 12.75 / 24
            UNION
                SELECT 'Online Regisrtaion Window I',
                         TRUNC (SYSDATE + 3)
                       + 14.25 / 24
                       + INTERVAL '15' MINUTE * (LEVEL - 1)
                          AS start_time,
                       15
                  FROM DUAL
            CONNECT BY   TRUNC (SYSDATE + 3)
                       + 14.25 / 24
                       + INTERVAL '15' MINUTE * (LEVEL - 1) <=
                          TRUNC (SYSDATE + 3) + 15 / 24) x)
--// Select available vacant time
/*
select id , to_char(start_time,'dd/mm/yyyy hh:mi am' ) as time_   from mvrs_online_appiontment
where trunc(start_time) > trunc(sysdate )
and id not in (select nvl(online_appriontment_id,0) from veh_App )
order by start_time
*/


--===================================
grant select, insert, update ,delete  on MVRS_ONLINE_APPIONTMENT to mvrs_access_role ;


CREATE GLOBAL TEMPORARY TABLE MVRS_ONLINE_APPIONTMENT_TEMP (
  id           NUMBER,
  window       VARCHAR2(50),
  start_time   date ,
  duration     number 
)
ON COMMIT DELETE ROWS;

grant select , insert ,update, delete on MVRS_ONLINE_APPIONTMENT_TEMP to mvrs_access_role ;


CREATE SEQUENCE ETDWEB.SEQ_ONLINE_APPIONTMENT_TEMP_ID
  START WITH 1
  MAXVALUE 999999999999999999999999999
  MINVALUE 1
  NOCYCLE
  NOCACHE
  NOORDER;

grant select on SEQ_ONLINE_APPIONTMENT_TEMP_ID to mvrs_access_role ;

INSERT INTO MVRTD_FORMS VALUES
(64.5   , 'ADMINISTRATION',    55.5 ,   'ONLINE APPIONTMENT SLOTS'  ,  'gen_time_slots.fmx' ) ;