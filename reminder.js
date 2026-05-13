{
  "manifest_version": 3,
  "name": "Kelime Avcısı Pro",
  "version": "1.2",
  "description": "Sağ tıkla kelime ekle, anlamını yaz ve 10 dakikada bir hatırla!",
  "permissions": [
    "contextMenus",
    "storage",
    "alarms"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html"
  }
}