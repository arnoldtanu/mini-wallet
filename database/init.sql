-- c:\sqlite>sqlite3

CREATE TABLE `Wallet` (
	`userId` TEXT(20) NOT NULL,
	`walletEnabled` INT(1) NOT NULL,
	`walletUpdateDate` TEXT(20) NOT NULL,
	`createdAt` TEXT(20) NOT NULL,
	`updatedAt` TEXT(20) NOT NULL,
	PRIMARY KEY (`userId`)
);

CREATE TABLE `Trans` (
	`id` TEXT(20) NOT NULL,
	`userId` TEXT(20) NOT NULL,
	`transDate` TEXT(20) NOT NULL,
	`transTypeId` INT(20) NOT NULL,
	`amount` INT(20) NOT NULL,
	`balance` INT(20) NOT NULL,
	`refId` VARCHAR(35),
	PRIMARY KEY (`id`)
);

CREATE TABLE `TransType` (
	`id` INT(3) NOT NULL,
	`name` TEXT(20) NOT NULL,
	`flag` TEXT(1) NOT NULL,
	`createdAt` TEXT(20) NOT NULL,
	`updatedAt` TEXT(20) NOT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `TransType` (`id`, `name`, `flag`, `createdAt`, `updatedAt`) VALUES
(1, "Enable Wallet", "+", "2022-12-19T07:08:09Z", "2022-12-19T07:08:09Z"),
(2, "Disable Wallet", "-", "2022-12-19T07:08:09Z", "2022-12-19T07:08:09Z"),
(3, "Topup", "+", "2022-12-19T07:08:09Z", "2022-12-19T07:08:09Z"),
(4, "Withdraw", "-", "2022-12-19T07:08:09Z", "2022-12-19T07:08:09Z");

CREATE TABLE `Token` (
	`token` TEXT(64) NOT NULL,
	`userId` TEXT(20) NOT NULL,
	`createdAt` TEXT(20) NOT NULL,
	`expiredAt` TEXT(20) NOT NULL,
	PRIMARY KEY (`token`)
);