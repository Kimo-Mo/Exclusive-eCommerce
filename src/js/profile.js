import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { showToast } from "./main.js";
import app from "./firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";

// form inputs
const name = document.getElementById("name");
const email = document.getElementById("email");
const address = document.getElementById("address");
const password = document.getElementById("password");
const newPassword = document.getElementById("newPassword");
const ConfirmNewPassword = document.getElementById("ConfirmNewPassword");
const form = document.getElementById("form");
const updateBtn = document.getElementById("updateBtn");
// error messages
const nameError = document.getElementById("errName");
const EmailError = document.getElementById("errEmail");
const passError = document.getElementById("errPass");
const newPassError = document.getElementById("errNewPass");
const ConfirmNewPassError = document.getElementById("errConfirmNewPass");

const auth = getAuth(app);

// fill inputs with current user data
window.addEventListener("load", () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();
      // User is signed in
      const currentUser = {
        displayName: user.displayName,
        email: user.email,
        address: userData?.address || "",
      };
      fillFormWithUserData(currentUser);
    } else {
      // No user is signed in, redirect to login
      window.location.href = `/pages/login.html`;
    }
  });
});

// form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  validateInputs();

  if (isFormValid()) {
    try {
      updateBtn.style.cursor = "no-drop";
      updateBtn.disabled = true;
      updateBtn.textContent = "Saving Changes...";

      const user = auth.currentUser;

      if (!user) {
        throw new Error("No authenticated user found");
      }

      // Update display name
      if (name.value.trim() !== user.displayName) {
        await updateProfile(user, {
          displayName: name.value.trim(),
        });
      }

      // Update email if changed
      if (email.value.trim() !== user.email) {
        await updateEmail(user, email.value.trim());
      }

      // check if address is changed
      if (address.value.trim() !== user.address) {
        await setDoc(doc(db, "users", user.uid), {
          displayName: name.value.trim(),
          email: email.value.trim(),
          address: address.value.trim(),
        });
      }

      // Update password if provided
      if (password.value.trim()) {
        try {
          // Re-authenticate user before password change
          const credential = EmailAuthProvider.credential(
            user.email,
            password.value.trim()
          );
          await reauthenticateWithCredential(user, credential)
            .then(async () => {
              await updatePassword(user, newPassword.value.trim());
              // Reset password fields and show success message
              resetPasswordFields();
              showToast("Profile updated successfully");
            })
            .catch((error) => {
              throw error;
            });
        } catch (error) {
          handleUpdateError(error);
          return;
        }
      }
    } catch (error) {
      handleUpdateError(error);
    } finally {
      updateBtn.style.cursor = "pointer";
      updateBtn.disabled = false;
      updateBtn.textContent = "Save Changes";
      showToast("Profile updated successfully");
    }
  }
});

function fillFormWithUserData(user) {
  name.value = user.displayName;
  email.value = user.email;
  user.address && (address.value = user.address);
}

function resetPasswordFields() {
  password.value = "";
  newPassword.value = "";
  ConfirmNewPassword.value = "";
}

function isFormValid() {
  return (
    !nameError.innerText &&
    !EmailError.innerText &&
    !passError.innerText &&
    !newPassError.innerText &&
    !ConfirmNewPassError.innerText
  );
}

function validateInputs() {
  validateField(name, nameError, "name", 3, 20);
  validateField(email, EmailError, "email", 0, Infinity, checkEmail);
  // check if user want to change password
  if (password.value.trim() !== "") {
    validateField(password, passError, "password", 6, Infinity, checkPassword);
    validateField(newPassword, newPassError, "new password", 6);
    validateField(
      ConfirmNewPassword,
      ConfirmNewPassError,
      "confirm new password",
      6,
      Infinity,
      checkPasswordMatch
    );
  }
}

function validateField(
  input,
  error,
  fieldName,
  minLength = 0,
  maxLength = Infinity,
  customValidation = null
) {
  const value = input.value.trim();
  if (value === "") {
    setErrorMsg(error, `${fieldName} cannot be empty`);
  } else if (value.length < minLength) {
    setErrorMsg(error, `${fieldName} must be at least ${minLength} characters`);
  } else if (value.length > maxLength) {
    setErrorMsg(error, `${fieldName} must be at most ${maxLength} characters`);
  } else if (customValidation && !customValidation(value)) {
    setErrorMsg(error, `Invalid or Incorrect ${fieldName}`);
  } else {
    removeErrorMsg(error);
  }
}

function checkEmail(email) {
  // Only validate email format, Firebase handles uniqueness
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function checkPassword(password) {
  // Password verification is handled by Firebase re-authentication
  return password.length >= 6;
}

function checkPasswordMatch(ConfirmNewPassword) {
  return newPassword.value === ConfirmNewPassword;
}

function setErrorMsg(error, message) {
  error.style.marginTop = "8px";
  error.innerText = message;
}

function removeErrorMsg(error) {
  error.style.marginTop = "0";
  error.innerText = "";
}

function handleUpdateError(error) {
  switch (error.code) {
    case "auth/requires-recent-login":
      setErrorMsg(passError, "Please re-enter your password to make changes");
      break;
    case "auth/email-already-in-use":
      setErrorMsg(EmailError, "Email is already in use");
      break;
    case "auth/invalid-credential":
      setErrorMsg(passError, "Current password is incorrect");
      break;
    case "auth/weak-password":
      setErrorMsg(newPassError, "New password is too weak");
      break;
    default:
      console.error("Profile update error:", error);
      showToast("Failed to update profile");
  }
}
