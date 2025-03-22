let layar = document.getElementById("layar");
let inputBaru = true;

function tambahAngka(angka) {
    if (inputBaru) {
        layar.value = angka;
        inputBaru = false;
    } else {
        layar.value += angka;
    }
}

function tambahOperator(operator) {
    if (operator === '^') {
        layar.value += ' ^ ';
    } else {
        layar.value += ' ' + operator + ' ';
    }
    inputBaru = false;
}

function hitungAkar() {
    let nilai = parseFloat(layar.value);
    if (!isNaN(nilai)) {
        layar.value = Math.sqrt(nilai);
        inputBaru = true;
    }
}

function hitungHasil() {
    let ekspresi = layar.value.replace(/\^/g, '**');
    try {
        layar.value = eval(ekspresi);
    } catch (e) {
        layar.value = "Error";
    }
    inputBaru = true;
}

function hapusLayar() {
    layar.value = "";
    inputBaru = true;
}

document.addEventListener("keydown", function (event) {
    if (!isNaN(event.key)) {
        tambahAngka(event.key);
    } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        tambahOperator(event.key);
    } else if (event.key === "Enter") {
        hitungHasil();
    } else if (event.key === "Backspace") {
        layar.value = layar.value.slice(0, -1);
    }
});