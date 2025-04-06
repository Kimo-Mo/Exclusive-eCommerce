import config from "./config.js";
// form inputs
const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

// error messages
const emailError = document.getElementById("errEmail");
const passwordError = document.getElementById("errPass");

// form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  if (isFormValid()) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = {
      email: email.value,
      password: password.value,
    };
    const targetUser = users.find((u) => u.email === user.email);
    if (targetUser) {
      if (targetUser.password === user.password) {
        sessionStorage.setItem("currentUser", JSON.stringify(targetUser));
        sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
        window.location.href = `${config.basePath}/index.html`;
      } else {
        setErrorMsg(password, passwordError, `password is incorrect`);
      }
    } else {
      setErrorMsg(email, emailError, `user not registered`);
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
