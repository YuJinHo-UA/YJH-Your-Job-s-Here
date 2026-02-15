# API Reference

Base path: `/api`
Response format: JSON
Auth model: session-based (`current_user()` in most endpoints)

## Endpoint Summary

### `GET /api/bugs.php`
Returns latest bugs.

### `POST /api/bugs.php`
Creates a new bug or updates existing bug if `id` provided.

Request example:
```json
{
  "project_id": 1,
  "title": "Crash on save",
  "description": "Steps...",
  "severity": "major",
  "priority": "high",
  "status": "new"
}
```

### `GET /api/testcases.php`
Returns latest test cases.

### `POST /api/testcases.php`
Creates test case.

### `GET /api/testruns.php`
Returns test runs.

### `POST /api/testruns.php`
Creates test run.

### `POST /api/kanban.php`
Supports card move action.

Request:
```json
{
  "action": "move_card",
  "card_id": 10,
  "column_id": 3
}
```

### `GET /api/wiki.php`
Returns wiki pages.

### `POST /api/wiki.php`
Creates wiki page.

### `GET /api/search.php?q=...`
Global grouped search across bugs, tests, projects, wiki, users.

### `POST /api/filters.php`
Stores saved bug filter for current user.

### `GET /api/preview.php?type=bug&id=1`
Returns compact preview payload for hover cards.

### `POST /api/git-webhook.php`
Parses commit messages (`Fixes #123`, `Closes #123`) and auto-updates bug status to `fixed`.

### `POST /api/upload.php`
Uploads attachments for bug target (`target_type=bug`, `target_id`).

## Error Codes
- `400` invalid payload or validation issue
- `401` unauthorized
- `404` not found
- `405` method not allowed

## OpenAPI Starter (YAML)
```yaml
openapi: 3.0.3
info:
  title: YJH API
  version: 0.1.0
paths:
  /api/bugs.php:
    get:
      summary: List bugs
      responses:
        '200':
          description: OK
    post:
      summary: Create or update bug
      responses:
        '200':
          description: OK
  /api/search.php:
    get:
      summary: Global search
      parameters:
        - in: query
          name: q
          required: true
          schema:
            type: string
      responses:
        '200':
          description: OK
```

