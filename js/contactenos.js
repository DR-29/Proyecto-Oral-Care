const form = document.getElementById('form');


$(document).ready(function () {
  $("#tabla").DataTable({
    
    responsive: "true",
    dom: "Bfrtilp",
    buttons: [
      {
        extend: "excelHtml5",
        text: `Excel`,
        titleAttr: "exportar a excel",
        className: "btn btn-outline-success",
      },
      {
        extend: "pdf",
        text: `PDF`,
        titleAttr: "exportar a PDF",
        className: "btn btn-outline-danger",
      },
      {
        extend: "print",
        text: `Imprimir`,
        titleAttr: "Imprimir",
        className: "btn btn-outline-info",
      },
    ],
  });
});

let botonenviar = document.getElementById("botonenviar");
let botoneditar = document.getElementById("botoneditar");

botoneditar.addEventListener("click", editando);

botoneditar.disabled = true;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  datos = new FormData(form);
  Nombre = datos.get('Nombre');
  Apellido = datos.get('Apellido');
  Correo = datos.get('Correo');
  Fecha = datos.get('Fecha');
  Solicitud = datos.get('Solicitud');
  Numero = datos.get('Numero');
  Direccion = datos.get('Direccion');
  Telefono = datos.get('Telefono');
  Comentarios = datos.get('comentarios');

  const agregar = {
    Nombre,
    Apellido,
    Correo,
    Fecha,
    Solicitud,
    Numero,
    Direccion,
    Telefono,
    Comentarios
  }


  if (localStorage.getItem('data') === null) {
    let data = [];
    data.push(agregar);
    localStorage.setItem('data', JSON.stringify(data));
  } else {
    let data = JSON.parse(localStorage.getItem('data'));
    data.push(agregar);


    localStorage.setItem('data', JSON.stringify(data));
  }


  form.reset();

  leerLocalStorage();
  location.reload();

  console.log(datos.get('Nombre'));


});

function editar(id) {
  console.log(id);
  botoneditar.disabled = false;

  botonenviar.disabled = true;
  let data = JSON.parse(localStorage.getItem("data"));
  for (let i = 0; i < data.length; i++) {
    if (i == id) {
      document.getElementById("Nombre").value = data[i].Nombre;
      document.getElementById("Apellido").value = data[i].Apellido;
      document.getElementById("Correo").value = data[i].Correo;
      document.getElementById("Fecha").value = data[i].Fecha;
      document.getElementById("Solicitud").value = data[i].Solicitud;
      document.getElementById("Numero").value = data[i].Numero;
      document.getElementById("Direccion").value = data[i].Direccion;
      document.getElementById("Telefono").value = data[i].Telefono;
      document.getElementById("comentarios").value = data[i].Comentarios;
      localStorage.setItem("editando", i);

    }
  }
}

function editando() {
  let idedit = localStorage.getItem("editando");

  let data = JSON.parse(localStorage.getItem("data"));
  for (let i = 0; i < data.length; i++) {
    if (i == idedit) {
      let Nombre = document.getElementById("Nombre").value;
      let Apellido = document.getElementById("Apellido").value;
      let Correo = document.getElementById("Correo").value;
      let Fecha = document.getElementById("Fecha").value;
      let Solicitud = document.getElementById("Solicitud").value;
      let Numero = document.getElementById("Numero").value;
      let Direccion = document.getElementById("Direccion").value;
      let Telefono = document.getElementById("Telefono").value;
      let Comentarios = document.getElementById("comentarios").value;

      data[i].Nombre = Nombre;
      data[i].Apellido = Apellido;
      data[i].Correo = Correo;
      data[i].Fecha = Fecha;
      data[i].Solicitud = Solicitud;
      data[i].Numero = Numero;
      data[i].Direccion = Direccion;
      data[i].Telefono = Telefono;
      data[i].Comentarios = Comentarios;
    }
  }
  localStorage.setItem("data", JSON.stringify(data));
  document.getElementById("contactenos").reset();
  botoneditar.disabled = true;
  botonenviar.disabled = false;
  loadFromLocalStorage();
  location.reload();
}


function borrar(id) {
  console.log(id);
  let data = JSON.parse(localStorage.getItem("data"));
  for (let i = 0; i < data.length; i++) {
    if (i == id) {

      data.splice(i, 1);
    }
  }


  localStorage.setItem("data", JSON.stringify(data));
  if(data.length == 0){
    localStorage.removeItem('data')
  }
  leerLocalStorage();
  location.reload();
}

function leerLocalStorage() {
  let data = [],
    dataInLocalStorage = localStorage.getItem("data"),
    taskthead = document.querySelector('#tabla thead'),
    taskbody = document.querySelector("#tabla tbody");


  if (dataInLocalStorage == null) {
    taskthead.innerHTML = "";
    console.log('hola')
  } else {
    data = JSON.parse(dataInLocalStorage);
    // Draw TR from TBODY
    taskbody.innerHTML = "";

    data.forEach(function (x, i) {

      let tr = document.createElement("tr"),
        tdId = document.createElement("td"),
        tdNombre = document.createElement("td"),
        tdApellido = document.createElement("td"),
        tdCorreo = document.createElement("td"),
        tdFecha = document.createElement("td"),
        tdSolicitud = document.createElement("td"),
        tdNumero = document.createElement("td"),
        tdDireccion = document.createElement("td"),
        tdTelefono = document.createElement("td"),
        tdComentarios = document.createElement("td"),
        buttons = document.createElement("td"),
        btnEditar = document.createElement("button"),
        btnBorrar = document.createElement("button");


      tdId.innerHTML = i + 1;
      tdNombre.innerHTML = x.Nombre;
      tdApellido.innerHTML = x.Apellido;
      tdCorreo.innerHTML = x.Correo;
      tdFecha.innerHTML = x.Fecha;
      tdSolicitud.innerHTML = x.Solicitud;
      tdNumero.innerHTML = x.Numero;
      tdDireccion.innerHTML = x.Direccion;
      tdTelefono.innerHTML = x.Telefono;
      tdComentarios.innerHTML = x.Comentarios;


      btnEditar.innerHTML = "Editar";
      btnEditar.className = "btn btn-outline-info";
      btnEditar.role = "button";
      btnEditar.id = "btnEditar";

      btnEditar.addEventListener("click", () => {
        editar(i);
      });

      btnBorrar.innerHTML = "Borrar";
      btnBorrar.className = "btn btn-outline-danger";
      btnBorrar.role = "button";
      btnBorrar.id = "btnBorrar";

      btnBorrar.addEventListener("click", () => {
        borrar(i);
      });



      buttons.appendChild(btnEditar);
      buttons.appendChild(btnBorrar);


      tr.appendChild(tdId);
      tr.appendChild(tdNombre)
      tr.appendChild(tdApellido);
      tr.appendChild(tdCorreo);
      tr.appendChild(tdFecha);
      tr.appendChild(tdSolicitud);
      tr.appendChild(tdNumero);
      tr.appendChild(tdDireccion);
      tr.appendChild(tdTelefono);
      tr.appendChild(tdComentarios);
      tr.appendChild(buttons);


      taskbody.appendChild(tr);

    });
  }

}

leerLocalStorage();