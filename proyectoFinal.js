//* LOGIN

let usuariosRegistrados = [];
let usuariosRegistradosJSON = localStorage.getItem("usuariosArreglados");
if (usuariosRegistradosJSON) {
    usuariosRegistrados = JSON.parse(usuariosRegistradosJSON);
}

function guardarDatos() {
    let emailUsuario = document.getElementById("emailUsuario");
    let passUsuario = document.getElementById("passUsuario");

    let usuario = {
        email: emailUsuario.value,
        password: passUsuario.value
    };
    console.log(usuario);

    usuariosRegistrados.push(usuario);
    let usuariosRegistradosJSON = JSON.stringify(usuariosRegistrados);
    localStorage.setItem("usuariosArreglados", usuariosRegistradosJSON);
}

let btnRegistro = document.getElementById("btnRegistro");
btnRegistro.addEventListener("click", guardarDatos);

function validarDatos() {
    let emailUsuario = document.getElementById("emailUsuario").value;
    let passUsuario = document.getElementById("passUsuario").value;

    let validarDatos = [];
    let validarDatosJSON = localStorage.getItem("usuariosArreglados");
    if (validarDatosJSON) {
        validarDatos = JSON.parse(validarDatosJSON);
    }

    let usuarioEncontrado = validarDatos.find(usuario => 
        emailUsuario === usuario.email && passUsuario === usuario.password
    );

    if (usuarioEncontrado) {
        console.log("Usuario encontrado:", usuarioEncontrado);
        window.location.href = "../proyectoFinal/pages/productos.html";
    } else {
        console.log("Usuario no encontrado!");
        document.body.innerHTML = `<h1>Usuario no encontrado!</h1>`;
    }
}

let btnIngreso = document.getElementById("btnIngresar");
btnIngreso.addEventListener("click", validarDatos);
