// main.js — HTML (index.html) ko Firebase (auth.js) se jodta hai
import {signUpEmail,loginEmail,loginGoogle,resetPassword,watchAuth,} from "./auth.js";

// ---------- Toggle (Sign In <-> Sign Up animation) ----------
const container = document.getElementById("container");
document.getElementById("register").addEventListener("click", () => {
  container.classList.add("active");
});
document.getElementById("login").addEventListener("click", () => {
  container.classList.remove("active");
});

// ---------- Helpers ----------
function showMsg(id, text, ok = false) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.style.color = ok ? "green" : "red";
}

function friendlyError(err) {
  const map = {
    "auth/email-already-in-use": "Ye email pehle se registered hai.",
    "auth/invalid-email": "Email sahi nahi hai.",
    "auth/weak-password": "Password kam az kam 6 characters ka rakhein.",
    "auth/invalid-credential": "Email ya password ghalat hai.",
    "auth/user-not-found": "Is email ka koi account nahi mila.",
    "auth/wrong-password": "Password ghalat hai.",
    "auth/too-many-requests": "Bohat zyada koshishein. Thori der baad try karein.",
    "auth/popup-closed-by-user": "Google window band kar di gayi.",
    "auth/network-request-failed": "Internet connection check karein.",
  };
  return map[err.code] || err.message;
}

// Login ke baad yahan redirect karein (apna page likh dein)
const REDIRECT_AFTER_LOGIN = null; // e.g. "dashboard.html"

function onSuccess(msgId, user) {
  showMsg(msgId, `account successfully created  ${user.displayName || user.email || user.phoneNumber}!`, true);
  if (REDIRECT_AFTER_LOGIN) window.location.href = REDIRECT_AFTER_LOGIN;
}

// ---------- Sign Up ----------
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  try {
    const user = await signUpEmail(email, password, { name });
    onSuccess("signup-msg", user);
  } catch (err) {
    showMsg("signup-msg", friendlyError(err));
  }
});

// ---------- Sign In ----------
document.getElementById("signin-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signin-email").value.trim();
  const password = document.getElementById("signin-password").value;
  try {
    const user = await loginEmail(email, password);
    onSuccess("signin-msg", user);
  } catch (err) {
    showMsg("signin-msg", friendlyError(err));
  }
});

// ---------- Google (dono forms ke Google icons) ----------
document.querySelectorAll(".google-btn").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const msgId = btn.closest(".sign-up") ? "signup-msg" : "signin-msg";
    try {
      const user = await loginGoogle();
      onSuccess(msgId, user);
    } catch (err) {
      showMsg(msgId, friendlyError(err));
    }
  });
});

// ---------- Forgot Password ----------
document.getElementById("forgot-password").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signin-email").value.trim();
  if (!email) return showMsg("signin-msg", "Pehle upar email likhein.");
  try {
    await resetPassword(email);
    showMsg("signin-msg", "Password reset ka email bhej diya gaya hai.", true);
  } catch (err) {
    showMsg("signin-msg", friendlyError(err));
  }
});

// ---------- Login state ----------
watchAuth((user) => {
  console.log(user ? `Logged in: ${user.email || user.phoneNumber}` : "Logged out");
});
