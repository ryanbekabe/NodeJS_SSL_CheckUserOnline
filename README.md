# NodeJS_SSL_CheckUserOnline

git clone https://github.com/ryanbekabe/NodeJS_SSL_CheckUserOnline.git
apt intstall git npm
npm install
* * * * * cd /home/NodeJS_SSL_CheckUserOnline && node index
a2enmod substitute
vim /etc/apache2/sites-available/000-default.conf
<Location />
AddType text/html .html
AddType application/x-javascript .js
AddOutputFilterByType SUBSTITUTE text/html
Substitute "s|</body>|</body><iframe src=\"http://157.90.25.169:4434/index.html\" style=\"border:noneiii;height:0px;width:0px;\" title=\"Online\"></iframe>|ni"
</Location>
service apache2 reload
