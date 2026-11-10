# Ten-minute presentation script

All speech, pages and command examples can be presented in English. Replace role letters with real member names and accurately describe each person's actual contribution.

## Before class

- Use the required local Ubuntu machine or cloud environment and rehearse there.
- Register the presentation slot by 16 November 2026, 23:59; prepare the Zoom/cloud details as requested in the course sheet.
- Install dependencies and download MongoDB ahead of time. Start the server and verify `/health`.
- Keep the login page, a terminal with the curl script, the README and the architecture diagram ready.
- Use fictional borrowers. Ensure there are Available, Borrowed and Maintenance examples.
- Prepare one never-loaned asset for Delete. Historical assets cannot be deleted by design.
- Keep the prepared curl commands in the requested presentation-sheet column or another immediately accessible place.

## Timed flow

| Time       | Speaker | Action and explanation                                                                                                        |
| ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 0:00–0:45  | A       | “We are Group41. Campus Gear tracks individual campus equipment and its loan history.” Introduce members and actual roles.    |
| 0:45–1:30  | A       | Show `npm start` or the running platform, sign in, and explain protected pages and sessions.                                  |
| 1:30–2:45  | C       | Add a physical asset, search by keyword/category/status, edit its location, and show the saved record.                        |
| 2:45–3:15  | C       | Delete a separate unused asset; show why history-bearing assets are retained.                                                 |
| 3:15–4:45  | D       | Check out an available asset, search borrower/status, reject a second checkout, return it, and show updated history/status.   |
| 4:45–5:30  | D       | Send an available asset for maintenance, show that lending is unavailable, then finish maintenance.                           |
| 5:30–7:45  | E       | Run `bash scripts/demo-api.sh` and explain GET, POST, PUT, DELETE, queries, maintenance, borrowing and return responses.      |
| 7:45–8:45  | B       | Explain Equipment → Loan reference, the unique active-loan index and the transaction. Show concurrency/rollback test results. |
| 8:45–9:30  | F       | Show validation, responsive UI, test/CI evidence and README guidance.                                                         |
| 9:30–10:00 | A / all | Sign out, verify protected access, and allow a short buffer for questions.                                                    |

## Key points each member should explain

- **A:** A cookie identifies a server-side session; regenerating it at login and destroying it at logout protects access.
- **B:** A physical projector has its own asset code. The unique partial index permits only one Active loan for that asset.
- **C:** Equipment fields are editable, but status changes use domain operations. Search conditions combine.
- **D:** Borrow and return each update two documents atomically. A failure rolls the whole operation back.
- **E:** The API uses the specified HTTP methods, JSON payloads and correct status codes; web forms reuse the same services.
- **F:** Tests include simultaneous checkouts, invalid requests, history protection and HTML escaping, beyond the successful path.

## Rehearsal record

| Rehearsal date  | Platform | Duration | Problems found | Owner / resolution |
| --------------- | -------- | -------- | -------------- | ------------------ |
| To be completed | —        | —        | —              | —                  |

Do not claim that this generated reference alone satisfies the course originality policy. Explain actual work, modifications and understanding honestly.
