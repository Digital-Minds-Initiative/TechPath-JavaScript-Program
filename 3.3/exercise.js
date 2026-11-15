async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}

async function showUser(username) {
  const status = document.querySelector("#status");
  const nameBox = document.querySelector("#name");

  status.textContent = "جاري التحميل...";
  nameBox.textContent = "";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (response.status === 404) {
      status.textContent = "ما لقينا حساب بهذا الاسم";
      return;
    }
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const user = await response.json();
    nameBox.textContent = user.name ?? user.login;
    status.textContent = "";
  } catch (error) {
    status.textContent = "تعذّر الاتصال، تأكد من الإنترنت وجرّب مرة ثانية";
  }
}
