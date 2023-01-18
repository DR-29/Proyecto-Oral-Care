miespacio = window.localStorage;

var avalor1 = [],
avalor2 = [],
asuma = [];
aresta = [];
amultiplicacion = [];
aid = [];

var id=0;

id++;

var elementobotonsuma = document.querySelector('#btnsuma')
var elementobotonresta = document.querySelector('#btnresta')
var elementobotonmultiplicacion = document.querySelector('#btnmultiplicacion')

//elementobotonsuma.addEventListener('click', sumar)

if (localStorage.getItem('txtprimervalor') != null ) {

    avalor1 = JSON.parse(localStorage.getItem('valor1'));
    avalor2 = JSON.parse(localStorage.getItem('valor2'));
    asuma = JSON.parse(localStorage.getItem('suma'));
    aresta = JSON.parse(localStorage.getItem('resta'));
    amultiplicacion = JSON.parse(localStorage.getItem('multiplicacion'));

}



function sumar() {

    var valor1 = document.querySelector('#txtprimervalor').value;
    var valor2 = document.querySelector('#txtsegundovalor').value;
    var suma = parseInt(valor1)+ parseInt(valor2)

    if(valor1=="" || valor2==""){
        alert("Debe ingresar un valor en ambos campos")
    }else{
        
     alert( "El resultado es " + suma)

    }
 
    aid.push(id);
    avalor1.push(valor1);
    avalor2.push(valor2);
    asuma.push(suma);


    localStorage.setItem ('Id', JSON.stringify(aid));
    localStorage.setItem ('valor1', JSON.stringify(avalor1));
    localStorage.setItem ('valor2', JSON.stringify(avalor2));
    localStorage.setItem ('suma', JSON.stringify(asuma));
    


    var tabla = document.getElementById("mitabla");
    var nuevaFila = tabla.insertRow(tabla.lenght);

    cell1 = nuevaFila.insertCell(0);
    cell1.innerHTML = aid;

    cell2 = nuevaFila.insertCell(1);
    cell2.innerHTML = valor1;

    cell3 = nuevaFila.insertCell(2);
    cell3.innerHTML = valor2;

    cell4 = nuevaFila.insertCell(3);
    cell4.innerHTML = suma;

    cell4 = nuevaFila.insertCell(4);
     cell4.innerHTML = `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
     <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`;

    
    document.getElementById("res").innerHTML=" el resultado es: "+ suma

    document.getElementById("miForm").reset();
   


}

function restar() {

    var valor1 = document.querySelector('#txtprimervalor').value;
    var valor2 = document.querySelector('#txtsegundovalor').value;
    var resta = parseInt(valor1)- parseInt(valor2)

    if(valor1=="" || valor2==""){
        alert("Debe ingresar un valor en ambos campos")
    }else{
        
     alert( "El resultado es " + resta)

    }
 
    aid.push(id);
    avalor1.push(valor1);
    avalor2.push(valor2);
    aresta.push(resta);


    localStorage.setItem ('Id', JSON.stringify(aid));
    localStorage.setItem ('valor1', JSON.stringify(avalor1));
    localStorage.setItem ('valor2', JSON.stringify(avalor2));
    localStorage.setItem ('resta', JSON.stringify(aresta));
    


    var tabla = document.getElementById("mitabla");
    var nuevaFila = tabla.insertRow(tabla.lenght);

    cell1 = nuevaFila.insertCell(0);
    cell1.innerHTML = aid;

    cell2 = nuevaFila.insertCell(1);
    cell2.innerHTML = valor1;

    cell3 = nuevaFila.insertCell(2);
    cell3.innerHTML = valor2;

    cell4 = nuevaFila.insertCell(3);
    cell4.innerHTML = resta;

    cell4 = nuevaFila.insertCell(4);
     cell4.innerHTML = `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
     <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`;

    document.getElementById("res").innerHTML=" el resultado es: "+ resta

    document.getElementById("miForm").reset();
   


}

function multiplicar() {

    var valor1 = document.querySelector('#txtprimervalor').value;
    var valor2 = document.querySelector('#txtsegundovalor').value;
    var multiplicacion = parseInt(valor1) * parseInt(valor2)

    if(valor1=="" || valor2==""){
        alert("Debe ingresar un valor en ambos campos")
    }else{
        
     alert( "El resultado es " + multiplicacion)

    }
 
   
    aid.push(id);
    avalor1.push(valor1);
    avalor2.push(valor2);
    amultiplicacion.push(multiplicacion);


    localStorage.setItem ('Id', JSON.stringify(aid));
    localStorage.setItem ('valor1', JSON.stringify(avalor1));
    localStorage.setItem ('valor2', JSON.stringify(avalor2));
    localStorage.setItem ('multiplicacion', JSON.stringify(amultiplicacion));
    


    var tabla = document.getElementById("mitabla");
    var nuevaFila = tabla.insertRow(tabla.lenght);

    cell1 = nuevaFila.insertCell(0);
    cell1.innerHTML = aid;

    cell2 = nuevaFila.insertCell(1);
    cell2.innerHTML = valor1;

    cell3 = nuevaFila.insertCell(2);
    cell3.innerHTML = valor2;

    cell4 = nuevaFila.insertCell(3);
    cell4.innerHTML = multiplicacion;

    cell4 = nuevaFila.insertCell(4);
     cell4.innerHTML =  `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
     <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`;



    document.getElementById("res").innerHTML=" el resultado es: "+ multiplicacion

    document.getElementById("miForm").reset();
  

}

function onEdit(td){
    
    
    selectedRow = td.parentElement.parentElement;
    document.getElementById("txtprimervalor").value = selectedRow.cells[1].innerHTML;
    document.getElementById("txtsegundovalor").value = selectedRow.cells[2].innerHTML;
    

}


function onDelete(td){

    if (confirm('  Estas seguro de esto ? si lo borras perderas la informacion')){
        
        row = td.parentElement.parentElement;
        document.getElementById("mitabla").deleteRow(row.rowIndex);
        
        
        var num = document.getElementById('mitabla').rows.length;
       
        
    }

}


