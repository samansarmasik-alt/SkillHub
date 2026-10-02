---
name: evidence-based-research
description: Produces research where every claim is traceable to the source and quote that support it, instead of generating assertions.
---

# Evidence-Based Research

This skill is a research flow that makes the origin of every claim visible while
answering a question. The goal is not a fast answer but **portable evidence**: someone
else reading it must be able to re-verify the claim from the same source.

## Triggers

Use this skill for:

- Verification requests such as "is X really true?" or "what is the best/most
  current/most reliable Y?".
- Comparison requests: "compare", "which is better", "pros and cons".
- Any situation where a decision needs evidence, a date, a version or a source.
- Auditing an assumption a previous answer relied on.

Do not use it without a trigger: it is unnecessary for a short factual question.

## Steps

### 1. Make the question measurable
If the question is broad or vague, narrow it first. Write the exit criterion of the
research in one sentence: "For X, under condition Y, what does the most valid source
say?" This sentence goes verbatim into the "Scope" section of the report.

### 2. Build a source hierarchy
Prefer sources in this order and state which geography you searched:

1. Primary sources: official documentation, source code, legal text, database
   records.
2. Reliable secondary sources interpreting a primary source.
3. Community sources (issues, discussions, blogs) only when no primary source exists.

If recency is unclear, check the publication/version date of the source; an undated
source is a hint, not evidence.

### 3. Verify each claim with two sources
A single source is not enough. For every critical claim:
- read one source and **quote** the relevant sentence,
- search for the same claim in an independent second source,
- if they conflict, say so and pick the valid one with a reason.

If there is no conflict, say that too ("remained limited to a single source"). This is
better than hiding the gap.

### 4. Record the evidence
Fill in the following fields for every finding. A finding with a missing field is
weak by definition:

- **Claim** - one sentence, in verifiable form.
- **Source** - title + address (`url` or file:line).
- **Quote** - the short verbatim text carrying the claim.
- **Type** - `documentation` (source text) or `hands-on` (run by you).
- **Date** - the source's date as `YYYY-MM-DD`.
- **Confidence** - `high` / `medium` / `low`, with the reason.

When `hands-on` evidence is used, write the **real output** of the command that was
run; output cannot be invented or shortened.

### 5. Separate the dead ends
List the approaches you tried during the research that did not work in a separate
section. This prevents the same mistake from being repeated and shows which gaps are
still open.

## Output format

Markdown with the sections in this order:

```
## Scope
<the measurable question and its limits>

## Findings
### <finding title>
- Claim: ...
- Source: <title> - <address>
- Quote: "..."
- Type: documentation | hands-on
- Date: YYYY-MM-DD
- Confidence: high | medium | low - <reason>

## Conflicts and uncertainties
- ...

## Not verifiable
- <the claim or topic and why it could not be verified>

## Sources
- <address> - <title> - <YYYY-MM-DD>
```

## Limits

- When a source cannot be found, **do not invent a source, date or quote**. Write
  "not found" and move the finding to the "Not verifiable" section.
- A quote must be verbatim; a paraphrase must not be presented as a quote. A
  paragraph shortened at the end is marked with `...`.
- An invented quote cannot be detected afterwards; this is why every quote names its
  source. If you cannot reach the source, do not write a quote.
- Platform compatibility, performance measurements and license status are **never
  guessed**; without evidence the record stays `draft`.
- A claim verified by a single source is not as trustworthy as one verified by several
  sources; say so.

## Concrete example

**Question**: "Does the validation script in this repository run in CI?"

**Scope**: Whether `.github/workflows/validate.yml` and `scripts/validate-skills.mjs`
are invoked on the push and pull_request events in the SkillHub repository.

**Findings**
### The validation step is defined in CI
- Claim: `node scripts/validate-skills.mjs` runs on every push and pull_request.
- Source: .github/workflows/validate.yml
- Quote: "run: node scripts/validate-skills.mjs"
- Type: documentation
- Date: <date the file was last read>
- Confidence: high - defined directly in the file; it also ran locally and exited 0.

**Not verifiable**
- Whether GitHub Actions is actually green right now: a local run only shows that the
  script is correct, not the remote conditions. It must be verified from the
  dashboard.

**Sources**
- https://github.com/<owner>/<repo>/blob/main/.github/workflows/validate.yml - validate.yml - <YYYY-MM-DD>