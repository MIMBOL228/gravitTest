### Техническое задание (By [microwin7](https://github.com/microwin7))
Создать 2 таблицы
Первая имитирующая пользователей: ник, uuid, баланс
```mysql
CREATE TABLE `users` (
    `user_id` INT(11) NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(40) NOT NULL DEFAULT '' COLLATE 'utf8mb4_unicode_ci',
    `uuid` CHAR(36) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
    `balance` FLOAT NOT NULL DEFAULT '0',
    PRIMARY KEY (`user_id`) USING BTREE,
    UNIQUE INDEX `username` (`username`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;
```
```mysql
INSERT INTO `users` (`username`, `uuid`, `balance`) VALUES ('test', '8feddd59-6ecf-420a-b345-d5d3fbbc3535', 100000);
```
 
Вторая имитирующая хранение покупных групп luckperms_user_permissions
 
```mysql
CREATE TABLE `luckperms_user_permissions` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL COLLATE 'utf8mb4_general_ci',
    `permission` VARCHAR(200) NOT NULL COLLATE 'utf8mb4_general_ci',
    `value` TINYINT(1) NOT NULL,
    `server` VARCHAR(36) NOT NULL COLLATE 'utf8mb4_general_ci',
    `world` VARCHAR(64) NOT NULL COLLATE 'utf8mb4_general_ci',
    `expiry` BIGINT(20) NOT NULL,
    `contexts` VARCHAR(200) NOT NULL COLLATE 'utf8mb4_general_ci',
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `luckperms_user_permissions_uuid` (`uuid`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
```
 
Скрипт должен отдавать таблицу
 
| Название привилегии | Цена | Кнопка | 
| ------------- |:-------------:| ----- |
| Vip |  50 | Кнопка (Купить) |
| Premium |  100 | Кнопка (Купить) |
| Deluxe | 150 | Кнопка (Купить) |

После нажатия кнопки купить, скрипт перенаправляется на GET запрос этого же скрипта [group=Имя]
 
Выводиться теперь должно поле для заполнения UserName, кнопка Далее, текущий баланс
Перед выводом информации провить на этом моменте баланс, если он меньше чем у выбранной группы, написать: "Сейчас у вас недостаточно средств, для покупки этой группу, вам нехватает N"
N - сколько нехватает
После нажатия Далее, в запрос добавляется [username=ник]
Должна произойти проверка, что username уже существует в базе users
 
Выводиться информация сколько будет стоить группа и кнопка Подтвердить покупку
Снятие средств с проверкой и Покупка группы 
(UPDATE баланса и INSERT группы в БД должны происходить транзакциями, через PDO в try catch и откатом средств, если второй try catch не выполнит добавление группу по различным причинам)
 
Пример добавления строки для таблицы luckperms_user_permissions
```php
DB_connect::$serverDB->query("
	INSERT INTO $table_users 
	(`uuid`, `permission`, `value`, `server`, `world`, `expiry`, `contexts`) VALUES 
	(?, ?, 1, 'global', 'global', 0, '{}')", "ss", $uuid, 'group.default');
```
 
Вывести результат покупки группы и новый баланс