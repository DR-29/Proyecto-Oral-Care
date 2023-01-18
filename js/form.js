
   function guardarDato() {
    var Nombres = document.getElementById("Nombres").value;
    var email = document.getElementById("email").value;
    localStorage.setItem(Nombres, email );
    document.getElementById("Nombres").value = "";
    document.getElementById("email").value = "";
    actualizarDatos();
}

function recuperarDato() {
    var Nombres = document.getElementById("Nombres").value;
    var email = document.getElementById("email").value;
    localStorage.getItem(Nombres, email);
    document.getElementById("Nombres").value = localStorage.getItem(Nombres, email);
}

function eliminarDato() {
    var Nombres = document.getElementById("Nombres").value;
    var email = document.getElementById("email").value;
    localStorage.removeItem(Nombres);
    localStorage.removeItem(email);
    actualizarDatos();
}

function eliminarTodo() {
    localStorage.clear();
    actualizarDatos();
}

function actualizarDatos() {
    var pares = "";
    if (localStorage.length === 0) {
        pares += '<li class="list-group-item list-group-item-dark">Vacío</li>';
    } else {
        for (var i = 0; i <= localStorage.length - 1; i++) {
            var key = localStorage.key(i);
            pares += '<li class="list-group-item list-group-item-dark"><span class="badge badge-info">' + localStorage.getItem(key) + '</span>' + key + '</li>';
        }
    }
    document.getElementById('contactos').innerHTML = pares;
}