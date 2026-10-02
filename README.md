# SkillHub

Kaliteli, doğrulanabilir skill'leri GitHub'da klasör ağacıyla saklayan ve zaman zaman birlikte yazdığımız kendi skill'lerimizi barındıran depo.

Bu depo bir web uygulaması değildir; bir skill koleksiyonudur. Her skill, `skills/<kategori>/<skill-id>/` altında kendi klasörüyle yaşar ve `SKILL.md` dosyasıyla belgelenir.

## Depo yapısı

```
SkillHub/
├─ README.md
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

Toplam **23 skill**, 3 kategoride. Aşağıdaki sayılar `metadata.json` dosyalarından üretilir, elle yazılmaz.

### design — 18 skill

Tasarım sistemleri, tipografi, renk ve spacing, etkileşim/motion, duyarlı yerleşim, WCAG 2.2 erişilebilirlik ve mobil (iOS/Android/React Native) arayüz tasarımı.

| Skill | Durum | Lisans | Platform kanıtı |
|---|---|---|---|
| [accessibility-compliance](skills/design/accessibility-compliance) | published | MIT | claude, codex |
| [algorithmic-art](skills/design/algorithmic-art) | published | Apache-2.0 | claude |
| [brand-guidelines](skills/design/brand-guidelines) | published | Apache-2.0 | claude |
| [canvas-design](skills/design/canvas-design) | published | Apache-2.0 | claude |
| [frontend-design](skills/design/frontend-design) | published | Apache-2.0 | claude |
| [interaction-design](skills/design/interaction-design) | published | MIT | claude, codex |
| [mobile-android-design](skills/design/mobile-android-design) | published | MIT | claude, codex |
| [mobile-ios-design](skills/design/mobile-ios-design) | published | MIT | claude, codex |
| [react-native-design](skills/design/react-native-design) | published | MIT | claude, codex |
| [responsive-design](skills/design/responsive-design) | published | MIT | claude, codex |
| [screen-reader-testing](skills/design/screen-reader-testing) | published | MIT | claude, codex |
| [slack-gif-creator](skills/design/slack-gif-creator) | published | Apache-2.0 | claude |
| [theme-factory](skills/design/theme-factory) | published | Apache-2.0 | claude |
| [visual-design-foundations](skills/design/visual-design-foundations) | published | MIT | claude, codex |
| [design-system-patterns](skills/design/design-system-patterns) | published | MIT | claude, codex |
| [web-artifacts-builder](skills/design/web-artifacts-builder) | published | Apache-2.0 | claude |
| [web-component-design](skills/design/web-component-design) | published | MIT | claude, codex |
| [wcag-audit-patterns](skills/design/wcag-audit-patterns) | published | MIT | claude, codex |

### coding — 4 skill

| Skill | Durum | Lisans | Platform kanıtı |
|---|---|---|---|
| [mcp-builder](skills/coding/mcp-builder) | published | Apache-2.0 | claude |
| [skill-creator](skills/coding/skill-creator) | published | Apache-2.0 | claude |
| [small-reviewable-change](skills/coding/small-reviewable-change) | draft | — | yok |
| [webapp-testing](skills/coding/webapp-testing) | published | Apache-2.0 | claude |

### research — 1 skill

| Skill | Durum | Lisans | Platform kanıtı |
|---|---|---|---|
| [evidence-based-research](skills/research/evidence-based-research) | draft | — | yok |

Kategori listesi `scripts/validate-skills.mjs` içindeki `CATEGORIES` sabitiyle sınırlıdır.

## Katkı

Yeni skill ekleme adımları, kanıt toplama ve gözden geçirme adımları için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakın. Şablon: [skills/_template/SKILL.md](skills/_template/SKILL.md) ve `skills/_template/metadata.json`.
