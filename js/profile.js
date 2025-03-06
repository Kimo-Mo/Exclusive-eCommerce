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

// 

// fill inputs with current user data
window.addEventListener("load", () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (currentUser) {
    fillFormWithUserData(currentUser);
  }
});
// form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  if (isFormValid()) {
    const users = JSON.parse(localStorage.getItem("users"));
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const updatedUser = {
      ...currentUser,
      name: name.value,
      email: email.value,
      password:
        password.value.trim() !== "" ? newPassword.value : currentUser?.password,
      address: address.value,
    };
    const index = users.findIndex((u) => u.email === currentUser?.email);
    users[index] = updatedUser;
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
    fillFormWithUserData(updatedUser);
    resetPasswordFields();
    showToast("Profile updated successfully");
  }
});
function fillFormWithUserData(user) {
  name.value = user.name;
  email.value = user.email;
  user.address && (
    address.value = user.address
  );
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
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  return !users.find((u) => u.email === email) || currentUser?.email === email;
}
function checkPassword(password) {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  return currentUser?.password === password;
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
