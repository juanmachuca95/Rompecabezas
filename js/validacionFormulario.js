//separado
$('#panelControl').hide();
$('#contenedorTabla').hide();

window.addEventListener("load", setValidacion, false);


function setValidacion(){
    var vForm = document.getElementById('formulario');

    var vNombre = document.getElementById('nombre');
    var vSexoM = document.getElementById('sexoM');
    var vSexoF = document.getElementById('sexoF');
    var vPais = document.getElementById('pais');
    var vJugar = document.getElementById('jugar');

    vNombre.addEventListener("input", function nombre(){controlar(vNombre);}, false);
    vSexoM.addEventListener("change", controlCheckM, false);
    vSexoF.addEventListener("change", controlCheckF, false);
    vPais.addEventListener("change", controlSeleccion, false);
    vJugar.addEventListener("click", validar, false);
}


function controlar(nombre){
	var expresionRegular = new RegExp('[|!"#$%&/()=?¡¿{}+´*>:<._;°-]'); //Restriccion para caracteres especiales.

	if(nombre.value.length > 30 || buscarNumerico(nombre) == true || expresionRegular.test(nombre.value)){
		nombre.setCustomValidity('El campo solo admite 6 a 30 digitos alfabeticos.');
		nombre.style.border = '2px solid red';

	}else if(nombre.value.length == 0){
		nombre.setCustomValidity('');
        nombre.style.border = 'none';
        nombre.style.backgroundColor = 'white';
	}else{
		nombre.setCustomValidity('');
		nombre.style.backgroundColor = '#66ff99';
    }
    

    function buscarNumerico(pNombre){
		var valor;

		for(var i = 0; i<pNombre.value.length; i++){

			if(!isNaN(pNombre.value[i]) && !(pNombre.value[i].trim() == '')){
				
				valor = true;
				i = pNombre.value.length;
			}

		}

		return valor;
	}
}

//VALIDACION PARA EL SEXO. 
function controlCheckM(){
    valorF = false;
    valorM = false;

    valorM = document.getElementById('sexoM').checked;
    valorF = document.getElementById('sexoF').checked;
    if(valorM){
        $('#sexoF').prop('checked', false);
        $('#sexoF').attr('required', false);
    }else if(valorF){
        $('#sexoM').prop('checked', false);
        $('#sexoM').attr('required', false);
    }
}

//VALIDACION PARA EL SEXO
function controlCheckF(){
    valorF = false;
    valorM = false;

    valorM = document.getElementById('sexoM').checked;
    valorF = document.getElementById('sexoF').checked;
    if(valorF){
        $('#sexoM').prop('checked', false);
        $('#sexoM').attr('required', false);
    }else if(valorM){
        $('#sexoF').prop('checked', false);
        $('#sexoF').attr('required', false);
    }
}

//VALIDACION PARA EL PAIS
function controlSeleccion(){
    var vPais = document.getElementById('pais');

    if($('#pais').val() == "Elige un Pais"){
        vPais.setCustomValidity("Elige un pais de la lista");
    }else{
        vPais.setCustomValidity("");
    }
}


//VALIDACION PARA JUGAR
function validar(){
    var vForm = document.getElementById('formulario').checkValidity();

    if(vForm){ 
        var nombre = document.getElementById('nombre').value;
        var pais   = document.getElementById('pais').value;
        
        window.location.href = "gameone.html?usuario="+nombre+"&pais="+pais+"&valido=si";
        $('#panelControl').show("slow");        //Me muestra La imagen y tiempo
        $('#contenedorTabla').show("slow");     //Muestra la zona de juego.
        $('#miTabla').show("slow");
        $('#formulario').hide("slow");          //Me oculta el formulario.
        cuentaRegresiva();                      //Empieza el conteo
        crearInfoJugador();                     //Armo un parte visual del jugador.

    }else{
        alert("No se puede enviar!");
    }
}

//LacuentaRegresiva Comienza ni bien se registra el jugador
var cantidadSegundos = 16;
var detener;
function cuentaRegresiva(){
	
	detener = setInterval('mandarCadaUnSegundo()', 1000);

}

function mandarCadaUnSegundo(){
    cantidadSegundos = cantidadSegundos -1;

    pararElSetInterval(cantidadSegundos);
    return $('#segundos').html('Tiempo: &#x231b;'+cantidadSegundos); //Me muestra la cuenta regresiva en el documento!-
}

var tiempoTerminado;
function pararElSetInterval(segundos){

    if(segundos == 0){
        clearInterval(detener);                             //se la cuenta llega a 0 lo detiene. 
        tiempoTerminado = true;
        ganadorOPerdedor(tiempoTerminado);
    }else{
        tiempoTerminado = false;
        ganadorOPerdedor(tiempoTerminado);
    }

}

//la funcion clearInterval me detiene los intervalos.


function ganadorOPerdedor(controlTiempo){
	
	var imgFuentes = new Array('img/part1.png','img/part2.png','img/part3.png','img/part4.png',
	'img/part5.png','img/part6.png', 'img/part7.png', 'img/part8.png','img/part9.png');

	var img = document.getElementsByTagName("img");
    
    
    var contadorCorrectos =0;
	//img[i].getAttribute("src") // me devuelve el valor de la fuente

	for(var i=0; i<img.length; i++){

		if(img[i].getAttribute("src") == imgFuentes[i]){		//Hago que coincidan las fuentes.
			contadorCorrectos++;
		}
	}

	if(contadorCorrectos == 9){
		
		for(i=0; i<img.length;i++){
            img[i].style.border = 'none';
            img[i].style.opacity = '1';
            
        }
        var td = document.getElementsByTagName("td");

        for(var i =0; i<td.length; i++){
            td[i].style.padding = '0px';
        }

        $('#miModal').modal("show");	//Modal de victoria.
        clearInterval(detener);         //Detenemos la cuenta Regresiva.
	
	}else if(controlTiempo){
	
		$('#miModalDerrota').modal("show"); //Modal de derrota.
	
	}

}

function crearInfoJugador(){
    var sexoM = document.getElementById('sexoM').checked;
    var sexoF = document.getElementById('sexoF').checked 

    var nombre = document.getElementById('nombre').value;
    var pais   = document.getElementById('pais').value;

    if(sexoF == true){
        $('#panelControl').append(
            '<div>'+
                '<h3 id="nombreInfo">'+
                    '<b>Jugador/a : </b>'+'&#x1f469;&#x200d;&#x1f4bc;'+ nombre+
                '</h3>'+
                '<h3 id="nombreInfo">'+
                    '<b>Pais : </b>'+pais+
                '</h3>'+
            '</div>'
        );
    }
    if(sexoM == true){
        $('#panelControl').append(
            '<div>'+
                '<h3 id="nombreInfo">'+
                    '<b>Jugador/a : </b>'+'&#x1f468;&#x200d;&#x1f4bc;'+ nombre+
                '</h3>'+
                '<h3 id="nombreInfo">'+
                    '<b>Pais : </b>'+pais+
                '</h3>'+
            '</div>'
        );
    }

    $('#formulario')[0].reset(); //reseteo todo el contenido del formulario.
}