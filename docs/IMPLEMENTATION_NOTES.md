# Implementation provenance and verification

The initial source, UI, tests and documentation in this repository were produced with an AI coding agent at the owner's request. The A–F ownership table describes proposed student responsibilities. It is not an authorship record and does not claim that six students completed these files.

The supplied course specification prohibits purely AI-generated or purely Agent-completed submissions and requires meaningful contributions from every member. Treat this as a reference to study and develop independently under the instructor's rules. Record actual changes, reviews, explanations, cited sources and test evidence. Do not invent student contributions, rewrite Git history to disguise provenance or submit the baseline unchanged as original group work.

## Validation recorded for the baseline

- JavaScript syntax validation passed.
- 19 integration tests passed against a real MongoDB 7.0.24 replica set on the development machine.
- Tests cover web login/logout and CSRF; all web pages and CRUD; all required REST methods; literal combined searches; maintenance; borrower search; return and history protection; six simultaneous checkouts; unique-index enforcement; transaction rollback; concurrent borrow/delete; malformed requests; EJS escaping; optional API authentication; seed idempotence; and MongoDB-backed session persistence across application instances.
- Browser verification confirmed English pages, login, check-out and return. The curl demonstration completed all expected responses, including conflicts and deletion.
- CI configuration repeats syntax, formatting and integration validation on Ubuntu with Node.js 22.
- The deployment guide describes persistent Docker/Atlas operation. A configuration file is not evidence that a live cloud deployment has been created or verified.

## Known scope limits

No public registration, user-role hierarchy, overdue notifications, reservation scheduler, bulk quantity stock, loan-history deletion, pagination or production monitoring is included. Sample credentials and sample equipment are for a local fictional demonstration. Use independent credentials and restricted API access on an Internet-facing deployment.

Complete the actual contribution log and presentation-machine verification before course submission.
