## Тестовое задание Fundraise Up

### Задача написания Shorter URL приложения [по заданному ТЗ](https://docs.google.com/document/d/1cPGgIIacHlOvI21Z-6R0yjl8xLtM9JjzydUqezy-QD8/edit)

Приложение написано в виде двух сервисов ```links-shorter-app``` и ```links-shorter-api```, как фронтенд и бекенд соотвественно. 

Для развёртывания приложения используется ```docker compose```

## Подготовка

Чтобы начать работать с проектом, необходимо установить

```bash
docker compose
```

Также необходимо создать ```config.env``` файл, где будут находиться необходимые переменные для запуска приложения
```bash
# nodejs api env
PORT
BASE_URL
REACT_APP_URL
DB_URI
REDIS_HOST

# react app env
REACT_APP_BACKEND_URL
```

Как пример ```config.env``` можно посмотреть ```config.env.example```

Всё будет запускаться через docker, поэтому нет необходимости задавать ```.env``` для под-проектов

## Работа с проектом

Когда ```config.env``` задан и ```docker compose``` установлени, чтобы запустить приложение, требуется выполнить команду:

```bash
./deploy.sh
```

После этого, будут подняты сервисы ```Redis```, ```Backend``` и ```Frontend```. 

Чтобы начать использовать приложение, необходимо перейти на
```http://localhost:3000```, если был указан другой порт в ```config.env```, то поменять порт в URL соотвественно.

### 2. Если требуется запустить приложение локально без докера
Для этого потребуется задать ```.env``` файлы в каждом из сервисов, можно использовать примеры ```.env.example```. 

Также будет необходимо установить ```redis``` на default порту и запустить его. Это требуется для приложения.


После этого, открывается две отдельных окна консоли.

В первом окне выполнить команды

```bash
cd links-shorter-api
npm run start
```

Во втором окне выполнить команды

```bash
cd links-shorter-app
npm run start
```
Так будут запущены требуемые сервисы.