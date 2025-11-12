const GEMINI_API_KEY = "USE_YOUR_APIKEY"; 
const GEMINI_MODEL = "CHOOSE YOUR GEMINI MODEL";


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "describeAI",
    title: "Describe AI",
    contexts: ["image"]
  });
});


chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "describeAI") return;

  const tabId = tab.id;
  const imageUrl = info.srcUrl;

  console.log("🔍 Image selected:", imageUrl);

  try {
    // Inject content.js dynamically (avoids “Receiving end does not exist”)
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"]
    });
    console.log("✅ content.js injected");
  } catch (err) {
    console.warn("⚠️ Could not inject content script (may already exist):", err.message);
  }

  
  try {
    chrome.tabs.sendMessage(tabId, { loading: true, caption: "Analyzing image..." });
  } catch (err) {
    console.warn("⚠️ Could not send loading message:", err.message);
  }

  
  try {
    const caption = await getImageDescription(imageUrl);
    console.log("🧠 Gemini caption:", caption);
    try {
      chrome.tabs.sendMessage(tabId, { imageUrl, caption });
    } catch (err) {
      console.warn("⚠️ Could not send caption message:", err.message);
    }
  } catch (error) {
    console.error("❌ Error while describing image:", error);
    try {
      chrome.tabs.sendMessage(tabId, { imageUrl, caption: "Error: " + error.message });
    } catch (err2) {
      console.warn("⚠️ Could not send error message:", err2.message);
    }
  }
});


async function getImageDescription(imageUrl) {
  try {
    const base64 = await imageToBase64(imageUrl);
    console.log("📸 Converted image to base64 (length:", base64.length, ")");

    const payload = {
      contents: [
        {
          parts: [
            { text: "Describe this image in one short sentence." },
            { inline_data: { mime_type: "image/jpeg", data: base64 } }
          ]
        }
      ]
    };

    const url = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    console.log("🚀 Sending request to Gemini:", url);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    console.log("📨 Gemini raw response:", result);

    if (!res.ok) {
      throw new Error(`Gemini API Error: ${JSON.stringify(result.error || result)}`);
    }

    const text =
      result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No description found.";

    return text;
  } catch (err) {
    console.error("💥 getImageDescription failed:", err);
    throw err;
  }
}


async function imageToBase64(url) {
  try {
    if (url.startsWith("data:")) {
      console.log("🔁 Image already base64 data URL");
      return url.split(",")[1];
    }

    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) {
      throw new Error(`Failed to fetch image (${res.status}) — CORS blocked or inaccessible.`);
    }

    const blob = await res.blob();
    return await blobToBase64(blob);
  } catch (err) {
    console.error("💥 imageToBase64 failed:", err);
    throw err;
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
