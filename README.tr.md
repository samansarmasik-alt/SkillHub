# SkillHub

Kaliteli, doğrulanabilir skill'leri GitHub'da klasör ağacıyla saklayan ve zaman zaman birlikte yazdığımız kendi skill'lerimizi barındıran depo.

Bu depo bir web uygulaması değildir; bir skill koleksiyonudur. Her skill, `skills/<kategori>/<skill-id>/` altında kendi klasörüyle yaşar ve `SKILL.md` dosyasıyla belgelenir.

Diller: [English](README.md) | [Türkçe](README.tr.md)

## Depo yapısı

```
SkillHub/
├─ README.md
├─ README.tr.md
├─ CONTRIBUTING.md
├─ skills/
│  ├─ _template/            # yeni skill eklemek için kopyalanan şablon (kataloglanmaz)
│  └─ <kategori>/<skill-id>/
│     ├─ SKILL.md           # tek kaynak: name/description frontmatter + gövde
│     ├─ metadata.json      # kaynak, sürüm, lisans ve platform doğrulama bilgisi
│     ├─ references/        # uzun dokümantasyon, örnekler
│     ├─ scripts/           # çalıştırılabilir yardımcılar
│     └─ assets/            # şablon ve çıktı dosyaları
└─ docs/
   ├─ quality-rubric.md     # kabul ve kalite ölçütleri
   └─ source-policy.md      # dış kaynak, lisans ve kanıt kuralları
```

## Kaynak sınıflandırması

- **Kendi skill'lerimiz:** doğrudan bu depoda yazıldı. Lisans seçimi yapılmadan `metadata.json` içinde `license` ve `licenseFile` alanları `null` bırakılır ve kök `LICENSE` dosyası eklenene kadar bu değerler korunur.
- **Dış kaynaklı skill'ler:** özgün `SKILL.md` içeriği ve lisansı değiştirilmez. `metadata.json` içinde `source` alanı zorunludur: depo adresi, kaynak yol, sürüm/etiket ve alınmış tarih. Lisans adı ve lisans dosyasının konumu üst düzey `license` ve `licenseFile` alanlarında tutulur.

Dış kaynaklı skill'ler kopyalanırken yalnızca klasör yapısı korunur; hiçbir içerik yeniden yazılmaz veya sadeleştirilmez.

## Yayın koşulu

Bir skill yalnızca aşağıdaki koşulların tamamı sağlandığında `metadata.json` içinde `status: "published"` alır:

1. `SKILL.md` geçerli frontmatter (`name`, `description`) taşır.
2. Gövde, skill'in ne yaptığını ve nasıl kullanıldığını açıklar.
3. En az bir platform için tarihli doğrulama kanıtı vardır (`platforms.<platform>.evidence`).
4. Dış kaynaklı ise `source` bloğu ve üst düzey lisans alanları eksiksizdir.

`status` değeri `draft` olsa bile `platforms` altına yazılan her platform kanıt taşımak zorundadır; kanıtsız bir platform alanı yazılırsa doğrulayıcı hata üretir. Doğrulanmamış platform uyumluluğu hiçbir şekilde listelenmez: alan boş bırakılır veya tümüyle yazılmaz. Kanıt bulunmayan hiçbir platform uyumu varsayılmaz ve örnek skill eklenmez.

Yayın için tek bir platformun geçerli kanıtla doğrulanması yeterlidir; diğer platformların kanıtı yoksa skill yine `published` olabilir.

Kanıt biçimi, alan adları ve kalite ölçütleri için [docs/source-policy.md](docs/source-policy.md) ve [docs/quality-rubric.md](docs/quality-rubric.md) dosyalarına bakın.

## Katalog

Toplam **71 skill**, 5 kategoride. Aşağıdaki sayılar `metadata.json` dosyalarından üretilir, elle yazılmaz.

### design — 22 skill

Tasarim sistemleri, tipografi, renk ve spacing, etkilesim/motion, duyarli yerlesim, WCAG 2.2 erisilebilirlik, React 19 arayuz ve gorsel inceleme.

| Skill | Durum | Lisans | Platform kanıtı |
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

### coding — 35 skill

Backend ve API tasarimi, mimari kaliplar, JS/TS/Go/Python dil kisayollari, test ve hata yonetimi, veri tabani, CI/CD, gozden gecirme ve guvenlik incelemesi.

| Skill | Durum | Lisans | Platform kanıtı |
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
| [small-reviewable-change](skills/coding/small-reviewable-change) | draft | - | yok |
| [test-gap-audit](skills/coding/test-gap-audit) | published | MIT | copilot |
| [typescript-advanced-types](skills/coding/typescript-advanced-types) | published | MIT | claude, codex |
| [webapp-testing](skills/coding/webapp-testing) | published | Apache-2.0 | claude |
| [workflow-orchestration-patterns](skills/coding/workflow-orchestration-patterns) | published | MIT | claude, codex |

### automation — 8 skill

Belge ve sunum uretimi, API semasi uretimi, changelog otomasyonu, tehdit modelleme, metrik/uyari yapilandirmasi ve savunmaci kabuk yazimi.

| Skill | Durum | Lisans | Platform kanıtı |
|---|---|---|---|
| [attack-tree-construction](skills/automation/attack-tree-construction) | published | MIT | claude, codex |
| [bash-defensive-patterns](skills/automation/bash-defensive-patterns) | published | MIT | claude, codex |
| [changelog-automation](skills/automation/changelog-automation) | published | MIT | claude, codex |
| [github-actions-templates](skills/automation/github-actions-templates) | published | MIT | claude, codex |
| [openapi-spec-generation](skills/automation/openapi-spec-generation) | published | MIT | claude, codex |
| [prometheus-configuration](skills/automation/prometheus-configuration) | published | MIT | claude, codex |
| [security-requirement-extraction](skills/automation/security-requirement-extraction) | published | MIT | claude, codex |
| [stride-analysis-patterns](skills/automation/stride-analysis-patterns) | published | MIT | claude, codex |

### writing — 5 skill

Ortak dokuman yazim sureci, mimari karar kayitlari, olay runbook ve postmortem yazimi, karsi taraf iletisimi.

| Skill | Durum | Lisans | Platform kanıtı |
|---|---|---|---|
| [architecture-decision-records](skills/writing/architecture-decision-records) | published | MIT | claude, codex |
| [discernment-nudge](skills/writing/discernment-nudge) | published | Apache-2.0 | claude |
| [incident-runbook-templates](skills/writing/incident-runbook-templates) | published | MIT | claude, codex |
| [internal-comms](skills/writing/internal-comms) | published | Apache-2.0 | claude |
| [postmortem-writing](skills/writing/postmortem-writing) | published | MIT | claude, codex |

### research — 1 skill

Kanita dayali arastirma ve varsayim denetimi.

| Skill | Durum | Lisans | Platform kanıtı |
|---|---|---|---|
| [evidence-based-research](skills/research/evidence-based-research) | draft | - | yok |
Kategori listesi `scripts/validate-skills.mjs` içindeki `CATEGORIES` sabitiyle sınırlıdır. Lisansı `-` olan skill'ler `draft` durumdadır ve serbest dağıtıma hazır sayılmaz.

## Katkı

Yeni skill ekleme adımları, kanıt toplama ve gözden geçirme adımları için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakın. Şablon: [skills/_template/SKILL.md](skills/_template/SKILL.md) ve `skills/_template/metadata.json`.
