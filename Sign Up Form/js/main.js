function checkPassword () {
    var pass1 = document.getElementById("pass");
    var pass2 = document.getElementById("pass-repeat");
    console.log(pass1.value)
    if (pass1.value != pass2.value) {
        document.getElementById("missing").innerHTML = "<li>Las contraseñas ingresadas no son iguales.</li>";
        return false;
    }
}   