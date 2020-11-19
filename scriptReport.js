const count = sessionStorage.getItem("count");

for (let i = 0; i < count; i++) {
    document.getElementById("display").innerHTML += sessionStorage.getItem(`patient${i}`);
}