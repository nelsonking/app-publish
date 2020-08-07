CREATE TABLE `apps` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'APP 名称',
  `bundle_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'iOS bundle_id',
  `bundle_version` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'iOS bundle-version',
  `type` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '类型 1 安卓 2 iOS',
  `icon` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '图标',
  `plist` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '下载地址',
  `size` int unsigned NOT NULL DEFAULT '0' COMMENT '应用大小',
  `version` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '版本号',
  `version_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '排序版本号',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2020/08/07
ALTER TABLE `apps`
ADD COLUMN `app_code` varchar(255) NOT NULL DEFAULT '' COMMENT '应用唯一编码' AFTER `name`;

update apps set app_code = SUBSTR(md5(bundle_id), 9,16) where id <= 12