const myName = "مازن";
console.log(myName);

const button = document.querySelector("#greet");
const message = document.querySelector("#message");

button.addEventListener("click", () => {
  message.textContent = `هلا ${myName}!`;
});
