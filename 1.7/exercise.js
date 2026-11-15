const user = {
  name: "سارة",
  followers: 120,
  skills: ["HTML", "CSS"],
};

function summary({ name, followers }) {
  return `${name}: ${followers} متابع`;
}

function withCity(person, city) {
  return { ...person, city };
}

function toJSONText(obj) {
  return JSON.stringify(obj);
}

function fromJSONText(text) {
  return JSON.parse(text);
}
