Для node нужна 20.13.1 версия не ниже.

установить nginx, postgres, pm2, yarn

конфиг по адресу /etc/nginx/sites-available/default.conf

если там запущенно реакт приложение необходимо подправить работу роутинга добовляется в конфиг server... и там добавить эту првоерку

location / {
if (!-e $request_filename){
rewrite ^(.*)$ /index.html break;
}
}

после сохранения конфига првоерить синтакс
nginx -t

перезапуск nginx
service nginx restart

посмотреть статус
service nginx status

команды pm2:
pm2 start cwa
pm2 stop cwa
pm2 restart cwa
pm2 monit
pm2 status
pm2 delete
pm2 save
