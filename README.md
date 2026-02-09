# KAVACH | The Shield That Hides in Plain Sight

**KAVACH** is a premium personal safety suite designed to provide stealth, security, and legal-grade evidence during emergency situations. It focuses on the psychological and practical needs of users in danger—discretion, speed, and deterrents.

## 🛡️ Key Features

### Stealth Mode (The "Invisible" App)
* **Disguise:** The app icon and landing screen mimic a "System Storage Cleaner."
* **The Secret Handshake:** Access to the safety dashboard is hidden behind a 3-second long-press on the cleaner logo. 
* **Utility:** If an attacker takes your phone, they see a boring utility app, not a safety tool they need to disable.

### Shake to Wake (Panic Trigger)
* **Instinctive Activation:** In a struggle, you can't look at a screen. A hard shake triggers the SOS sequence immediately, even from inside a pocket.
* **Zero-UI Interaction:** No need to unlock the phone or find a button.

### Black Box Recording (Tamper-Proof Evidence)
* **Digital Thumbprint:** Once triggered, the app records 30 seconds of ambient audio and generates a **SHA-256 cryptographic hash**.
* **Legal Integrity:** This hash acts as a "digital seal," proving in court that the audio is 100% authentic and has not been altered or deepfaked.

### Ghost Call (The Decoy)
* **Social Shield:** Trigger a realistic incoming call from "Dad" or "Police."
* **Deterrent:** Provides a natural excuse to speak loudly, announce your location, and discourage a follower without direct confrontation.

### Bright-Path Maps
* **Safety-First Routing:** Uses lighting data and commercial activity to map routes that are well-lit and populated.
* **Avoid the Dark:** Unlike standard maps that prioritize speed, Bright-Path ensures you stay in high-visibility areas.

## Technical Stack
* **Frontend:** HTML5, CSS3 (Modern Flexbox/Grid)
* **Typography:** Inter (Variable Font) for a premium, bold aesthetic.
* **Icons:** Remix Icon Library
* **Logic:** Vanilla JavaScript for secret-handshake timing and cryptographic simulation.

## 🚀 How to Run
1.  Clone the repository.
2.  Ensure you have a `logo.png` file in the root directory (to serve as the disguise icon).
3.  Open `index.html` in any modern mobile browser.
4.  **To Enter:** Long-press the logo for 3 seconds.
5.  **To Trigger Shake (Demo):** Press the `S` key on your keyboard to simulate a panic shake.

## Legal Note
The "Black Box" feature is designed to follow data integrity standards. In a full production environment, the generated SHA-256 hash is immediately uploaded to a decentralized cloud or a trusted contact's server to prevent local tampering.
