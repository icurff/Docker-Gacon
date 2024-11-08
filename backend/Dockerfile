FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    default-mysql-client && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer (PHP Dependency Manager)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Allow Composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER=1

# Copy Laravel project files into the container
COPY . /var/www/html

# Install Laravel dependencies
RUN composer update

EXPOSE 8000

# Use the default www-data user
USER www-data
