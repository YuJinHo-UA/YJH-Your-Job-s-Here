# Security Policy

## Reporting
If you discover a security issue:
1. Do not publish it publicly.
2. Send a private report with steps and impact.
3. Include minimal PoC and affected endpoint/page.

## Current Security Controls
- CSRF token checks for form submissions (`includes/csrf.php`).
- Parameterized SQL (`PDO::prepare`) across core flows.
- HTML escaping helper `h()` for output rendering.
- Session-gated APIs for authenticated access.

## Recommended Hardening
- Add rate limiting for login and API endpoints.
- Add strict CSP and security headers.
- Validate/authorize every API action by role.
- Add audit log coverage for sensitive operations.

