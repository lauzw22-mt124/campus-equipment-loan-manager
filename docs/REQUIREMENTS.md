# Course requirements and acceptance evidence

Source: the supplied Group Project Requirements and project-sample review appendix. The formal requirements control mandatory deliverables; the appendix supplies examples and design guidance, not a requirement to copy a particular sample.

| Course requirement / project rule                  | Implementation                                             | Evidence to demonstrate                                            |
| -------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ |
| Express.js                                         | `app.js`, route modules                                    | Start `server.js`; explain middleware/routes.                      |
| MongoDB using Mongoose                             | `models/index.js`, `config/db.js`                          | Show schemas, stored records and indexes.                          |
| Login/logout web functions                         | `/login`, POST `/logout`                                   | Wrong login rejected; valid login succeeds; logout removes access. |
| Authorized CRUD pages                              | `requireLogin`, sessions                                   | Open `/equipment` without a session and see login redirect.        |
| Create web UI                                      | Equipment form                                             | Add a new physical asset.                                          |
| Read using different conditions                    | Keyword/category/status and borrower/status filters        | Combine conditions and show matching records.                      |
| Update web UI                                      | Edit equipment; borrow/return and maintenance              | Change location; show saved data.                                  |
| Delete web UI                                      | Unused available equipment deletion                        | Delete an unused asset and show it is gone.                        |
| GET / POST / PUT / DELETE REST services            | `/api/equipment` routes                                    | Run prepared curl script and show actual HTTP status/results.      |
| Domain-specific behavior                           | One physical record; one active loan; transactional return | Reject duplicate checkout and loan during maintenance.             |
| Required files                                     | `server.js`, `package.json`, `README.md`                   | Inspect ZIP root and README four sections.                         |
| 4–6 people and clear roles                         | README A–F table                                           | Fill all six names/SIDs and evidence of real contributions.        |
| Local Ubuntu or cloud presentation                 | Deployment instructions                                    | Rehearse on the actual selected platform.                          |
| 10-minute presentation and curl                    | `docs/DEMO.md`, `scripts/demo-api.sh`                      | Complete a timed rehearsal.                                        |
| Originality / no purely Agent-completed submission | Provenance and actual contribution log                     | Independent student work and instructor-compliant submission.      |
| ZIP without dependencies                           | Clean packaging                                            | Exclude node_modules, .env, .git and database caches.              |

## Acceptance checklist before submission

- [ ] Every student independently reviewed, adapted and can explain their contribution.
- [ ] Names, SIDs, actual workload and source acknowledgments are accurate.
- [ ] `npm ci`, `npm run check`, `npm test` and `npm run format:check` pass on the presentation machine.
- [ ] UI and curl flows both demonstrate all required CRUD operations.
- [ ] Borrowing, return, maintenance, repeated checkout/return and deletion history rules are demonstrated.
- [ ] Session logout and protected pages work on the chosen HTTPS/Ubuntu environment.
- [ ] Presentation slot registered by 16 Nov 2026, 23:59.
- [ ] All group members rehearse their speaking roles within 10 minutes.
- [ ] README names the actual demo account/startup process for the submitted environment.
- [ ] ZIP has one `comp3810sef_group41` root folder and no secrets/dependencies.
- [ ] Confirm whether the tutor expects a hyphen or underscore in the ZIP filename: the supplied PDF's rule and example are inconsistent.
- [ ] Submit through OLE before 30 Nov 2026, 23:59; preferably a day earlier because the PDF warns about resubmission on the due date.

Project files and presentation each carry 50%. Implementing the technical requirements is necessary, but this repository cannot guarantee a grade or substitute for student originality.
