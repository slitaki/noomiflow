SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for nf_def_process
-- ----------------------------
DROP TABLE IF EXISTS `nf_def_process`;
CREATE TABLE `nf_def_process`  (
  `PROCESS_DEF_ID` bigint NOT NULL AUTO_INCREMENT,
  `DEF_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `KEYWORDS` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `DEF_TYPE` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `CREATE_TIME` bigint NULL DEFAULT NULL,
  `UPD_TIME` bigint NULL DEFAULT NULL,
  `CFG_STR` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '流程定义json串',
  `DUE_TIME` bigint NULL DEFAULT NULL,
  `VER` bigint NULL DEFAULT NULL,
  `IS_SUSPEND` int NULL DEFAULT NULL,
  PRIMARY KEY (`PROCESS_DEF_ID`) USING BTREE
);
-- ----------------------------
-- Table structure for nf_group
-- ----------------------------
DROP TABLE IF EXISTS `nf_group`;
CREATE TABLE `nf_group`  (
  `GROUP_ID` bigint NOT NULL AUTO_INCREMENT,
  `GROUP_NAME` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `REMARKS` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `VER` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`GROUP_ID`) USING BTREE
);

-- ----------------------------
-- Table structure for nf_group_user
-- ----------------------------
DROP TABLE IF EXISTS `nf_group_user`;
CREATE TABLE `nf_group_user`  (
  `ID_` bigint NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint NULL DEFAULT NULL,
  `GROUP_ID` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`ID_`) USING BTREE,
  INDEX `FK_GUSER_REF_GROUP`(`GROUP_ID`) USING BTREE,
  INDEX `FK_GUSER_REF_USER`(`USER_ID`) USING BTREE,
  CONSTRAINT `FK_GUSER_REF_GROUP` FOREIGN KEY (`GROUP_ID`) REFERENCES `nf_group` (`GROUP_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_GUSER_REF_USER` FOREIGN KEY (`USER_ID`) REFERENCES `nf_user` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ;

-- ----------------------------
-- Table structure for nf_hi_node_inst
-- ----------------------------
DROP TABLE IF EXISTS `nf_hi_node_inst`;
CREATE TABLE `nf_hi_node_inst`  (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `PROCESS_DEF_ID` bigint NULL DEFAULT NULL,
  `PROCESS_ID` bigint NULL DEFAULT NULL,
  `NODE_ID` bigint NULL DEFAULT NULL,
  `ASSIGNEE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `START_TIME` bigint NULL DEFAULT NULL,
  `END_TIME` bigint NULL DEFAULT NULL,
  `DURATION_TIME` bigint NULL DEFAULT NULL,
  `NODE_TYPE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `NODE_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `DELETE_STATUS` int NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
);

-- ----------------------------
-- Table structure for nf_hi_proc_inst
-- ----------------------------
DROP TABLE IF EXISTS `nf_hi_proc_inst`;
CREATE TABLE `nf_hi_proc_inst`  (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `PROCESS_ID` bigint NULL DEFAULT NULL,
  `PROC_DEF_ID` bigint NULL DEFAULT NULL,
  `START_TIME` bigint NULL DEFAULT NULL,
  `END_TIME` bigint NULL DEFAULT NULL,
  `DURATION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `NAME_` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
);

-- ----------------------------
-- Table structure for nf_node
-- ----------------------------
DROP TABLE IF EXISTS `nf_node`;
CREATE TABLE `nf_node`  (
  `NODE_ID` bigint NOT NULL AUTO_INCREMENT,
  `PROCESS_ID` bigint NOT NULL,
  `NODE_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `DEF_ID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `START_TIME` bigint NULL DEFAULT NULL,
  `END_TIME` bigint NULL DEFAULT NULL,
  `WAIT_TIME` bigint NULL DEFAULT NULL,
  `ASSIGNEE` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `CANDIDATE_USERS` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '多个id用”,“ 分隔',
  `CANDIDATE_GROUPS` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '多个id用”,“ 分隔',
  `VER` bigint NULL DEFAULT NULL,
  `VARIABLES` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `IS_AGREE` int NULL DEFAULT NULL,
  `REASON` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `USER_ID` bigint NULL DEFAULT NULL,
  `OWNER` bigint NULL DEFAULT NULL,
  `PRIORITY` int NULL DEFAULT NULL,
  `NODE_TYPE` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`NODE_ID`) USING BTREE,
  INDEX `FK_NODE_REF_PROCESS`(`PROCESS_ID`) USING BTREE,
  INDEX `CANDIDATE_GROUPS`(`CANDIDATE_GROUPS`) USING BTREE,
  CONSTRAINT `FK_NODE_REF_PROCESS` FOREIGN KEY (`PROCESS_ID`) REFERENCES `nf_process` (`PROCESS_ID`) ON DELETE CASCADE ON UPDATE CASCADE
); 

-- ----------------------------
-- Table structure for nf_process
-- ----------------------------
DROP TABLE IF EXISTS `nf_process`;
CREATE TABLE `nf_process`  (
  `PROCESS_ID` bigint NOT NULL AUTO_INCREMENT,
  `PROCESS_DEF_ID` bigint NULL DEFAULT NULL,
  `PROCESS_NAME` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `START_TIME` bigint NULL DEFAULT NULL,
  `END_TIME` bigint NULL DEFAULT NULL,
  `HANDLE_TIME` bigint NULL DEFAULT NULL COMMENT '单位为ms',
  `CREATE_TIME` bigint NULL DEFAULT NULL,
  `CURRENT_ID` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `DELETE_TIME` bigint NULL DEFAULT NULL,
  `DELETE_REASON` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `DUE_TIME` bigint NULL DEFAULT NULL,
  `VARIABLES` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '变量json串',
  `VER` bigint NULL DEFAULT NULL,
  `IS_ACTIVE` int NULL DEFAULT NULL,
  `USER_ID` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `INST_NUMBER` bigint NULL DEFAULT NULL,
  `COMINST_NUMBER` bigint NULL DEFAULT NULL,
  `ACTINST_NUMBER` bigint NULL DEFAULT NULL,
  `INCOM_PARAMS` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`PROCESS_ID`) USING BTREE,
  INDEX `FK_Reference_3`(`PROCESS_DEF_ID`) USING BTREE,
  CONSTRAINT `FK_Reference_3` FOREIGN KEY (`PROCESS_DEF_ID`) REFERENCES `nf_def_process` (`PROCESS_DEF_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
); 

-- ----------------------------
-- Table structure for nf_resource
-- ----------------------------
DROP TABLE IF EXISTS `nf_resource`;
CREATE TABLE `nf_resource`  (
  `RESOURCE_ID` bigint NOT NULL AUTO_INCREMENT,
  `NODE_INST_ID` bigint NULL DEFAULT NULL,
  `RESOURCE_NAME` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `RESOURCE_BYTE` blob NULL COMMENT '存放大文本',
  `VER` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`RESOURCE_ID`) USING BTREE,
  INDEX `FK_RESOURCE_REF_NODE`(`NODE_INST_ID`) USING BTREE,
  CONSTRAINT `FK_RESOURCE_REF_NODE` FOREIGN KEY (`NODE_INST_ID`) REFERENCES `nf_node` (`NODE_ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ----------------------------
-- Table structure for nf_user
-- ----------------------------
DROP TABLE IF EXISTS `nf_user`;
CREATE TABLE `nf_user`  (
  `USER_ID` bigint NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `REAL_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `EMAIL` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `USER_PWD` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `ENABLED` tinyint(1) NULL DEFAULT NULL,
  `VER` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`USER_ID`) USING BTREE,
  UNIQUE INDEX `USER_NAME`(`USER_NAME`) USING BTREE
); 

SET FOREIGN_KEY_CHECKS = 1;