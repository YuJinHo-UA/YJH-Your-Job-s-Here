# Installation

## Windows (built-in PHP server)
1. Install PHP 8.1+ (with `pdo_sqlite`).
2. Open terminal in project root.
3. Run:
   ```powershell
   php -S 127.0.0.1:8000
   ```
4. Open `http://127.0.0.1:8000/login.php`.

## Linux / macOS (built-in PHP server)
```bash
php -S 127.0.0.1:8000
```

## Apache / Nginx
- Point web root to project directory.
- Ensure write access to:
  - `database.sqlite`
  - `uploads/`
- Ensure SQLite extension enabled.

## First Run Behavior
- Schema is initialized automatically from `config/db.php`.
- Demo data is seeded if users table is empty.

