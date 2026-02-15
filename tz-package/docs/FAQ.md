# FAQ

## Why SQLite and not PostgreSQL/MySQL?
SQLite keeps setup friction very low for demo and portfolio use. Migration to a server DB is planned.

## Is this production-ready?
It is production-like for small teams and strong as a portfolio project. For enterprise use, add stronger authz, observability, and migration tooling.

## Can I import existing Jira/TestRail data?
No native importer yet. Recommended path is custom ETL into `bugs`, `test_cases`, `test_runs`.

## How are bugs linked to tests?
Failed execution in `testrun.php` can create a bug and bind `test_executions.bug_id`.

## How does auto-close from Git work?
`/api/git-webhook.php` parses commit messages like `Fixes #123` and sets bug status to `fixed`.

