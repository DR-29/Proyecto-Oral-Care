console.log('hola')

const form = document.querySelector('#form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario = document.querySelector('#usuario').value;
    const contraseña = document.querySelector('#contraseña').value;

    let bandera = false, posicion = 0;

    console.log(usuario, contraseña);

    const peticion = await fetch('../json/usuarios.json')
    const datos = await peticion.json();

    datos.forEach( (item, index) => {

        if(usuario === item.Usuario && contraseña === item.Contraseña){
            bandera = true;
            posicion = index;
        }

    })

    if(bandera){
        
        let sesion = {
            usuario: datos[posicion].Usuario,
            nombre: datos[posicion].Nombre,
            apellido: datos[posicion].Apellido,
            correo: datos[posicion].Correo,
            Tipo_de_Usuario: datos[posicion].Tipo_de_Usuario
        }

        localStorage.setItem('sesion', JSON.stringify(sesion));
        alert(`Bienvenido ${datos[posicion].Nombre} ${datos[posicion].Apellido} 
Tipo de usuario: ${datos[posicion].Tipo_de_Usuario}      `)
        window.location.href = '../index.html';
    }else{
        alert('Usuario o contraseña incorrectos');
        form.reset();
    }

    console.log(datos);

});


const nada = () => {
    
}