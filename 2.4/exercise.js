function validateUsername(value) {
  if (value === "") {
    return "اكتب اسم المستخدم";
  }
  if (value.length < 3) {
    return "اسم المستخدم لازم يكون 3 حروف أو أكثر";
  }
  return "";
}

function setupForm() {
  const form = document.querySelector("#signup");
  const input = document.querySelector("#username");
  const errorBox = document.querySelector("#username-error");
  const result = document.querySelector("#signup-result");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = new FormData(form).get("username").trim();
    const error = validateUsername(username);

    if (error) {
      errorBox.textContent = error;
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }

    errorBox.textContent = "";
    input.removeAttribute("aria-invalid");
    result.textContent = `تم التسجيل باسم ${username}`;
  });
}
