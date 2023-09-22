# Backend, Web, JS
### Запуск:
```shell
docker-compose up --build
```
### Тех. задание:

Написать бекенд сервиса hastebin с следующим функционалом:

- /new POST, тело документа до 2Мб

###### Ответ:

```json
{
  "id": "j1jlp40a",
  "deleteToken": "&YHUWH8yqhd98hwd8y"
}
```

Если достигнут лимит:

```json
{
  "error": "Documents per hour limit reached"
}
```

- /raw/ID GET, ID - номер документа полученный на предыдущем этапе

###### Ответ: тело документа

- /raw/ID DELETE, ID - номер документа полученный на предыдущем этапе

###### Ответ: пустой, код 201

###### Авторизация по Bearer токену, полученному при создании ИЛИ по токену администоратора, который задается в конфигурации

###### Реализовать ограничение 5 документов в час на один IP. Ограничение не действует если в запрос /new передан Bearer токен администратора

###### База данных - MySQL, MongoDB или PostgreSQL (выберите одно)

**Typescript** использовать можно
