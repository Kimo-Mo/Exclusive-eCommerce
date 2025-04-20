import app from "./firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// form inputs
const form = document.getElementById("form");
const submitButton = document.getElementById("submitBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");

// error messages
const emailError = document.getElementById("errEmail");
const passwordError = document.getElementById("errPass");

// form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  validateInputs();
  if (isFormValid()) {
    try {
      submitButton.style.cursor = "no-drop";
      submitButton.disabled = true;
      submitButton.textContent = "Signing in...";

      const auth = getAuth(app);
      const credentials = await signInWithEmailAndPassword(
        auth,
        email.value.trim(),
        password.value.trim()
      );
      if (!credentials) {
        throw new Error("No credentials returned");
      }
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
  return !emailError.innerText && !passwordError.innerText;
}
function validateInputs() {
  validateField(email, emailError, "email");
  validateField(password, passwordError, "password");
}
function validateField(input, error, fieldName) {
  const value = input.value.trim();
  if (value === "") {
    setErrorMsg(input, error, `${fieldName} cannot be empty`);
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
function handleFirebaseError(error, emailError, passwordError) {
  removeErrorMsg(email, emailError);
  removeErrorMsg(password, passwordError);
  switch (error.code) {
    case "auth/user-not-found":
    case "auth/invalid-credential":
      setErrorMsg(email, emailError, "No account found with this email");
      break;
    case "auth/wrong-password":
      setErrorMsg(password, passwordError, "Incorrect password");
      break;
    case "auth/invalid-email":
      setErrorMsg(email, emailError, "Invalid email format");
      break;
    case "auth/too-many-requests":
      setErrorMsg(
        email,
        emailError,
        "Too many attempts. Please try again later"
      );
      break;
    default:
      console.error("Error signing in:", error.message);
      setErrorMsg(email, emailError, "An error occurred. Please try again");
  }
}
