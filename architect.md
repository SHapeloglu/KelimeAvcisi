# architect.md — Kelime Avcısı Pro Mimarisi

```
Sayfada seçim ─sağ tık "ekleKelime"─► background.js ─► storage.local.kelimeler (tekrar kontrolü, büyük/küçük harf duyarsız)
chrome.alarms "kelimeHatirlat" (5 dk) ─► background.js ─► rastgele kelime ─► chrome.notifications ("kelime: not")
popup.js ◄──► storage.local { kelimeler, hatirlaticiAktif }
   ├─ not düzenle (oninput) / sil (indeks)
   ├─ Google Translate linki (sl=en → tl=tr)
   └─ CSV indir (UTF-8 BOM, ';' ayraç, "kelimelerim.csv")
```

## Depolama

| Anahtar | Tip | Varsayılan |
|---|---|---|
| `kelimeler` | `Array<string \| {ad: string, not: string}>` | `[]` |
| `hatirlaticiAktif` | bool | `true` |

## Mimari Kararlar

- **Rastgele tekrar** (aralıklı tekrar değil): basitlik için; öğrenme durumu tutulmuyor.
- **Geriye uyumluluk**: v1.2'de kelimeler düz string'di; v1.3 nesneye geçti ama eski veriyi dönüştürmeden okuyabiliyor.
- **Çeviri dış servise link**: API anahtarı gerektirmesin diye.
