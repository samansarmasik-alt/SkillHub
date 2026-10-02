<!-- vi3ecode:memory:begin -->
## Project Memory (Vi3ecode)

This project keeps a persistent memory vault at `.vi3ecode/memory/` (index: `.vi3ecode/memory/MEMORY.md`, notes: `.vi3ecode/memory/entries/*.md`). The vault is the CANONICAL long-term memory for this project — read it and write to it. Do not keep durable project insights only in engine-private memory (e.g. Claude auto-memory); other agents and tools cannot see them there.

Before starting any task that may depend on past decisions, known pitfalls, or project facts not already in your context, you MUST scan the memory index and open the relevant notes from `.vi3ecode/memory/entries/<id>.md`.

When you learn something durable (a decision, root cause, gotcha, or reusable pattern), save it by printing a single line:
`MEMORY_WRITE {"title":"…","content":"…","type":"fact|decision|pattern|warning|todo|reference","tags":["…"]}`
(the whole JSON must stay on ONE line — keep content brief) or by creating a markdown note in `.vi3ecode/memory/entries/` (kebab-case filename). In an interactive session prefer the file — a line wrapped by the terminal is lost. Keep notes short and deduplicated; update an existing note instead of duplicating it. Link related notes with `[[slug]]`.
<!-- vi3ecode:memory:end -->
