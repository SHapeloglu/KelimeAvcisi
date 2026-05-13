chrome.runtime.onInstalled.addListener(() => {
  // Sağ tık menüsünü oluştur
  chrome.contextMenus.create({
    id: "ekleKelime",
    title: "'%s' kelimesini listeye ekle",
    contexts: ["selection"]
  });

  // İlk kurulumda hatırlatıcıyı aktif et (5 dakika)
  chrome.alarms.create("kelimeHatirlat", { periodInMinutes: 5 });
});

// Alarm çaldığında rastgele kelime seç ve bildir
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "kelimeHatirlat") {
    chrome.storage.local.get({ kelimeler: [], hatirlaticiAktif: true }, (data) => {
      if (data.hatirlaticiAktif && data.kelimeler.length > 0) {
        const rastgeleIndis = Math.floor(Math.random() * data.kelimeler.length);
        const secilen = data.kelimeler[rastgeleIndis];
        const kelime = typeof secilen === "string" ? secilen : secilen.ad;
        const not = typeof secilen === "string" ? "" : secilen.not;

        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon128.png", // Eğer ikonun yoksa burayı boş geçebilirsin
          title: "💡 Kelimeyi Hatırlıyor musun?",
          message: `${kelime}: ${not || "Henüz bir not eklenmemiş."}`,
          priority: 2
        });
      }
    });
  }
});

// Sağ tıkla kelime ekleme işlemi
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "ekleKelime" && info.selectionText) {
    const yeniKelime = info.selectionText.trim();
    chrome.storage.local.get({ kelimeler: [] }, (data) => {
      const guncelListe = data.kelimeler;
      const varMi = guncelListe.some(item => 
        (typeof item === "string" ? item : item.ad).toLowerCase() === yeniKelime.toLowerCase()
      );

      if (!varMi) {
        guncelListe.push({ ad: yeniKelime, not: "" });
        chrome.storage.local.set({ kelimeler: guncelListe });
      }
    });
  }
});