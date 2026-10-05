# CLAUDE.md — Kelime Avcısı Pro (Chrome eklentisi)

Kelime ezberleme eklentisi (MV3, v1.3). Sayfada seçili metne sağ tıklayıp listeye eklenir; popup'ta her kelimeye not (anlam) yazılır, Google Translate bağlantısı verilir; 5 dakikada bir rastgele kelime sistem bildirimiyle hatırlatılır. Liste CSV olarak indirilebilir.

- GitHub: https://github.com/SHapeloglu/KelimeAvcisi (tek commit, 2026-05-13)
- Mimari: `architect.md` · Görevler: `task.md` · Fikirler: `backlog.md` · Günlük: `session.md`

## Çalıştırma

Derleme yok. `chrome://extensions` → Geliştirici modu → "Paketlenmemiş öğe yükle" → bu klasör. Sağ tık menüsü ve alarm `onInstalled`'da kurulduğu için arka plan değişikliklerinden sonra eklentiyi **kaldırıp yeniden yüklemek** gerekebilir.

## Dosyalar

- `manifest.json` — izinler `contextMenus, storage, alarms, notifications`.
- `background.js` — sağ tık menüsü `ekleKelime`, `kelimeHatirlat` alarmı (5 dk), bildirim.
- `popup.html` / `popup.js` — liste, not düzenleme, silme, hatırlatıcı aç/kapa, CSV indir.
- `reminder.html` / `reminder.js` — **kullanılmayan kalıntı**: hiçbir yerden açılmıyor; `reminder.js` içinde JS değil eski (v1.2) manifest JSON'u var.
- `KeimeEzber.7z` — 2026-03/04 tarihli eski sürüm arşivi.

## Kurallar ve Tuzaklar

- `kelimeler` öğeleri ya eski format **string** ya da `{ad, not}` nesnesi olabilir; her okuma noktası `typeof item === "string"` kontrolü yapıyor — yeni kodda da koru (veya tek seferlik dönüştürme yaz).
- **Bildirim simgesi yok:** `background.js` `icons/icon128.png` kullanıyor ama klasör repoda yok. Chrome `basic` bildirimde geçerli `iconUrl` ister; simge eklenmeden hatırlatma bildirimi çıkmayabilir.
- Popup listeyi `innerHTML` ile kuruyor; kelime/not içindeki `"` veya `<` arayüzü bozar (not alanı `value="${...}"` içinde kaçışsız).
- Not her tuş vuruşunda storage'a yazılıyor (`oninput`); büyük listelerde gecikme olursa debounce ekle.
- Sil, liste indeksiyle çalışıyor — sıralama/filtre eklersen indeks yerine kimlik kullan.
- Oturum sonunda `session.md`'ye kayıt düş, `task.md`'yi güncelle.
