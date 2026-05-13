document.addEventListener("DOMContentLoaded", () => {
  const listeElemani = document.getElementById("kelimeListesi");
  const hatirlaticiCheck = document.getElementById("hatirlaticiAcKapat");

  // 1. AYARLARI YÜKLE
  chrome.storage.local.get({ hatirlaticiAktif: true }, (data) => {
    hatirlaticiCheck.checked = data.hatirlaticiAktif;
  });

  // 2. AYARLARI KAYDET
  hatirlaticiCheck.onchange = () => {
    const durum = hatirlaticiCheck.checked;
    chrome.storage.local.set({ hatirlaticiAktif: durum });
    if (durum) {
      chrome.alarms.create("kelimeHatirlat", { periodInMinutes: 5 });
    } else {
      chrome.alarms.clear("kelimeHatirlat");
    }
  };

  // 3. LİSTEYİ GÖRÜNTÜLE
  function listeyiYukle() {
    chrome.storage.local.get({ kelimeler: [] }, (data) => {
      listeElemani.innerHTML = ""; 
      data.kelimeler.forEach((item, index) => {
        const k = typeof item === "string" ? { ad: item, not: "" } : item;
        const li = document.createElement("li");

        li.innerHTML = `
          <div class="satir">
            <span class="kelime-ad">${k.ad}</span>
            <div class="buton-grubu">
              <a href="https://translate.google.com/?sl=en&tl=tr&text=${encodeURIComponent(k.ad)}&op=translate" target="_blank" class="link-btn">Çeviri</a>
              <button class="sil-btn" data-index="${index}">Sil</button>
            </div>
          </div>
          <input type="text" class="anlam-input" placeholder="Not ekle..." value="${k.not || ""}" data-index="${index}">
        `;
        listeElemani.appendChild(li);
      });

      // Silme ve Not güncelleme olayları
      document.querySelectorAll(".sil-btn").forEach(btn => {
        btn.onclick = (e) => kelimeSil(e.target.dataset.index);
      });
      document.querySelectorAll(".anlam-input").forEach(inp => {
        inp.oninput = (e) => notuGuncelle(e.target.dataset.index, e.target.value);
      });
    });
  }

  function notuGuncelle(index, yeniNot) {
    chrome.storage.local.get({ kelimeler: [] }, (data) => {
      const liste = data.kelimeler;
      if (typeof liste[index] === "string") {
        liste[index] = { ad: liste[index], not: yeniNot };
      } else {
        liste[index].not = yeniNot;
      }
      chrome.storage.local.set({ kelimeler: liste });
    });
  }

  function kelimeSil(index) {
    chrome.storage.local.get({ kelimeler: [] }, (data) => {
      const liste = data.kelimeler;
      liste.splice(index, 1);
      chrome.storage.local.set({ kelimeler: liste }, listeyiYukle);
    });
  }

  // 4. EXCEL İNDİRME
  document.getElementById("excelIndirBtn").onclick = () => {
    chrome.storage.local.get({ kelimeler: [] }, (data) => {
      if (data.kelimeler.length === 0) return alert("Liste boş!");
      let csv = "\ufeffKelime;Not\n";
      data.kelimeler.forEach(k => {
        const obj = typeof k === "string" ? { ad: k, not: "" } : k;
        csv += `"${obj.ad}";"${(obj.not || "").replace(/"/g, '""')}"\n`;
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "kelimelerim.csv";
      link.click();
    });
  };

  listeyiYukle();
});