# Kelime Avcısı Pro (Chrome eklentisi)

Yabancı dilde okurken karşılaştığınız kelimeleri tek tıkla kaydedip ezberlemenize yardım eden tarayıcı eklentisi.

## Özellikler

- **Sağ tık → "'…' kelimesini listeye ekle"** ile sayfadaki seçili kelimeyi kaydetme (aynı kelime iki kez eklenmez).
- Her kelimeye **not / anlam** yazma.
- **Çeviri** bağlantısı (Google Translate, İngilizce → Türkçe).
- **5 dakikada bir** listeden rastgele bir kelimeyi notuyla birlikte masaüstü bildirimi olarak hatırlatma (aç/kapat).
- Listeyi **CSV** olarak indirme (`kelimelerim.csv`, Excel uyumlu).

## Kurulum

1. Bu klasörü indirin.
2. `chrome://extensions` → **Geliştirici modu** → **Paketlenmemiş öğe yükle** → klasörü seçin.

## Kullanım

1. Bir sayfada kelimeyi seçin, sağ tıklayıp listeye ekleyin.
2. Eklenti simgesine tıklayın; kelimenin altındaki kutuya anlamını yazın (otomatik kaydedilir).
3. Hatırlatıcıyı üstteki onay kutusundan açıp kapatın.

## Bilinen sorunlar

- Bildirim simgesi (`icons/icon128.png`) repoda yok; bazı Chrome sürümlerinde hatırlatma bildirimi bu yüzden görünmeyebilir.
- `reminder.html` / `reminder.js` şu an kullanılmayan kalıntı dosyalardır.
- `KeimeEzber.7z` önceki sürümün (v1.2) arşividir.

Veriler yalnızca tarayıcınızda saklanır.
