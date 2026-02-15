# Architecture

## System Overview
YJH is a modular monolith:
- Server-rendered PHP pages for core workflows.
- Lightweight JSON APIs under `/api/*` for async interactions.
- SQLite as a single-file transactional datastore.
- Shared includes (`includes/*.php`) for auth, layout, utilities, theme/language.

## High-Level Architecture
```mermaid
flowchart LR
    U[User Browser] --> P[PHP Pages]
    U --> A[AJAX /api/*]
    P --> I[includes/*]
    A --> I
    I --> DB[(SQLite database.sqlite)]
    A --> UP[uploads/]
    G[Git Provider Webhook] --> GH[/api/git-webhook.php]
    GH --> DB
```

## Module Interaction Map
```mermaid
flowchart TB
    Bugs[Bugs Module] -->|links| Projects[Projects/Releases]
    Bugs -->|mentions/comments/history| Users[Users]
    Tests[Test Management] -->|autobug on fail| Bugs
    Tests --> Projects
    Wiki[Wiki] --> Projects
    Kanban[Kanban] --> Bugs
    Kanban --> Tests
    Kanban --> Wiki
    Git[Git Integration] --> Bugs
    Dashboard[Dashboard/Reports] --> Bugs
    Dashboard --> Tests
    Dashboard --> Projects
```

## Navigation Map
```mermaid
flowchart LR
    index[index.php] --> bugs[bugs.php]
    index --> testplans[testplans.php]
    index --> testruns[testruns.php]
    index --> wiki[wiki.php]
    index --> kanban[kanban.php]
    index --> reports[reports.php]
    index --> calendar[calendar.php]
    index --> projects[projects.php]
    bugs --> bug[bug.php]
    testplans --> testplan[testplan.php]
    testplan --> testcase[testcase.php]
    testruns --> testrun[testrun.php]
    wiki --> wikiPage[wiki-page.php]
    projects --> project[project.php]
    project --> releases[releases.php]
```

## Traceability Flow
```mermaid
flowchart LR
    TC[Test Case] --> EX[Test Execution]
    EX -->|fail + create bug| B[Bug]
    B --> GC[Git Commit]
    GC -->|Fixes #id| B
```

## Design Choices
- SQLite-first architecture for easy demo, local adoption, and portfolio portability.
- Procedural PHP pages reduce framework overhead for rapid feature iteration.
- API-first add-ons enable progressive enhancement without full SPA migration.
- Rich domain model in DB captures enterprise QA workflows.

## Risks and Next Evolution
- Current codebase is modular but not layer-separated by domain package.
- API lacks strict OpenAPI contract enforcement and automated tests.
- Next step: introduce service layer + repository abstraction + migrations.

