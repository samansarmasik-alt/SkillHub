---
name: evidence-based-research
description: Bir konu hakkinda iddia uretmek yerine, hangi kaynagin hangi cumleyi destekledigini adim adim izleyen arastirma sonucu uretir.
---

# Kanita Dayali Arastirma

Bu skill, soruya cevap uretirken her iddianin hangi kaynaktan geldigini
gorunur kilan bir arastirma akisidir. Amac hizli cevap degil, **tasinabilir
kanit** uretmektir: okuyan baska biri iddiayi ayni kaynaktan yeniden
dogrulayabilmelidir.

## Tetikleyiciler

Bu skill su isteklerde kullanilir:

- "X gercekten dogru mu?", "en iyi/guncel/guvenilir Y nedir?" gibi dogrulama istegi.
- "karsilastir", "hangisi daha iyi", "artilar ve eksiler" turunden kiyas talebi.
- Bir kararin arkasina kanit, tarih, surum veya kaynak gerektigi durumlar.
- Bir onceki cevabin dayandigi varsayimin denetlenmesi.

Tetikleyici yoksa kullanma: yalnizca kisa bir bilgi sorusu icin gerekmez.

## Adimlar

### 1. Soruyu olcebilir hale getir
Soru genis veya belirsizse once sinirla. Arastirmanin bitim kriterini tek cumleyle
yaz: "X icin, Y kosulunda, en gecerli kaynak ne diyor?" Bu cumle sonunda
raporun "Kapsam" bolumune aynen girer.

### 2. Kaynak hiyerarsisi kur
Kaynaklari su sirayla tercih et ve hangi cografyayi taradigini yaz:

1. Birincil kaynak: resmi dokuman, kaynak kodu, yasa metni, veri tabani kaydi.
2. Birincil kaynagi yorumlayan guvenilir ikincil kaynak.
3. Topluluk kaynaklari (issue, tartisma, blog) yalnizca birincil kaynak bulunamazsa.

Guncellik belirsizse kaynagin yayin/versiyon tarihini kontrol et; tarihi olmayan
kaynagi kanit degil, ipucu say.

### 3. Ayni iddiayi iki kaynaktan dogrula
Tek kaynak yeterli degildir. Kritik her iddia icin:
- bir kaynagi oku ve ilgili cumleyi **alintila**,
- bagimsiz bir ikinci kaynaktan ayni iddiayi ara,
- ikisi cakistigini belirt ve hangisinin gecerli oldugunu gerekceyle sec.

Cakisma bulunmazsa bunu da yaz ("tek kaynakla sinirli kaldi"). Bu, eksikligi
gizlemekten iyidir.

### 4. Kaniti kaydet
Her bulgu icin su alanlari doldur. Eksik alan bir bulguyu tabii degil yapar:

- **Iddia** — tek cumle, dogrulanabilir bicimde.
- **Kaynak** — baslik + adres (`url` veya dosya:satir).
- **Alinti** — iddiayi tasiyan kisa gercek metin.
- **Tur** — `documentation` (kaynak metin) veya `hands-on` (kendi calistirmam).
- **Tarih** — kaynagin tarihi `YYYY-MM-DD`.
- **Guven** — `yuksek` / `orta` / `dusuk`, nedeniyle birlikte.

`hands-on` kanit kullanildiysa, calistirilan komutun **gercek ciktisi** yazilir;
cikti uydurulamaz ve kisaltilamaz.

### 5. Konusmayanlari ayir
Arastirma sirasinda denenen ve ise yaramayan yollari ayri bir bolumde listele.
Bu, ayni hatayi tekrar etmeyi engeller ve hangi bosluklarin kapali
olmadigini gosterir.

## Cikti bicimi

Markdown, sirali bolumlerle:

```
## Kapsam
<olculebilir soru ve sinirlar>

## Bulgular
### <bulgu basligi>
- Iddia: ...
- Kaynak: <baslik> — <adres>
- Alinti: "..."
- Tur: documentation | hands-on
- Tarih: YYYY-MM-DD
- Guven: yuksek | orta | dusuk — <gerekce>

## Cakismalar ve belirsizlikler
- ...

## Dogrulanamayanlar
- <iddia veya konu ve neden kanitlanamadi>

## Kaynaklar
- <adres> — <baslik> — <YYYY-MM-DD>
```

## Sinirlar

- Kaynak bulunamadiginda **uydurma kaynak, tarih veya alinti yazma**. Kaynak
  yoksa "bulunamadi" yaz ve bulguyu `Dogrulanamayanlar` bolumune tasi.
- Alinti, kaynaktan birebir olmali; ozetleme alinti gibi sunulamaz. Paragraf
  sonu kisaltmasi `...` ile isaretlenir.
- Uydurulmus alintiyi tespit etmek mumkun degildir; bu yuzden her alintiyi
  alirken kaynagi acikca yaz. Kaynaga erisemiyorsan alinti yazma.
- Platform uyumlulugu, performans olcumu veya lisans durumu **tahmin edilmez**;
  kanit yoksa kayit `draft` kalir.
- Tek kaynakla dogrulanan bir iddia, cok kaynakla dogrulananla ayni guvende
  degildir; bunu belirt.

## Somut ornek

**Soru**: "Bu repo icindeki dogrulama script'i CI'da calisiyor mu?"

**Kapsam**: SkillHub deposunda `.github/workflows/validate.yml` ve
`scripts/validate-skills.mjs` dosyalarinin push ve pull_request olaylarinda
cagrilip cagrilmadigi.

**Bulgular**
### Dogrulama adimi CI'da tanimli
- Iddia: Her push ve pull_request'te `node scripts/validate-skills.mjs` calistirilir.
- Kaynak: .github/workflows/validate.yml
- Alinti: "run: node scripts/validate-skills.mjs"
- Tur: documentation
- Tarih: <dosya son okuma tarihi>
- Guven: yuksek — tanim dogrudan dosyada; ayrica yerelde calistirildi ve exit 0 verdi.

**Dogrulanamayanlar**
- GitHub Actions'in o an gercekten yesil oldugu: yerel calistirma yalnizca script'in
  dogru oldugunu gosterir, uzaktaki kosullari gostermez. Dashboard ekran goruntusuyle
  dogrulanmali.

**Kaynaklar**
- https://github.com/<owner>/<repo>/blob/main/.github/workflows/validate.yml — validate.yml — <YYYY-MM-DD>