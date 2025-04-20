import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "./firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

// form inputs
const form = document.getElementById("form");
const submitButton = document.getElementById("submitBtn");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");

// error messages
const nameError = document.getElementById("errName");
const emailError = document.getElementById("errEmail");
const passwordError = document.getElementById("errPass");

// form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const currentUser = {
    name: name.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
  };
  validateInputs();
  if (isFormValid()) {
    try {
      submitButton.style.cursor = "no-drop";
      submitButton.disabled = true;
      submitButton.textContent = "Signing in...";
      const auth = getAuth(app);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        currentUser.email,
        currentUser.password
      );
      if (!credentials) {
        throw new Error("No credentials returned");
      }
      await updateProfile(credentials.user, {
        displayName: currentUser.name,
      });
      await setDoc(doc(db, "users", credentials.user.uid), {
        displayName: currentUser.name,
        email: currentUser.email,
        address: "",
      });
      sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
      window.location.href = `/index.html`;
    } catch (error) {
      handleFirebaseError(error, emailError, passwordError);
    } finally {
      submitButton.style.cursor = "pointer";
      submitButton.disabled = false;
      submitButton.textContent = "Sign In";
    }
  }
});

function isFormValid() {
  return (
    !nameError.innerText && !emailError.innerText && !passwordError.innerText
  );
}

// validate inputs
function validateInputs() {
  validateField(name, nameError, "name", 3, 20);
  validateField(email, emailError, "email", 0, Infinity, checkEmail);
  validateField(password, passwordError, "password", 6);
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
    setErrorMsg(input, error, `${fieldName} cannot be empty`);
  } else if (value.length < minLength) {
    setErrorMsg(
      input,
      error,
      `${fieldName} must be at least ${minLength} characters`
    );
  } else if (value.length > maxLength) {
    setErrorMsg(
      input,
      error,
      `${fieldName} must be at most ${maxLength} characters`
    );
  } else if (customValidation && !customValidation(value)) {
    setErrorMsg(input, error, `${fieldName} is not valid`);
  } else {
    removeErrorMsg(input, error);
  }
}

// set error message
function setErrorMsg(input, error, message) {
  error.innerText = message;
  error.style.marginTop = "8px";
  input.style.borderColor = "red";
}
// remove error message
function removeErrorMsg(input, error) {
  error.innerText = "";
  error.style.marginTop = "0";
  input.style.borderColor = "#d9d9d9";
}
// check email
function checkEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
function handleFirebaseError(error, emailError, passwordError) {
  removeErrorMsg(email, emailError);
  removeErrorMsg(password, passwordError);
  switch (error.code) {
    case "auth/email-already-in-use":
      setErrorMsg(email, emailError, "Email is already in use");
      break;
    case "auth/invalid-email":
      setErrorMsg(email, emailError, "Invalid email format");
      break;
    case "auth/weak-password":
      setErrorMsg(password, passwordError, "Password is too weak");
      break;
    default:
      console.error("Error creating user:", error.message);
  }
}
