const miForm = document.querySelector('#miForm') 
const btnsuma = document.querySelector('#btnsuma')
const btnresta = document.querySelector('#btnresta')
const btnmultiplicacion = document.querySelector('#btnmultiplicacion')
const btneditar = document.querySelector('#btneditar');

btneditar.addEventListener('click', (e) => {
    editatgasto(e)
});

btnsuma.addEventListener('click', (e) => {
    e.preventDefault();

    const txtprimervalor = document.querySelector('#txtprimervalor').value;
    const txtsegundovalor = document.querySelector('#txtsegundovalor').value;

    const resultado = parseFloat(txtprimervalor) + parseFloat(txtsegundovalor);

    let guardar = {
        txtprimervalor,
        txtsegundovalor,
        resultado,
        operacion : 'suma'
    }

    if(localStorage.getItem('gastos') === null){
        let gastos = [];
        gastos.push(guardar);
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }else{
        let gastos = JSON.parse(localStorage.getItem('gastos'));
        gastos.push(guardar);
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }

    leerDatos();

    miForm.reset();
})


btnresta.addEventListener('click', (e) => {
    e.preventDefault();

    const txtprimervalor = document.querySelector('#txtprimervalor').value;
    const txtsegundovalor = document.querySelector('#txtsegundovalor').value;

    const resultado = parseFloat(txtprimervalor) - parseFloat(txtsegundovalor);

    let guardar = {
        txtprimervalor,
        txtsegundovalor,
        resultado,
        operacion : 'resta'
    }

    if(localStorage.getItem('gastos') === null){
        let gastos = [];
        gastos.push(guardar);
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }else{
        let gastos = JSON.parse(localStorage.getItem('gastos'));
        gastos.push(guardar);
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }

    leerDatos();
    miForm.reset();
    
})

btnmultiplicacion.addEventListener('click', (e) => {
    e.preventDefault();

    const txtprimervalor = document.querySelector('#txtprimervalor').value;
    const txtsegundovalor = document.querySelector('#txtsegundovalor').value;

    const resultado = parseFloat(txtprimervalor) * parseFloat(txtsegundovalor);

    let guardar = {
        txtprimervalor,
        txtsegundovalor,
        resultado,
        operacion : 'multiplicacion'
    }

    if(localStorage.getItem('gastos') === null){
        let gastos = [];
        gastos.push(guardar);
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }else{
        let gastos = JSON.parse(localStorage.getItem('gastos'));
        gastos.push(guardar);
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }

    leerDatos();
    miForm.reset();
    
})


miForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const txtprimervalor = document.querySelector('#txtprimervalor').value;
    const txtsegundovalor = document.querySelector('#txtsegundovalor').value;




})

const eliminarGasto = (index) => {
    let gastos = JSON.parse(localStorage.getItem('gastos'));
    gastos.splice(index, 1);
    localStorage.setItem('gastos', JSON.stringify(gastos));
    leerDatos();
}

const editarGasto = (index) => {
    let gastos = JSON.parse(localStorage.getItem('gastos'));
    let gasto = gastos[index];  

    document.querySelector('#txtprimervalor').value = gasto.txtprimervalor;
    document.querySelector('#txtsegundovalor').value = gasto.txtsegundovalor;

    btnsuma.disabled = true;
    btnresta.disabled = true;
    btnmultiplicacion.disabled = true;

    if (gasto.operacion === 'suma'){
        
        localStorage.setItem('operacion', 'suma');
    } else if (gasto.operacion === 'resta'){
        
        localStorage.setItem('operacion', 'resta');
    } else {
        
        localStorage.setItem('operacion', 'multiplicacion');
    }

    localStorage.setItem('index', index);

}


const editatgasto = (e) => {
    e.preventDefault();
    let index = localStorage.getItem('index');
    let gastos = JSON.parse(localStorage.getItem('gastos'));
    let gasto = gastos[index];

    const txtprimervalor = document.querySelector('#txtprimervalor').value;
    const txtsegundovalor = document.querySelector('#txtsegundovalor').value;

    const operacion = localStorage.getItem('operacion');

    if(operacion === 'suma'){
        const resultado = parseFloat(txtprimervalor) + parseFloat(txtsegundovalor);
        gasto.txtprimervalor = txtprimervalor;
        gasto.txtsegundovalor = txtsegundovalor;
        gasto.resultado = resultado;
        
    } else if (operacion === 'resta'){
        const resultado = parseFloat(txtprimervalor) - parseFloat(txtsegundovalor);
        gasto.txtprimervalor = txtprimervalor;
        gasto.txtsegundovalor = txtsegundovalor;
        gasto.resultado = resultado;
        
    } else {
        const resultado = parseFloat(txtprimervalor) * parseFloat(txtsegundovalor);
        gasto.txtprimervalor = txtprimervalor;
        gasto.txtsegundovalor = txtsegundovalor;
        gasto.resultado = resultado;
        
    }

    gastos[index] = gasto;
    localStorage.setItem('gastos', JSON.stringify(gastos));
    leerDatos();
    miForm.reset();

    btnsuma.disabled = false;
    btnresta.disabled = false;
    btnmultiplicacion.disabled = false;
    
}

const leerDatos = () => {
    let gastos = [], 
        datosInLocalStorage = localStorage.getItem('gastos'),
        tablahead = document.querySelector('#mitabla thead'),
        tablabody = document.querySelector('#mitabla tbody');

        if(datosInLocalStorage === null){
            tablahead.innerHTML = '';
        } else {
            gastos = JSON.parse(datosInLocalStorage);
            
            tablabody.innerHTML = '';
            gastos.forEach((gasto, index) => {
                tablabody.innerHTML += `<tr>
                <th>${index}</th>
                <th>${gasto.txtprimervalor}</th>
                <th>${gasto.txtsegundovalor}</th>
                <th>${gasto.resultado}</th>
                <th>${gasto.operacion}</th>
                <th><button class="btn btn-danger" onclick="eliminarGasto(${index})">Eliminar</button> 
                <button class="btn btn-info" onclick="editarGasto(${index})">Editar</button> </th>
                </tr>`;
            });
        }


}

leerDatos();