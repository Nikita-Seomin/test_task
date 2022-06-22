-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `created_at` DATE NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`chat` (
  `idChat` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `created_at` DATE NOT NULL,
  PRIMARY KEY (`idChat`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`message` (
  `idMessage` INT NOT NULL AUTO_INCREMENT,
  `chat` INT NOT NULL,
  `author` INT NOT NULL,
  `text` VARCHAR(150) NOT NULL,
  `created_at` DATE NOT NULL,
  PRIMARY KEY (`idMessage`),
  INDEX `chatFK_idx` (`chat` ASC) VISIBLE,
  INDEX `author_idx` (`author` ASC) VISIBLE,
  CONSTRAINT `chatFK`
    FOREIGN KEY (`chat`)
    REFERENCES `mydb`.`chat` (`idChat`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `author`
    FOREIGN KEY (`author`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`peopleInChat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`peopleInChat` (
  `personID` INT NOT NULL,
  `chatID` INT NOT NULL,
  PRIMARY KEY (`personID`, `chatID`),
  INDEX `chatIDFK_idx` (`chatID` ASC) VISIBLE,
  CONSTRAINT `personIDFK`
    FOREIGN KEY (`personID`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `chatIDFK`
    FOREIGN KEY (`chatID`)
    REFERENCES `mydb`.`chat` (`idChat`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;



