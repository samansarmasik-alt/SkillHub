# Kaynak ve Kanıt Politikası

## Kaynak

Her skill'in kökeni `metadata.json` içindeki `origin` alanıyla belirlenir.

- `origin: "ours"` — bu depoda yazıldı.
- `origin: "mirrored"` — dış kaynaktan alındı.

`mirrored` skill'lerde `source` bloğu zorunludur:

```json
"source": {
  "repo": "https://github.com/<owner>/<repo>",
  "path": "skills/<skill-id>",
  "version": "<tag veya commit>",
  "retrievedAt": "YYYY-MM-DD"
}
```

Lisans bilgisi tek kaynaktan, üst düzey `license` ve `licenseFile` alanlarında tutulur. `source` bloğu lisans taşımaz; iki yerde lisans yazılırsa kayıt tutarsız sayılır.

```json
"license": "<lisans adı veya null>",
"licenseFile": "<klasör içindeki lisans dosyası veya null>"
```

Kurallar:

1. Orijinal `SKILL.md` içeriği ve lisans metni değiştirilmez. Dış kaynaklı skill'in lisans metni kendi klasörüne `LICENSE` olarak kopyalanır ve `licenseFile` ile gösterilir.
2. Lisans bulunamıyorsa `license` değeri `null` olur ve skill `published` yapılamaz.
3. Herhangi bir içerik değişikliği yapıldıysa `notes` alanında açıkça belirtilir.
4. Kopyalama tarihi `retrievedAt` olarak kaydedilir; `version` ile eşleşmelidir.

## Platform doğrulama kanıtı

`platforms` alanı platform anahtarlarını (`claude`, `codex`) taşır. Her giriş:

```json
"claude": {
  "usage": "Kullanım metni",
  "evidence": {
    "basis": "documentation",
    "reference": "https://...",
    "verifiedAt": "YYYY-MM-DD"
  }
}
```

- `basis` yalnızca `documentation` veya `hands-on` olabilir.
- `reference` HTTPS olmalıdır; kaynak metinde doğrudan alıntılanabilir bir adres tercih edilir.
- `verifiedAt` kontrol tarihidir.
- Kanıtı olmayan platform anahtarı `metadata.json` içinde **bulunmaz**. Uyumluluk tahmin edilmez.

Kanıt yetersizse skill `status: "draft"` kalır ve katalog dışında tutulur.

## metadata.json şeması (özet)

| Alan | Zorunlu | Değerler |
| --- | --- | --- |
| `id` | evet | klasör adıyla aynı, kebab-case |
| `title` | evet | görünen ad; `SKILL.md` frontmatter `name` ile aynı olmalı |
| `summary` | evet | tek cümle, en fazla 240 karakter |
| `category` | evet | `coding`, `research`, `writing`, `automation` |
| `origin` | evet | `ours`, `mirrored` |
| `status` | evet | `draft`, `published` |
| `license` | hayır | lisans adı veya `null`; tahmin edilmez |
| `licenseFile` | hayır | klasör içi lisans dosyası veya `null` |
| `source` | `mirrored` ise | yukarıdaki blok (lisans içermez) |
| `platforms` | `published` için | en az bir kanıtlı platform |
| `notes` | hayır | özgün içerik değişiklikleri |
