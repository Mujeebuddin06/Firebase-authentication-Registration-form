🔐 Modern Login Page

A modern, responsive sign-in / sign-up page with a sliding panel animation, powered by Firebase Authentication and Cloud Firestore.

✨ Features
Sliding Sign In ↔ Sign Up animation
Email & password registration and login
Google sign-in (popup)
Forgot password (reset email)
User profile document saved to Firestore on first sign-up
Friendly, localized error messages
Phone (SMS) authentication helpers included in auth.js (not yet wired to the UI)
🛠️ Built With
HTML5, CSS3, JavaScript (ES modules)
Firebase Authentication
Cloud Firestore
Font Awesome icons and Montserrat font (via CDN)
📂 Project Structure
modern-login-page/
├── index.html   # Markup for the sign-in and sign-up forms
├── style.css    # Layout, animation and responsive styling
├── main.js      # Connects the UI to the auth functions
├── auth.js      # Auth + Firestore functions (email, Google, phone, logout)
├── apps.js      # Firebase initialization and config
└── README.md
🚀 Getting Started
1. Clone the repository
bash
git clone https://github.com/Mujeebuddin06/Firebase-authentication-Registration-form/
cd modern-login-page
2. Set up Firebase
Create a project in the Firebase Console.
Add a Web app and copy its config.
Paste the config into firebaseConfig in apps.js.
Under Build → Authentication → Sign-in method, enable:
Email/Password
Google
Phone (optional)
Under Authentication → Settings → Authorized domains, make sure your domain (e.g. localhost) is listed.
Create a Firestore Database.
3. Run locally

Because the project uses ES modules, open it through a local server rather than double-clicking index.html:

bash
# Option 1: Python
python -m http.server 5500

# Option 2: VS Code
# Install the "Live Server" extension and click "Go Live"

Then visit http://localhost:5500.

🔒 Firestore Security Rules

User documents are stored at users/{uid}. Use rules so each user can only access their own document:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}

Firebase web config values are not secrets, but your security rules are what protect your data. Never leave Firestore in open test mode in production.

🧩 How It Works
File	Responsibility
apps.js	Initializes Firebase once and exports app, auth, db, analytics
auth.js	signUpEmail, loginEmail, loginGoogle, resetPassword, logout, watchAuth, removeAccount, phone helpers
main.js	Handles form submits, button clicks, messages and the panel toggle

After a successful login you can redirect users by setting REDIRECT_AFTER_LOGIN in main.js, for example:

js
const REDIRECT_AFTER_LOGIN = "dashboard.html";
🎨 Customization
Colors, fonts and animation timing: style.css
Error message text: friendlyError() in main.js
Fields stored in Firestore: saveUser() in auth.js
📌 Notes
The Facebook, GitHub and LinkedIn icons are placeholders; only Google sign-in is connected.
Phone authentication needs a <div id="recaptcha-container"></div> and a UI for entering the phone number and SMS code.
🤝 Contributing

Contributions are welcome! Fork the repository and open a pull request.

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Created by Your Name
