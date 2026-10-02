# Katkı Rehberi

## Yeni skill ekleme

1. Kategori seçin (`coding`, `research`, `writing`, `automation`). Emin değilseniz [docs/quality-rubric.md](docs/quality-rubric.md) içindeki kalite başlıklarını okuyun.
2. Klasör oluşturun: `skills/<kategori>/<skill-id>/`. `<skill-id>` küçük harf ve kısa çizgi ile ayrılmış olmalı ve `metadata.json` içindeki `id` ile birebir aynı olmalıdır. `SKILL.md` frontmatter `name` ise görünen addır ve `metadata.json` içindeki `title` ile aynı olmalıdır.
3. `skills/_template/SKILL.md` ve `skills/_template/metadata.json` dosyalarını kopyalayıp kendi klasörünüze taşıyın.
4. Gövdeyi yazın: ne yaptığı, ne zaman kullanılacağı, girdi/çıktı, sınırlar.
5. `metadata.json` içindeki platform kanıtlarını doldurun. Kanıtsız platform alanını silin, tahmin etmeyin.
6. Kalite ölçütlerini [docs/quality-rubric.md](docs/quality-rubric.md) üzerinden kendiniz denetleyin.
7. `status` alanını en son `published` yapın; ancak tüm yayın koşulları sağlanıyorsa.
8. `node scripts/validate-skills.mjs` komutunu çalıştırıp hata olmadığını doğrulayın.

## Dış kaynaklı skill ekleme

- `SKILL.md` içeriğini ve lisans dosyasını **değiştirmeden** kopyalayın.
- `metadata.json` içinde `origin: "mirrored"` ve eksiksiz `source` bloğu zorunludur: `repo`, `path`, `version`, `retrievedAt`.
- Lisans bilgisi yalnızca üst düzey `license` ve `licenseFile` alanlarında yazılır; `source` bloğuna lisans eklenmez.
- Orijinal lisans metnini `LICENSE` olarak kendi klasörünüze alın ve `licenseFile` ile gösterin.
- Lisans türünü tahmin etmeyin. Kaynakta lisans yoksa `license: null` bırakın ve skill'i `published` yapmayın.

## Otomatik doğrulama

Katalog, bağımlılık kullanmayan bir betikle denetlenir:

```
node scripts/validate-skills.mjs
```

Betik `skills/_template` dizinini yok sayar ve her skill için şunları kontrol eder:
klasör adı `id` ile eşleşmesi ve kebab-case biçimi, kategori değerinin izinli kümede olması
(ve varsa üst klasör adıyla uyumu), `SKILL.md` frontmatter `name` ile `title` eşleşmesi,
`source` bloğunun `mirrored` kayıtlar için eksiksiz ve HTTPS olması, lisansın yalnızca üst
düzey alanlarda bulunması ve `licenseFile` dosyasının var olması, `published` kayıtlar için
lisans ve en az bir geçerli platform kanıtı (`basis`, HTTPS `reference`, `verifiedAt`).

`draft` kayıtlarda eksik yayın alanları hata üretmez. Katalog boşken betik başarıyla biter.
Aynı komut GitHub Actions içinde `push` ve `pull_request` üzerinde çalışır
(`.github/workflows/validate.yml`).

## Gözden geçirme kontrol listesi

- [ ] `SKILL.md` frontmatter'da `name` ve `description` var, `description` tek cümle.
- [ ] Klasör adı `metadata.json` `id` alanıyla eşleşiyor.
- [ ] `SKILL.md` `name` ile `metadata.json` `title` eşleşiyor.
- [ ] Lisans bilgisi yalnızca üst düzey `license` / `licenseFile` alanlarında.
- [ ] Gövde, kullanım senaryosunu somut örnek veriyor.
- [ ] En az bir platform için `evidence.reference` (HTTPS) ve `evidence.verifiedAt` (YYYY-MM-DD) var.
- [ ] Kanıtsız platform alanı kaldırılmış.
- [ ] Dış kaynaklı ise lisans ve kaynak bilgisi eksiksiz.
- [ ] Kök `LICENSE` dosyası eklenmeden lisans alanına isim yazılmamış.
