-- MySQL Workbench Synchronization
-- Generated: 2019-12-20 13:37
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: alex_

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `bizmatchapp`.`User` (
  `id` CHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` CHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `birthday` DATE NOT NULL,
  `country` VARCHAR(20) NOT NULL,
  `city` VARCHAR(30) NOT NULL,
  `avatar_url` VARCHAR(255) NULL DEFAULT NULL,
  `company_name` VARCHAR(255) NULL DEFAULT NULL,
  `company_role` VARCHAR(255) NULL DEFAULT NULL,
  `page_url` VARCHAR(512) NULL DEFAULT NULL,
  `type` CHAR(1) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `bizmatchapp`.`Project` (
  `id` CHAR(36) NOT NULL,
  `title` VARCHAR(60) NOT NULL,
  `subtitle` VARCHAR(135) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `ubication` VARCHAR(60) NOT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `video_url` VARCHAR(255) NULL DEFAULT NULL,
  `prize` VARCHAR(20) NULL DEFAULT NULL,
  `duration` CHAR(3) NOT NULL,
  `text` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  `user_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Project_User_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Project_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `bizmatchapp`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `bizmatchapp`.`Comentario` (
  `id` CHAR(36) NOT NULL,
  `text` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  `user_id` CHAR(36) NOT NULL,
  `project_id` CHAR(36) NOT NULL,
  INDEX `fk_Comentario_User1_idx` (`user_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_Comentario_Project1`
    FOREIGN KEY (`project_id`)
    REFERENCES `bizmatchapp`.`Project` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `bizmatchapp`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `bizmatchapp`.`Mensaje` (
  `id` CHAR(36) NOT NULL,
  `message` TEXT(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `origin_id` CHAR(36) NOT NULL,
  `destination_id` CHAR(36) NOT NULL,
  INDEX `fk_Mensaje_User2_idx` (`destination_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_Mensaje_User1`
    FOREIGN KEY (`origin_id`)
    REFERENCES `bizmatchapp`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mensaje_User2`
    FOREIGN KEY (`destination_id`)
    REFERENCES `bizmatchapp`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `bizmatchapp`.`Reward` (
  `id` CHAR(36) NOT NULL,
  `project_id` CHAR(36) NOT NULL,
  `prize` VARCHAR(20) NOT NULL,
  `title` VARCHAR(60) NOT NULL,
  `month` VARCHAR(20) NOT NULL,
  `year` VARCHAR(10) NOT NULL,
  `subtitle` VARCHAR(135) NOT NULL,
  INDEX `fk_table1_Project1_idx` (`project_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_table1_Project1`
    FOREIGN KEY (`project_id`)
    REFERENCES `bizmatchapp`.`Project` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `bizmatchapp`.`user_reward` (
  `id` CHAR(36) NOT NULL,
  `User_id` CHAR(36) NOT NULL,
  `Reward_id` CHAR(36) NOT NULL,
  INDEX `fk_User_has_Reward_Reward1_idx` (`Reward_id` ASC) VISIBLE,
  INDEX `fk_User_has_Reward_User1_idx` (`User_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Reward_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `bizmatchapp`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Reward_Reward1`
    FOREIGN KEY (`Reward_id`)
    REFERENCES `bizmatchapp`.`Reward` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `bizmatchapp`.`Assesment` (
  `id` CHAR(36) NOT NULL,
  `type` CHAR(1) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `project_id` CHAR(36) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `modified_at` DATETIME NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Assesment_User1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_Assesment_Project1_idx` (`project_id` ASC) VISIBLE,
  CONSTRAINT `fk_Assesment_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `bizmatchapp`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Assesment_Project1`
    FOREIGN KEY (`project_id`)
    REFERENCES `bizmatchapp`.`Project` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
