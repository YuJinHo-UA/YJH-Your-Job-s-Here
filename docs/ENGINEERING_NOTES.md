# Engineering Notes

## SQL Optimization Targets
- Add indexes listed in `docs/DATABASE.md`.
- Move repeated dashboard aggregate queries into reusable helper functions.
- Consider pre-aggregated daily metrics table for long-range trends.

## Refactoring Targets
- Extract page-level repeated CRUD patterns into service helpers.
- Standardize API responses and error envelope.
- Centralize status/priority dictionaries in one source.

## Testing Targets
- Add PHPUnit smoke tests for:
  - auth/session gates
  - bug creation/update
  - test execution -> auto bug creation
  - webhook fix parser

## Security Targets
- Add role authorization checks on all mutation APIs.
- Add file upload MIME + extension defense in depth.
- Add rate limiting for login and webhooks.

