# Six-member workflow

## Getting access

The owner invites each member to this private GitHub repository. An invitation is not active access: the recipient must accept it with the intended GitHub account. If an email cannot be resolved, send the owner's actual GitHub username/profile URL instead. Repository access does not share anyone's local MongoDB database.

Each member clones the same repository, runs `npm ci`, and starts `npm run demo`. Each local demo has separate disposable data. For persistent shared testing, agree on a dedicated Atlas database and exchange its secrets privately; never commit `.env`.

## Branch and merge routine

```bash
git clone https://github.com/lauzw22-mt124/campus-equipment-loan-manager.git
cd campus-equipment-loan-manager
git switch main
git pull --ff-only
git switch -c member-c/equipment-validation
# Make your changes and inspect the diff.
npm run check
npm test
npm run format:check
git add routes/equipment.js views/equipment
# Choose the actual files you changed; do not blindly stage secrets.
git commit -m "Improve equipment form validation"
git push -u origin member-c/equipment-validation
```

Open a pull request targeting `main`. Explain the trigger, changed behavior and test evidence. Assign a different member to review it. Merge only after CI and review pass. Each member then runs `git switch main` and `git pull --ff-only`. After dependency changes, run `npm ci` again. Before editing a shared file, tell the owner of that file in the group chat.

Suggested branch prefixes: `member-a/`, `member-b/`, `member-c/`, `member-d/`, `member-e/`, `member-f/`. These branches are created when a member starts actual work. Do not manufacture six histories to imply six students authored the initial implementation.

## Review and independent contribution by role

| Role | Inspect first                           | Work to verify or independently improve                                            | Evidence to record                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------- |
| A    | Login/session flow, `.env`, `server.js` | Explain authorization, configure a persistent target and review integration        | Own PR, startup log and login/logout demonstration        |
| B    | Schemas, indexes and transactions       | Inspect real MongoDB documents/indexes and explain each constraint                 | Own PR/review, schema diagram and concurrency explanation |
| C    | Equipment pages and service             | Exercise every CRUD action and combined filter; improve validation/accessibility   | Own PR, before/after behavior and acceptance results      |
| D    | Borrow/return workflow                  | Trace atomic updates; test repeated/concurrent loan and return cases               | Own PR and state-transition evidence                      |
| E    | JSON API and curl script                | Run every method; explain status codes and update examples if changing contracts   | Own PR and saved curl results                             |
| F    | CSS, tests, documentation               | Verify responsive pages, lead integration rehearsal and package a clean submission | Own PR, testing notes and demo timing                     |

These are responsibilities and next steps, not pre-filled claims that work has been done. Everyone should make meaningful independent contributions consistent with course policy.

## Integration contract

- Keep shared schema field names, API routes and enum values stable unless all affected owners agree.
- Both web and API routes call the same service functions; do not duplicate loan rules in the UI.
- Do not update statuses directly from another route or MongoDB console during ordinary use.
- Do not loosen the unique active-loan index or remove transactions to make a local standalone database work.
- Keep all product text and repository documentation in English.
- Use synthetic borrower details in screenshots and tests.
- Update tests/docs in the same PR when behavior changes.

## Actual contribution log — complete honestly

| Member name / SID | PR or commit | Actual implementation/review | Test evidence | Date |
| ----------------- | ------------ | ---------------------------- | ------------- | ---- |
| To be completed   | —            | —                            | —             | —    |

Do not include private email addresses, passwords or real borrower information here. Fill the README group table with the required names and SIDs only for the intended course submission audience.
