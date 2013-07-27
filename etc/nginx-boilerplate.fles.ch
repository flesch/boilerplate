upstream boilerplate {
  server 127.0.0.1:3000;
}

server {

  listen 80;
  server_name boilerplate.fles.ch;
  root /var/www/boilerplate.fles.ch;

  location / {
    
    proxy_http_version 1.1;
    
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_pass http://boilerplate/;
    proxy_redirect off;
  
  }
  
}
