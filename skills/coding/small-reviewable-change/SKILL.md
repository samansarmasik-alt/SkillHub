---
name: small-reviewable-change
description: Kucuk ve incelenebilir kod degisikligi uretir; kapsam daraltma, kanit gosterme ve tek bir is mantigi icin gereksiz refactor yapmama kurallarini uygular.
---

# Kucuk, Incelenebilir Kod Degisikligi

Bu skill, tek bir is mantigini hedefleyen, kaniti gorunur ve inceleme maliyeti
dusuk degisiklikler uretir. Amac en az satir degil, **en az baslik**.

## Tetikleyiciler

- Tek bir hata, ozellik veya uyumsuzluk duzeltmesi istegi ("X calismiyor",
  "Y hatasi veriyor", "test sureyi gecmiyor").
- Bir testin kirilmasi ve duzeltilmesi istegi.
- Refactor istegi **oldugu halde** kapsam sinirli degilse: bu skill neyi
  degistirmeyecegini soyler, kodun genel mimarisine dokunmaz.

Buyuk yeniden yazim, bagimlilik yukseltme veya cok dosyali mimari degisikligi bu
skill'in kapsami disindadir; once kapsam daralt veya ayri bir plan iste.

## Adimlar

### 1. Davranisi ozetle
Degisiklikten once hedef davranisini tek cumleyle yaz ve mevcut davranisi da
yaz. Ikisi ayniysa istenen degisiklik bu degildir; netlestir.

### 2. Dosya ve satir sinirini sec
Degisikligin **minimum dosya kumesini** sec. Kendi kriterin:
- Hata mesaji veya test ciktisinin gosterdigi yeri duzelt.
- Degisiklik icin zorunlu olan bir ek dosyaya dokun.
- Buraya eklenen her dosya icin gerekce yaz; gerekce yoksa o dosya degistirilmez.

Gereksiz dosyaya eklenen satir, yazilmis kod degil, harcanmis inceleme
kapasitesidir.

### 3. Koku (root cause) bul
Semptomu degil, nedeni duzelt. Semptom duzeltmesi ancak kenar durumlarinda
zorunluysa yapilir ve `notlar` bolumunde gerekcesi yazilir.

Kendinden su sorulara evet diyorsan geri don:
- "Bu degisiklik, ayni hatanin tekrarini engelliyor mu?"
- "Bu hata, degisikligin disinda bir yerde de olabilir mi? O zaman neden burada?"

### 4. Minimum diff
- Var olan kodu bicimlendirme, yeniden adlandirma veya siralama degisikligiyle
  karistirma.
- Ayni dosyada birden fazla ilgisiz duzeltme yapma.
- Yeni bagimlilik ekleme; once mevcut araclarin yeterli olup olmadigina bak.
- Degisiklik, istenen davranisi bozmamali; genellestirme istersen belirt, ekleme.

### 5. Dogrula
Derleme, tip denetimi, lint ve ilgili testi calistir ve **komutun gercek
ciktisini** raporla. Calistirmadigin bir kontrolun basarili oldugunu iddia etme.
Bir kontrolu calistirmadan geciyorsan bunu acikca soyle.

Calistirdigin her kontrol icin hangi adimi sifirdan dogruladigini yaz:
"X testi calisti, hata Y testi, Z testi gecti" biciminde, dosya:satir ile.

### 6. Raporla
Asagidaki blokla rapor ver. Kodu, metni veya yorumu tekrarlama.

```
### Ne yapildi
- <degisiklik> — dosya:satir

### Neden
- <kok neden, tek cumle>

### Dogrulama
- <komut> — <sonuc>
```

## Cikti bicimi

Yukaridaki uc baslik zorunludur. Ayrica:
- Degisiklik **dort satiri gecmiyorsa** ozet paragraf yeterlidir; yapay
  bicimde uzatma.
- Ek dosya degistiyse her dosya icin gerekce yaz.
- Calistirilmayan kontrol kaldiysa listele.

## Sinirlar

- Ilgisiz kod temizligi, refactor veya dosya yeniden adlandirma **yapilmaz**.
  Istenirse ayri ve isaretlenmis bir degisiklik olarak teklif edilir.
- Kapsam buyutulmez: kucuk is icin fazladan dosya acmak bu skill'in ihlalidir.
- Public API, veri tabani semasi, migration veya kimlik dogrulama akisi
  degistiriliyorsa ek onay istenir; bu skill bu degisiklikleri tek basina
  yurutmez.
- Kaniti calistirilmayan bir kontrol "gecerli" sayilmaz; raporda acikca yazilir.
- Silme, yeniden adlandirma veya buyuk refactor bu skill'in kapsaminda
  degildir; ayrica plan ve onay gerekir.

## Somut ornek

**Istek**: "Dogrulama script'i BOM'lu JSON dosyalarini okuyamadi, duzelt."

**Ne yapildi**
- JSON ve SKILL.md okumalarinda bastaki `\uFEFF` temizlendi — `scripts/validate-skills.mjs:86` ve `:209`
- Klasor adi ile `metadata.json.id` karsilastirmasi eklenerek BOM kaynakli yanlis "frontmatter yok" tespiti giderildi

**Neden**
- `JSON.parse` ve frontmatter ayristirici, dosyanin basindaki BOM karakterini
  verinin parcasi saydi; hata gercek bir sema hatasinin kaynakli degildi.

**Dogrulama**
- `node scripts/validate-skills.mjs` — bom'lu fixture ile 2 hata (bom'dan kaynakli
  oldugu bilinen iki adet), BOM temizlendikten sonra yalniz gercek sema hatalari
  kaldi; gecerli fixture ile exit 0
- `node --check scripts/validate-skills.mjs` — exit 0

**Ek dosya degisikligi**: yok. Degisiklik tek dosyada kaldi.