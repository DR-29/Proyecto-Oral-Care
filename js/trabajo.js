const form = document.querySelector('#form');


let botonenviar = document.getElementById("enviar");
let botoneditar = document.getElementById("editar");
botoneditar.disabled = true;

botoneditar.addEventListener("click", () => edit());
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = new FormData(form);
    const Nombre = datos.get('Nombre');
    const Apellido = datos.get('Apellido');
    const Correo = datos.get('Correo');
    const Direccion = datos.get('Direccion');
    const Sexo = datos.get('Sexo');
    const estudios = datos.get('estudios');
    const puesto = datos.get('puesto');
    const comentario = datos.get('comentario');

    let agregar = {
        Nombre,
        Apellido,
        Correo,
        Direccion,
        Sexo,
        estudios,
        puesto,
        comentario
    }

    if (localStorage.getItem('trabajos') === null) {
        let trabajos = [];
        trabajos.push(agregar);
        localStorage.setItem('trabajos', JSON.stringify(trabajos));
      } else {
        let trabajos = JSON.parse(localStorage.getItem('trabajos'));
        trabajos.push(agregar);
    
    
        localStorage.setItem('trabajos', JSON.stringify(trabajos));
      }
    
      leerLocalStorage();

    
      form.reset();

      location.reload();
    console.log(datos.get('Nombre'));

});

function borrar(index) {
    let trabajos = JSON.parse(localStorage.getItem('trabajos'));
    trabajos.splice(index, 1);
    localStorage.setItem('trabajos', JSON.stringify(trabajos));
    leerLocalStorage();
    location.reload();
}

function editar(id) {
    console.log(id);
    botoneditar.disabled = false;
  
    botonenviar.disabled = true;
    let trabajos = JSON.parse(localStorage.getItem("trabajos"));
    for (let i = 0; i < trabajos.length; i++) {
      if (i == id) {

        document.getElementById("Nombre").value = trabajos[i].Nombre;
        document.getElementById("Apellido").value = trabajos[i].Apellido;
        document.getElementById("Correo").value = trabajos[i].Correo;
        document.getElementById("Direccion").value = trabajos[i].Direccion;
        document.getElementById("Sexo").value = trabajos[i].Sexo;
        document.getElementById("estudios").value = trabajos[i].estudios;
        document.getElementById("puesto").value = trabajos[i].puesto;
        document.getElementById("comentario").value = trabajos[i].comentario;

        
        localStorage.setItem("edit", i);
  
      }
    }
  }
  
  function edit() {
    let idedit = localStorage.getItem("edit");
  
    let trabajos = JSON.parse(localStorage.getItem("trabajos"));
    for (let i = 0; i < trabajos.length; i++) {
      if (i == idedit) {

        let Nombre = document.getElementById("Nombre").value;
        let Apellido = document.getElementById("Apellido").value;
        let Correo = document.getElementById("Correo").value;
        let Direccion = document.getElementById("Direccion").value;
        let Sexo = document.getElementById("Sexo").value;
        let estudios = document.getElementById("estudios").value;
        let puesto = document.getElementById("puesto").value;
        let comentario = document.getElementById("comentario").value;

        trabajos[i].Nombre = Nombre;
        trabajos[i].Apellido = Apellido;
        trabajos[i].Correo = Correo;
        trabajos[i].Direccion = Direccion;
        trabajos[i].Sexo = Sexo;
        trabajos[i].estudios = estudios;
        trabajos[i].puesto = puesto;
        trabajos[i].comentario = comentario;

      }
    }
    localStorage.setItem("trabajos", JSON.stringify(trabajos));
    form.reset();
    botoneditar.disabled = true;
    botonenviar.disabled = false;
    
    leerLocalStorage();
    location.reload();
  }

function leerLocalStorage() {
    let trabajos = [],
      datosInLocalStorage = localStorage.getItem("trabajos"),
      taskthead = document.querySelector('#tabla thead'),
      taskbody = document.querySelector("#tabla tbody");
  
  
    if (datosInLocalStorage == null) {
      taskthead.innerHTML = "";
      console.log('hola')
    } else {
      trabajos = JSON.parse(datosInLocalStorage);
      // Draw TR from TBODY
      taskbody.innerHTML = "";
  
      trabajos.forEach(function (x, i) {
  
        let tr = document.createElement("tr"),
        tdId = document.createElement("td"),
        tdNombre = document.createElement("td"),
        tdApellido = document.createElement("td"),
        tdCorreo = document.createElement("td"),
        tdDireccion = document.createElement("td"),
        tdSexo = document.createElement("td"),
        tdEstudios = document.createElement("td"),
        tdPuesto = document.createElement("td"),
        tdComentario = document.createElement("td"),
        buttons = document.createElement("td"),
        btnEditar = document.createElement("button"),
        btnBorrar = document.createElement("button");

        tdId.innerHTML = i + 1;
        tdNombre.innerHTML = x.Nombre;
        tdApellido.innerHTML = x.Apellido;
        tdCorreo.innerHTML = x.Correo;
        tdDireccion.innerHTML = x.Direccion;
        tdSexo.innerHTML = x.Sexo;
        tdEstudios.innerHTML = x.estudios;
        tdPuesto.innerHTML = x.puesto;

        tdComentario.innerHTML = x.comentario;

  
  
        
  
  
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
        tr.appendChild(tdNombre);
        tr.appendChild(tdApellido);
        tr.appendChild(tdCorreo);
        tr.appendChild(tdDireccion);
        tr.appendChild(tdSexo);
        tr.appendChild(tdEstudios);
        tr.appendChild(tdPuesto);

        tr.appendChild(tdComentario);
        tr.appendChild(buttons);

        
  
  
        taskbody.appendChild(tr);
  
      });
    }
  
  }

  leerLocalStorage();