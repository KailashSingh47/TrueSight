# TrueSight AI 👁️
**AI-Verified Credibility & Logic Analysis Engine**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Live](https://img.shields.io/badge/Status-Online-success)]()

## 🚀 Project Overview
**TrueSight** is a next-generation web application designed to combat misinformation in the digital age. Unlike standard fact-checkers that rely on black-box databases, TrueSight uses a transparent **heuristic analysis engine** to evaluate text for:
1.  **Linguistic Red Flags**: Emotional manipulation, absolutist language, and sensationalism.
2.  **Logical Fallacies**: Ad hominem attacks, whataboutism, and circular reasoning.
3.  **Source Integrity**: Domain reputation and citation reliability.

It features a cryptographic **Truth Ledger** that generates an immutable SHA-256 hash for every analysis, ensuring that results cannot be tampered with—a critical feature for academic and journalistic integrity.

## ✨ Key Features
*   **🔍 Advanced Text Scanner**: Real-time analysis of text inputs with immediate credibility scoring.
*   **⛓️ Truth Ledger**: A local, immutable history of all analyses protected by **SHA-256 integrity hashing**.
*   **📊 Analytics Dashboard**: Interactive charts visualizing credibility trends and verdict distributions over time.
*   **📄 Professional Reports**: One-click generation of branded **PDF Certificates** for research or documentation.
*   **🎥 Media Intelligence (Simulated)**: A dedicated module demonstrating deepfake detection capabilities for audio and video.
*   **🤖 System Guide**: An integrated AI chatbot assistant to help users navigate the tools.

## 🛠️ Technology Stack
*   **Frontend**: React.js + Vite (High-performance SPA)
*   **Styling**: CSS Modules with "Glassmorphism" Design System & Google Fonts (Outfit/Space Grotesk)
*   **Visualization**: Recharts (Data analytics)
*   **Utilities**: Web Crypto API (Hashing), jsPDF (Report generation)
*   **Hosting**: Client-side deployment (Netlify/Vercel compatible)

## 🏃‍♂️ How to Run Locally
1.  Clone the repository:
    ```bash
    git clone https://github.com/KailashSingh47/TrueSight.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
_______OR______

google -->  truesighty.vercel.app        


Direct link-->  https://truesighty.vercel.app/

    🚀 Future Innovation Roadmap for TrueSight
This document captures ideas and research directions discussed during the initial development phase, to be implemented in future iterations (v2.0+).

🧠 Phase 1: AI Integration (The "Real Brain")
Currently, TrueSight uses a heuristic engine (rules-based). The next step is connecting it to actual LLMs.

Integration with Gemini/GPT API: Replace the 
linguistic.js
 rule engine with a real-time call to an LLM.
Prompt: "Analyze this text for logical fallacies and return a JSON score."
Benefit: Much higher accuracy and distinct explanation of why something is a fallacy.
Fact-Checking Database: Connect to Google Fact Check Tools API to verify specific claims against known debunks.


🔗 Phase 2: Decentralized Truth Ledger (Web3)
Currently, 
ledger.js
 uses local storage and simple SHA-256.

Blockchain Integration: Store the SHA-256 hashes on a low-cost blockchain (Polygon or Solana) or a decentralized storage (IPFS/Arweave).
Why?: This makes the "Immutable Record" truly public and verifiable by anyone in the world, not just the local user. Perfect for a "Global Truth Registry."


🕵️ Phase 3: Browser Extension
Chrome/Edge Extension: Instead of copy-pasting text into the website, the user highlights text on any website (Twitter, CNN, etc.) and right-clicks "Verify with TrueSight."
Overlay UI: A small popup shows the credibility score directly over the social media post.


📹 Phase 4: Real Media Forensics
Currently, MediaScanner.js is a simulation.

Audio Analysis: Python backend (FastAPI) using libraries like librosa to detect deepfake audio signatures.
Video Frame Analysis: Extract keyframes and check for face-swapping artifacts using OpenCV.


🧪 Phase 5: The "Bias Lens"
Political Spectrum Analysis: Train a model to detect left/right political leaning in the text, not just "credibility."
Tone Rewriter: A generic "De-sensationalizer" button that rewrites the clickbait headline into a neutral fact.

## 👥 Contributors
*   **Kailash Singh** - Lead Developer

---
*Built for the Future of Information Integrity.*
