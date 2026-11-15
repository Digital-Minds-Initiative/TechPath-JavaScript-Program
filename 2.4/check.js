const results = [];

function check(label, run, expected) {
  let actual;
  try {
    actual = run();
  } catch (error) {
    actual = `${error.name}: ${error.message}`;
  }
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  results.push(ok);
  console.log(`${ok ? "✓" : "✗"} ${label}`);
  if (!ok) {
    console.log("   المتوقع:", expected);
    console.log("   الناتج:", actual);
  }
}

function report() {
  const passed = results.filter(Boolean).length;
  const box = document.querySelector("#result");
  box.textContent = `${passed} / ${results.length}`;
  box.className = passed === results.length ? "pass" : "fail";
}

const form = document.querySelector("#signup");
const input = document.querySelector("#username");
const submitWith = (value) => {
  input.value = value;
  const submit = new SubmitEvent("submit", { bubbles: true, cancelable: true });
  form.dispatchEvent(submit);
  return submit.defaultPrevented;
};

check("validateUsername: فاضي", () => validateUsername(""), "اكتب اسم المستخدم");
check("validateUsername: قصير", () => validateUsername("مز"), "اسم المستخدم لازم يكون 3 حروف أو أكثر");
check("validateUsername: سليم", () => validateUsername("مازن"), "");

check("setupForm تمنع إعادة التحميل", () => {
  setupForm();
  return submitWith("مازن");
}, true);

check("setupForm: مسافات بس تعتبر فاضي", () => {
  submitWith("   ");
  return [document.querySelector("#username-error").textContent, input.getAttribute("aria-invalid")];
}, ["اكتب اسم المستخدم", "true"]);

check("setupForm: اسم سليم", () => {
  submitWith("سارة");
  return [
    document.querySelector("#username-error").textContent,
    input.getAttribute("aria-invalid"),
    document.querySelector("#signup-result").textContent,
  ];
}, ["", null, "تم التسجيل باسم سارة"]);

input.value = "";
report();
