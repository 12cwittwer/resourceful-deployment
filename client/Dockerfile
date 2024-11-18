FROM ubuntu:latest

WORKDIR /app

RUN apt-get update && \
    apt-get install -y apache2 && \
    rm -rf /var/lib/apt/lists/*

COPY . /var/www/html/

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]
