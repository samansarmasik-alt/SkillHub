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

Doğrulanmamış platform uyumluluğu listelenmez. Kanıt bulunmayan hiçbir platform uyumu varsayılmaz ve örnek skill eklenmez.

Kanıt biçimi, alan adları ve kalite ölçütleri için [docs/source-policy.md](docs/source-policy.md) ve [docs/quality-rubric.md](docs/quality-rubric.md) dosyalarına bakın.

## Katkı

Yeni skill ekleme adımları, kanıt toplama ve gözden geçirme adımları için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakın. Şablon: [skills/_template/SKILL.md](skills/_template/SKILL.md) ve `skills/_template/metadata.json`.
