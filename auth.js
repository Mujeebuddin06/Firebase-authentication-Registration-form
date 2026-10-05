// auth.js — Authentication functions (Email/Password, Google, Phone)
import { auth, db } from "./apps.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// ---------- Firestore: user document ----------
async function saveUser(user, extra = {}) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email || null,
      phone: user.phoneNumber || null,
      name: user.displayName || null,
      createdAt: serverTimestamp(),
      ...extra,
    });
  }
}

// ---------- Email / Password ----------
export async function signUpEmail(email, password, extra = {}) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await saveUser(cred.user, extra);
  return cred.user;
}

export async function loginEmail(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// ---------- Google ----------
export async function loginGoogle() {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  await saveUser(cred.user);
  return cred.user;
}

// ---------- Phone ----------
let confirmationResult = null;

// containerId = HTML element ka id, e.g. <div id="recaptcha-container"></div>
export function setupRecaptcha(containerId = "recaptcha-container") {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
    });
  }
  return window.recaptchaVerifier;
}

// phoneNumber format: "+923001234567"
export async function sendPhoneCode(phoneNumber, containerId) {
  const verifier = setupRecaptcha(containerId);
  confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
}

export async function verifyPhoneCode(code) {
  if (!confirmationResult) throw new Error("Pehle sendPhoneCode() call karein.");
  const cred = await confirmationResult.confirm(code);
  await saveUser(cred.user);
  return cred.user;
}

// ---------- Session ----------
export function logout() {
  return signOut(auth);
}

export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function removeAccount() {
  const user = auth.currentUser;
  if (!user) return;
  await deleteDoc(doc(db, "users", user.uid));
  await deleteUser(user); // recent login zaroori ho sakta hai
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
