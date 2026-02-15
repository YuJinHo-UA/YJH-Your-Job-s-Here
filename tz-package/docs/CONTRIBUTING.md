# Contributing

## Setup
1. Fork/clone repository.
2. Run local server: `php -S 127.0.0.1:8000`.
3. Use demo users from `docs/QUICKSTART.md`.

## Coding Guidelines
- Keep SQL parameterized.
- Reuse helpers in `includes/functions.php`.
- Preserve session/auth checks for APIs.
- Keep UI labels compatible with localization layer.

## Pull Requests
- One focused change per PR.
- Include before/after behavior notes.
- Add DB/index notes when schema/query changes are introduced.
- Include screenshots for visible UI updates.

