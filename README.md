# 🧠 AI Image Analyzer Chrome Extension

The **AI Image Analyzer** Chrome Extension allows users to analyze any image using Artificial Intelligence and get a **one-line smart description** instantly.  
It’s simple, fast, and perfect for understanding images at a glance.

## 🚀 Features
-  Analyze any image from the web
-  Get a one-line AI-generated description
-  Works automatically on right-click or custom trigger
-  Uses modern AI APIs for intelligent results


## 🧩 Project Structure

ai-image-analyzer/
├── manifest.json   # Defines the Chrome extension settings
├── background.js   # Handles background logic and API communication
└── content.js      # Injects code into webpages to capture image data


## 🛠️ Installation
1. Download or clone this repository:
   bash
   git clone https://github.com/YOUR_USERNAME/ai-image-analyzer.git
2. Open Chrome and go to:
   chrome://extensions/
3. Turn on **Developer Mode** (top-right).
4. Click **Load unpacked**.
5. Select the `ai-image-analyzer` folder.

Your extension is now installed! 🎉


## ⚙️ How It Works

1. The **content.js** script identifies images on the current webpage.
2. When triggered, it sends the image data to **background.js**.
3. The **background script** uses an AI API to analyze the image.
4. A **one-line description** is generated and displayed or logged.


## 🧠 Technologies Used

* **JavaScript**
* **Chrome Extension API**
* **AI Model API** (OpenAI, Hugging Face, or Google Vision)


## 🔐 API Key Security

> Never upload your private API key to GitHub!

If your background.js file contains an API key:

1. Move it to a separate file (like `config.js`).
2. Add this file to `.gitignore` before pushing:

   config.js
   .env

## 💡 Future Improvements

* 🖼️ Add drag-and-drop image analysis
* 📊 Display results in a popup window
* 💬 Support multiple AI models for comparison
* 🌙 Add dark mode UI

## 👨‍💻 Author

Bharath Kumar T
GitHub: [bharathbk56](https://github.com/bharathbk56)

## 📜 License

This project is licensed under the **MIT License** — you’re free to use and modify it.
