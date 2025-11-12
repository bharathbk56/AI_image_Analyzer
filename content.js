chrome.runtime.onMessage.addListener((message) => {
  if (message.loading) {
    showPopup("Analyzing image...");
    return;
  }

  const { imageUrl, caption } = message;
  showPopup(`
    <img src="${imageUrl}" width="100" style="border-radius:8px"><br>
    <strong style="color:#000;">${caption}</strong>
  `);
});

function showPopup(html) {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.right = "20px";
  popup.style.bottom = "20px";
  popup.style.background = "white";
  popup.style.border = "1px solid #ccc";
  popup.style.padding = "10px";
  popup.style.borderRadius = "10px";
  popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
  popup.style.zIndex = "999999";
  popup.style.color = "#000"; // ensures all text inside is black
  popup.innerHTML = html;
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 8000);
}
