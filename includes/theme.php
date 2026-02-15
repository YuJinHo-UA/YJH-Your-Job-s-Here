<?php
declare(strict_types=1);

function theme_class(): string
{
    return theme_name() === 'dark' ? 'theme-dark' : 'theme-light';
}

function theme_name(): string
{
    $user = current_user();
    return $user && $user['theme'] === 'dark' ? 'dark' : 'light';
}

