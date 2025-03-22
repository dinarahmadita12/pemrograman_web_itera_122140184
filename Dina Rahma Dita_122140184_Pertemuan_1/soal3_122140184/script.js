document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // Ambil nilai input
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let isValid = true;

    // Validasi Nama
    if (name.length <= 3) {
        document.getElementById("nameError").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("nameError").classList.add("hidden");
    }

    // Validasi Email (Cek apakah ada "@" dan ".")
    if (!email.includes("@") || !email.includes(".")) {
        document.getElementById("emailError").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("emailError").classList.add("hidden");
    }

    // Validasi Password
    if (password.length < 8) {
        document.getElementById("passwordError").classList.remove("hidden");
        isValid = false;
    } else {
        document.getElementById("passwordError").classList.add("hidden");
    }

    // Jika semua valid, tampilkan alert
    if (isValid) {
        alert("Pendaftaran berhasil!");
    }
});