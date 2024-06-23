## Node version: 20.13.1

## Заметки:
1) Перед первым стартом нужно открыть папку back-end в консоли установить зависимости при помощи yarn;
2) Поправить .env файл (добавить из exp.env) под свое окружение (название бд, токен бота, и тд);
3) БД можно иметь пустую главное что бы имя совпадало с тем что в файле env;
4) Для первого старта back-end используйте команду yarn resetAndStart (для всех последующих запусков просто yarn start);
5) Swagger доступен по http://localhost:{SERVER_PORT}/api-docs
6) Для дебага как через desktop так и через мобильный телефон нужно в тестовой телеграм среде изменить у имеющегося ссылку на приложение:
    ``` 
   BotFather -> /setmenubutton -> YOUR_BOT -> http://192.168.0.203:3010/
   ```
[Как создать/открыть тестовый телеграм аккаунт](https://docs.telegram-mini-apps.com/platform/test-environment)
