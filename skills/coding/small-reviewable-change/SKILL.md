---
name: small-reviewable-change
description: Produces small, reviewable code changes; enforces a minimum file set, root-cause fixes, an undeepered diff and verification output from actually run commands.
---

# Small, Reviewable Code Change

This skill produces changes that target a single piece of logic, show their evidence
and stay cheap to review. The goal is not the fewest lines, but the **fewest headings**.

## Triggers

- A request to fix one bug, feature gap or incompatibility ("X does not work",
  "Y throws an error", "the test suite fails").
- A request to fix a broken test.
- A refactor request whose scope is not bounded: this skill states what it will not
  change and does not touch the overall architecture of the code.

Large rewrites, dependency upgrades or multi-file architecture changes are outside
this skill's scope; narrow the scope first or ask for a separate plan.

## Steps

### 1. Summarize the behavior
Before changing anything, write the target behavior in one sentence and write the
current behavior as well. If the two are identical, this is not the change being
asked for; clarify.

### 2. Choose the file and line boundary
Pick the **minimum set of files** for the change. Your own criteria:
- Fix the place the error message or test output points at.
- Touch one additional file only if the change strictly requires it.
- For every extra file you add, write the reason; without a reason that file is not
  changed.

Lines added to an unrelated file are not written code, they are spent review budget.

### 3. Find the root cause
Fix the cause, not the symptom. Symptom fixes are only acceptable when a corner
case forces them, and then the `notes` section must state the reason.

Go back if you can answer yes to any of these:
- "Does this change prevent the same bug from recurring?"
- "Could this bug occur somewhere else than where I changed it? If so, why here?"

### 4. Minimum diff
- Do not mix the change with reformatting, renaming or reordering of existing code.
- Do not make several unrelated fixes in the same file.
- Do not add a new dependency; first check whether the existing tools are enough.
- The change must not break the requested behavior; if you want to generalize, say
  so instead of doing it silently.

### 5. Verify
Run the build, type check, lint and the relevant tests and report the **real output**
of the commands. Never claim a check passed that you did not run. If you skip a
check, say so explicitly.

For every check you run, write which step it verifies from scratch, in the form
"test X ran, test Y failed, test Z passed", with file:line.

### 6. Report
Report with the block below. Do not repeat the code, the diff or the commentary.

```
### What changed
- <change> - file:line

### Why
- <root cause, one sentence>

### Verification
- <command> - <result>
```

## Output format

The three headings above are mandatory. In addition:
- If the change is **under four lines**, a short paragraph is enough; do not pad it
  artificially.
- If an extra file changed, give a reason for each file.
- List any check you did not run.

## Limits

- Unrelated code cleanup, refactoring or file renaming is **not** performed. If
  requested, propose it as a separate, explicitly marked change.
- Scope is never grown: opening extra files for a small task violates this skill.
- Changing a public API, database schema, migration or authentication flow requires
  additional approval; this skill does not carry out those changes on its own.
- A check whose evidence was not run does not count as "passing"; it is written
  down as skipped.
- Deletion, renaming and large refactors are outside this skill's scope; they need
  a separate plan and approval.

## Concrete example

**Request**: "The validation script could not read JSON files with a BOM, fix it."

**What changed**
- The leading `\uFEFF` is stripped when reading JSON and `SKILL.md` -
  `scripts/validate-skills.mjs:86` and `:209`
- Folder name is now compared against `metadata.json.id`, which removes the
  BOM-induced false "no frontmatter" report

**Why**
- `JSON.parse` and the frontmatter parser counted the BOM character at the start of
  the file as part of the data; the error did not come from a real schema problem.

**Verification**
- `node scripts/validate-skills.mjs` - with a BOM fixture it reported 2 errors (both
  known to originate from the BOM); after stripping the BOM only the real schema
  errors remained, and with a valid fixture the exit code is 0
- `node --check scripts/validate-skills.mjs` - exit 0

**Extra file changes**: none. The change stayed in a single file.