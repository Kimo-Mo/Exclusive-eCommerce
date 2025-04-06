import config from "./config.js";
// form inputs
const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");

// error messages
const nameError = document.getElementById("errName");
const emailError = document.getElementById("errEmail");
const passwordError = document.getElementById("errPass");

// form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  validateInputs();
  if (users.find((u) => u.email === currentUser.email)) {
    setErrorMsg(email, emailError, "Email already exists");
  }
  if (isFormValid()) {
    users.push(currentUser);
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
    window.location.href = `${config.basePath}/index.html`;
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
