# SkillHub

A repository that stores high-quality, verifiable skills as a folder tree on GitHub, together with the skills we write ourselves from time to time.

This repository is not a web application; it is a skill collection. Every skill lives in its own folder under `skills/<category>/<skill-id>/` and is documented by a `SKILL.md` file.

Languages: [English](README.md) | [Türkçe](README.tr.md)

## Repository layout

```
SkillHub/
├─ README.md
├─ README.tr.md
├─ CONTRIBUTING.md
├─ skills/
│  ├─ _template/            # copied template for new skills (not cataloged)
│  └─ <category>/<skill-id>/
│     ├─ SKILL.md           # single source of truth: name/description frontmatter + body
│     ├─ metadata.json      # source, version, license and platform verification data
│     ├─ references/        # long-form documentation, examples
│     ├─ scripts/           # executable helpers
│     └─ assets/            # template and output files
└─ docs/
   ├─ quality-rubric.md     # acceptance and quality criteria
   └─ source-policy.md      # external source, license and evidence rules
```

## Source classification

- **Our own skills:** written directly in this repository. Until a license is chosen, the `license` and `licenseFile` fields in `metadata.json` are left `null`, and these values are kept that way until a root `LICENSE` file is added.
- **Mirrored skills:** the original `SKILL.md` content and license are never modified. The `source` field in `metadata.json` is mandatory: repository address, source path, version/tag and retrieval date. The license name and license file location are kept in the top-level `license` and `licenseFile` fields.

When mirrored skills are copied, only the folder structure is preserved; no content is rewritten or simplified.

## Publication condition

A skill gets `status: "published"` in `metadata.json` only when all of the following hold:

1. `SKILL.md` carries valid frontmatter (`name`, `description`).
2. The body explains what the skill does and how it is used.
3. There is dated verification evidence for at least one platform (`platforms.<platform>.evidence`).
4. For mirrored skills, the `source` block and the top-level license fields are complete.

Even when `status` is `draft`, every platform written under `platforms` must carry evidence; the validator errors out if a platform is listed without evidence. Unverified platform compatibility is never listed: the field is left empty or omitted entirely. No platform compatibility without evidence is assumed and no example skill is added.

A single platform verified with valid evidence is enough for publication; a skill can still be `published` when other platforms have no evidence.

See [docs/source-policy.md](docs/source-policy.md) and [docs/quality-rubric.md](docs/quality-rubric.md) for the evidence format, field names and quality criteria.

## Catalog

Total: **71 skills** in 5 categories. The counts below are generated from the `metadata.json` files, not written by hand.

### design — 22 skills

Design systems, typography, color and spacing, interaction/motion, responsive layout, WCAG 2.2 accessibility, React 19 interfaces and visual review.

| Skill | Status | License | Platform evidence |
|---|---|---|---|
| [accessibility-compliance](skills/design/accessibility-compliance) | published | MIT | claude, codex |
| [algorithmic-art](skills/design/algorithmic-art) | published | Apache-2.0 | claude |
| [anti-ui-slop](skills/design/anti-ui-slop) | published | Apache-2.0 | copilot |
| [brand-guidelines](skills/design/brand-guidelines) | published | Apache-2.0 | claude |
| [canvas-design](skills/design/canvas-design) | published | Apache-2.0 | claude |
| [design-system-patterns](skills/design/design-system-patterns) | published | MIT | claude, codex |
| [frontend-design](skills/design/frontend-design) | published | Apache-2.0 | claude |
| [interaction-design](skills/design/interaction-design) | published | MIT | claude, codex |
| [mobile-android-design](skills/design/mobile-android-design) | published | MIT | claude, codex |
| [mobile-ios-design](skills/design/mobile-ios-design) | published | MIT | claude, codex |
| [premium-frontend-ui](skills/design/premium-frontend-ui) | published | MIT | copilot |
| [react-native-design](skills/design/react-native-design) | published | MIT | claude, codex |
| [responsive-design](skills/design/responsive-design) | published | MIT | claude, codex |
| [screen-reader-testing](skills/design/screen-reader-testing) | published | MIT | claude, codex |
| [slack-gif-creator](skills/design/slack-gif-creator) | published | Apache-2.0 | claude |
| [theme-factory](skills/design/theme-factory) | published | Apache-2.0 | claude |
| [ui-screenshots](skills/design/ui-screenshots) | published | MIT | copilot |
| [visual-design-foundations](skills/design/visual-design-foundations) | published | MIT | claude, codex |
| [wcag-audit-patterns](skills/design/wcag-audit-patterns) | published | MIT | claude, codex |
| [web-artifacts-builder](skills/design/web-artifacts-builder) | published | Apache-2.0 | claude |
| [web-component-design](skills/design/web-component-design) | published | MIT | claude, codex |
| [web-design-reviewer](skills/design/web-design-reviewer) | published | MIT | copilot |

### coding — 35 skills

Backend and API design, architecture patterns, JS/TS/Go/Python language shortcuts, testing and error handling, databases, CI/CD, review and security inspection.

| Skill | Status | License | Platform evidence |
|---|---|---|---|
| [api-design-principles](skills/coding/api-design-principles) | published | MIT | claude, codex |
| [architecture-patterns](skills/coding/architecture-patterns) | published | MIT | claude, codex |
| [claude-api](skills/coding/claude-api) | published | Apache-2.0 | claude |
| [code-review-excellence](skills/coding/code-review-excellence) | published | MIT | claude, codex |
| [cqrs-implementation](skills/coding/cqrs-implementation) | published | MIT | claude, codex |
| [dbt-transformation-patterns](skills/coding/dbt-transformation-patterns) | published | MIT | claude, codex |
| [debugging-strategies](skills/coding/debugging-strategies) | published | MIT | claude, codex |
| [e2e-testing-patterns](skills/coding/e2e-testing-patterns) | published | MIT | claude, codex |
| [error-handling-patterns](skills/coding/error-handling-patterns) | published | MIT | claude, codex |
| [event-store-design](skills/coding/event-store-design) | published | MIT | claude, codex |
| [git-advanced-workflows](skills/coding/git-advanced-workflows) | published | MIT | claude, codex |
| [go-concurrency-patterns](skills/coding/go-concurrency-patterns) | published | MIT | claude, codex |
| [javascript-testing-patterns](skills/coding/javascript-testing-patterns) | published | MIT | claude, codex |
| [llm-evaluation](skills/coding/llm-evaluation) | published | MIT | claude, codex |
| [mcp-builder](skills/coding/mcp-builder) | published | Apache-2.0 | claude |
| [microservices-patterns](skills/coding/microservices-patterns) | published | MIT | claude, codex |
| [modern-javascript-patterns](skills/coding/modern-javascript-patterns) | published | MIT | claude, codex |
| [nodejs-backend-patterns](skills/coding/nodejs-backend-patterns) | published | MIT | claude, codex |
| [playwright-generate-test](skills/coding/playwright-generate-test) | published | MIT | copilot |
| [postgresql-table-design](skills/coding/postgresql-table-design) | published | MIT | claude, codex |
| [prompt-engineering-patterns](skills/coding/prompt-engineering-patterns) | published | MIT | claude, codex |
| [python-error-handling](skills/coding/python-error-handling) | published | MIT | claude, codex |
| [python-type-safety](skills/coding/python-type-safety) | published | MIT | claude, codex |
| [rag-implementation](skills/coding/rag-implementation) | published | MIT | claude, codex |
| [react-audit-grep-patterns](skills/coding/react-audit-grep-patterns) | published | MIT | copilot |
| [react19-concurrent-patterns](skills/coding/react19-concurrent-patterns) | published | MIT | copilot |
| [react19-test-patterns](skills/coding/react19-test-patterns) | published | MIT | copilot |
| [saga-orchestration](skills/coding/saga-orchestration) | published | MIT | claude, codex |
| [security-review](skills/coding/security-review) | published | MIT | copilot |
| [skill-creator](skills/coding/skill-creator) | published | Apache-2.0 | claude |
| [small-reviewable-change](skills/coding/small-reviewable-change) | draft | - | none |
| [test-gap-audit](skills/coding/test-gap-audit) | published | MIT | copilot |
| [typescript-advanced-types](skills/coding/typescript-advanced-types) | published | MIT | claude, codex |
| [webapp-testing](skills/coding/webapp-testing) | published | Apache-2.0 | claude |
| [workflow-orchestration-patterns](skills/coding/workflow-orchestration-patterns) | published | MIT | claude, codex |

### automation — 8 skills

Document and presentation generation, API schema generation, changelog automation, threat modeling, metric/alert configuration and defensive shell scripting.

| Skill | Status | License | Platform evidence |
|---|---|---|---|
| [attack-tree-construction](skills/automation/attack-tree-construction) | published | MIT | claude, codex |
| [bash-defensive-patterns](skills/automation/bash-defensive-patterns) | published | MIT | claude, codex |
| [changelog-automation](skills/automation/changelog-automation) | published | MIT | claude, codex |
| [github-actions-templates](skills/automation/github-actions-templates) | published | MIT | claude, codex |
| [openapi-spec-generation](skills/automation/openapi-spec-generation) | published | MIT | claude, codex |
| [prometheus-configuration](skills/automation/prometheus-configuration) | published | MIT | claude, codex |
| [security-requirement-extraction](skills/automation/security-requirement-extraction) | published | MIT | claude, codex |
| [stride-analysis-patterns](skills/automation/stride-analysis-patterns) | published | MIT | claude, codex |

### writing — 5 skills

Shared document writing process, architecture decision records, incident runbooks and postmortem writing, counterparty communication.

| Skill | Status | License | Platform evidence |
|---|---|---|---|
| [architecture-decision-records](skills/writing/architecture-decision-records) | published | MIT | claude, codex |
| [discernment-nudge](skills/writing/discernment-nudge) | published | Apache-2.0 | claude |
| [incident-runbook-templates](skills/writing/incident-runbook-templates) | published | MIT | claude, codex |
| [internal-comms](skills/writing/internal-comms) | published | Apache-2.0 | claude |
| [postmortem-writing](skills/writing/postmortem-writing) | published | MIT | claude, codex |

### research — 1 skill

Evidence-based research and assumption auditing.

| Skill | Status | License | Platform evidence |
|---|---|---|---|
| [evidence-based-research](skills/research/evidence-based-research) | draft | - | none |

The category list is limited by the `CATEGORIES` constant in `scripts/validate-skills.mjs`. Skills whose license is `-` are in `draft` status and are not considered ready for free distribution.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the steps to add a new skill, collect evidence and run the review. Templates: [skills/_template/SKILL.md](skills/_template/SKILL.md) and `skills/_template/metadata.json`.