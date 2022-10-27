/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/10/26 15:29:31                          */
/*==============================================================*/


drop table if exists NF_DEF_PROCESS;

drop table if exists NF_NODE;

drop table if exists NF_PROCESS;

drop table if exists NF_RESOURCE;

/*==============================================================*/
/* Table: NF_DEF_PROCESS                                        */
/*==============================================================*/
create table NF_DEF_PROCESS
(
   PROCESS_DEF_ID       bigint not null auto_increment,
   DEF_NAME             varchar(255),
   KEYWORDS             varchar(256),
   DEF_TYPE             varchar(256),
   CREATE_TIME          bigint,
   UPD_TIME             bigint,
   CFG_STR              varchar(4000) comment '流程定义json串',
   DUE_TIME             bigint,
   VER                  bigint,
   primary key (PROCESS_DEF_ID)
);

/*==============================================================*/
/* Table: NF_NODE                                               */
/*==============================================================*/
create table NF_NODE
(
   NODE_ID              bigint not null auto_increment,
   PROCESS_ID           bigint,
   NODE_NAME            varchar(255),
   DEF_NAME             varchar(255),
   START_TIME           bigint,
   END_TIME             bigint,
   WAIT_TIME            bigint,
   ASSIGNEE             bigint,
   CANDIDATE_USERS      varchar(2048) comment '多个id用”,“ 分隔',
   CANDIDATE_GROUPS     varchar(2048) comment '多个id用”,“ 分隔',
   VER                  bigint,
   primary key (NODE_ID)
);

/*==============================================================*/
/* Table: NF_PROCESS                                            */
/*==============================================================*/
create table NF_PROCESS
(
   PROCESS_ID           bigint not null auto_increment,
   PROCESS_DEF_ID       bigint,
   PROCESS_NAME         varchar(64),
   START_TIME           bigint,
   END_TIME             bigint,
   HANDLE_TIME          bigint comment '单位为ms',
   CREATE_TIME          bigint,
   DELETE_TIME          bigint,
   DELETE_REASON        varchar(2048),
   DUE_TIME             bigint,
   VARIABLES            varchar(4000) comment '变量json串',
   VER                  bigint,
   primary key (PROCESS_ID)
);

/*==============================================================*/
/* Table: NF_RESOURCE                                           */
/*==============================================================*/
create table NF_RESOURCE
(
   RESOURCE_ID          bigint not null auto_increment,
   NODE_INST_ID         bigint,
   RESOURCE_NAME        varchar(256),
   RESOURCE_BYTE        blob comment '存放大文本',
   VER                  bigint,
   primary key (RESOURCE_ID)
);

alter table NF_NODE add constraint FK_NODE_REF_PROCESS foreign key (PROCESS_ID)
      references NF_PROCESS (PROCESS_ID) on delete cascade on update cascade;

alter table NF_PROCESS add constraint FK_Reference_3 foreign key (PROCESS_DEF_ID)
      references NF_DEF_PROCESS (PROCESS_DEF_ID) on update cascade;

alter table NF_RESOURCE add constraint FK_RESOURCE_REF_NODE foreign key (NODE_INST_ID)
      references NF_NODE (NODE_ID) on delete cascade on update cascade;


/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/10/26 15:54:32                          */
/*==============================================================*/


drop table if exists NF_GROUP;

drop table if exists NF_GROUP_USER;

drop table if exists NF_USER;

/*==============================================================*/
/* Table: NF_GROUP                                              */
/*==============================================================*/
create table NF_GROUP
(
   GROUP_ID             bigint not null auto_increment,
   GROUP_NAME           varchar(64),
   REMARKS              varchar(256),
   VER                  bigint,
   primary key (GROUP_ID)
);

/*==============================================================*/
/* Table: NF_GROUP_USER                                         */
/*==============================================================*/
create table NF_GROUP_USER
(
   ID_                  bigint not null auto_increment,
   USER_ID              bigint,
   GROUP_ID             bigint,
   primary key (ID_)
);

/*==============================================================*/
/* Table: NF_USER                                               */
/*==============================================================*/
create table NF_USER
(
   USER_ID              bigint not null auto_increment,
   USER_NAME            varchar(64),
   REAL_NAME            varchar(255),
   EMAIL                varchar(32),
   USER_PWD             varchar(32),
   ENABLED              tinyint(1),
   VER                  bigint,
   primary key (USER_ID)
);

alter table NF_GROUP_USER add constraint FK_GUSER_REF_GROUP foreign key (GROUP_ID)
      references NF_GROUP (GROUP_ID) on delete cascade on update cascade;

alter table NF_GROUP_USER add constraint FK_GUSER_REF_USER foreign key (USER_ID)
      references NF_USER (USER_ID) on delete cascade on update cascade;
