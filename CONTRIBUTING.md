# Contribution Guide

Languages: [English](CONTRIBUTING.md) | [Türkçe](README.tr.md)

## Adding a new skill

1. Choose a category (`coding`, `research`, `writing`, `automation`). If you are unsure, read the quality headings in [docs/quality-rubric.md](docs/quality-rubric.md).
2. Create the folder: `skills/<category>/<skill-id>/`. `<skill-id>` must be lowercase and separated by hyphens, and must match `id` in `metadata.json` exactly. The `name` in the `SKILL.md` frontmatter is the display name and must match `title` in `metadata.json`.
3. Copy `skills/_template/SKILL.md` and `skills/_template/metadata.json` into your folder.
4. Write the body: what it does, when to use it, input/output, limits.
5. Fill in the platform evidence in `metadata.json`. Even when `status` is `draft`, every platform you write requires `evidence` (`basis`, HTTPS `reference`, `verifiedAt`); never add a platform without evidence, leave the field empty or omit it entirely. Do not guess. A single verified platform is enough for publication.
6. Self-check the quality criteria in [docs/quality-rubric.md](docs/quality-rubric.md).
7. Set `status` to `published` last, and only when all publication conditions hold.
8. Run `node scripts/validate-skills.mjs` and confirm there are no errors.

## Adding an external-source skill

- Copy the `SKILL.md` content and the license file **without modification**.
- `origin: "mirrored"` and a complete `source` block are mandatory in `metadata.json`: `repo`, `path`, `version`, `retrievedAt`.
- License information is written only in the top-level `license` and `licenseFile` fields; no license is added to the `source` block.
- Copy the original license text into your own folder as `LICENSE` and point to it with `licenseFile`.
- Do not guess the license type. If the source has no license, leave `license: null` and do not make the skill `published`.

## Automated validation

The catalog is audited by a script with no dependencies:

```
node scripts/validate-skills.mjs
```

The script skips the `skills/_template` folder and checks the following for every skill:
folder name matching `id` and kebab-case form, the category value being in the allowed set
(and matching the parent folder name when present), `SKILL.md` frontmatter `name` matching
`title`, the `source` block being complete and HTTPS for `mirrored` records, the license
existing only in top-level fields and the `licenseFile` file being present, `published`
records having a license and at least one valid platform evidence entry (`basis`, HTTPS
`reference`, `verifiedAt`), and every platform written under `platforms` having complete
evidence fields also in `draft` records.

Missing publication fields in `draft` records do not produce errors. When the catalog is empty the script still succeeds.
The same command runs in GitHub Actions on `push` and `pull_request`
(`.github/workflows/validate.yml`).

## Review checklist

- [ ] `SKILL.md` frontmatter has `name` and `description`, and `description` is a single sentence.
- [ ] The folder name matches the `id` field in `metadata.json`.
- [ ] `SKILL.md` `name` matches `title` in `metadata.json`.
- [ ] License information exists only in the top-level `license` / `licenseFile` fields.
- [ ] The body gives a concrete example of the use case.
- [ ] At least one platform has `evidence.reference` (HTTPS) and `evidence.verifiedAt` (YYYY-MM-DD).
- [ ] Platforms without evidence are removed (also in `draft` records; every written platform must be verified).
- [ ] External-source skills have complete license and source information.
- [ ] No license name is written before a root `LICENSE` file is added.