FROM php:8.3-apache-bookworm

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install -y --no-install-recommends \
        libzip-dev unzip \
    && docker-php-ext-install zip opcache \
    && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite headers

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
        /etc/apache2/sites-available/000-default.conf \
        /etc/apache2/apache2.conf \
        /etc/apache2/conf-available/*.conf

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist --optimize-autoloader --no-interaction

COPY public/ ./public/
COPY src/ ./src/

RUN chown -R www-data:www-data /var/www/html \
    && find /var/www/html -type d -exec chmod 755 {} \; \
    && find /var/www/html -type f -exec chmod 644 {} \;

EXPOSE 80
