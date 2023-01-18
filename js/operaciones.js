let sesion = localStorage.getItem('sesion');
sesion = JSON.parse(sesion);
console.log(sesion);

if (sesion !== null) {


    let barra = document.getElementById('barra')
    barra.innerHTML = `<div class="d-flex" id="barra">
                      <span class="fs-5 text-light fw-bold prueba">${sesion.nombre} ${sesion.apellido}</span>
                      <button class="nav-link active btn btn-outline-danger cerrar" type="button" id="cerrar">Cerrar sesion</button>
                     
                    </div> `
    let links = document.getElementById('links')
    links.innerHTML += `<li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="../html/operaciones.html"><span class="fs-5 text-light fw-bold  ">Operaciones</span></a>
                    </li>`
} else {
    console.log('no hay sesion');
    location.href = '../html/login.html';
}

if (document.getElementById('cerrar')) {
    document.getElementById('cerrar').addEventListener('click', () => {
        localStorage.removeItem('sesion');
        location.href = '../index.html';
    })
}

