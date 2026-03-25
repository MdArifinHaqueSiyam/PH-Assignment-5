document.getElementById("loginBtn").addEventListener("click", function () {
  const userField = document.getElementById("userInput");
  const userName = userField.value.toLowerCase();
  const passField = document.getElementById("passInput");
  const passWord = passField.value.toLowerCase();

  if (userName === "admin" && passWord === "admin123") {
    alert("Login successFull");
    window.location.assign("./dashboard.html");
  } else {
    alert("Login Failed");
    return;
  }
});