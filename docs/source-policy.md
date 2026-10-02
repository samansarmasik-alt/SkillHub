# Source and Evidence Policy

## Source

The origin of every skill is declared by the `origin` field in `metadata.json`.

- `origin: "ours"` — written in this repository.
- `origin: "mirrored"` — taken from an external source.

The `source` block is mandatory for `mirrored` skills:

```json
"source": {
  "repo": "https://github.com/<owner>/<repo>",
  "path": "skills/<skill-id>",
  "version": "<tag or commit>",
  "retrievedAt": "YYYY-MM-DD"
}
```

License information lives in exactly one place: the top-level `license` and `licenseFile` fields. The `source` block carries no license; writing the license in two places is considered an inconsistent record.

```json
"license": "<license name or null>",
"licenseFile": "<license file inside the folder or null>"
```

Rules:

1. The original `SKILL.md` content and license text are not modified. The license of an external-source skill is copied into its own folder as `LICENSE` and shown with `licenseFile`.
2. If no license can be found, `license` becomes `null` and the skill cannot be `published`.
3. If any content change was made, it is stated explicitly in the `notes` field.
4. The copy date is recorded as `retrievedAt` and must match `version`.

## Platform verification evidence

The `platforms` field carries platform keys (`claude`, `codex`, `copilot`). Each entry:

```json
"claude": {
  "usage": "Usage text",
  "evidence": {
    "basis": "documentation",
    "reference": "https://...",
    "verifiedAt": "YYYY-MM-DD"
  }
}
```

- `basis` may only be `documentation` or `hands-on`.
- `reference` must be HTTPS; an address that can be quoted directly from the source text is preferred.
- `verifiedAt` is the date of the check.
- A platform key without evidence is **absent** from `metadata.json`. Compatibility is never guessed.

If the evidence is insufficient the skill stays `status: "draft"` and is kept out of the catalog.

## metadata.json schema (summary)

| Field | Required | Values |
| --- | --- | --- |
| `id` | yes | same as the folder name, kebab-case |
| `title` | yes | display name; must match the `SKILL.md` frontmatter `name` |
| `summary` | yes | one sentence, at most 240 characters |
| `category` | yes | `coding`, `research`, `writing`, `automation`, `design` |
| `origin` | yes | `ours`, `mirrored` |
| `status` | yes | `draft`, `published` |
| `license` | no | license name or `null`; never guessed |
| `licenseFile` | no | in-folder license file or `null` |
| `source` | if `mirrored` | the block above (carries no license) |
| `platforms` | for `published` | at least one verified platform |
| `notes` | no | original content changes |