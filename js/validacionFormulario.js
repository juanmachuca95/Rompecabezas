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
        $('#formulario')[0].reset();
        window.location.href = "gameone.html?usuario="+nombre+"&pais="+pais+"&valido=si";
        $('#panelControl').show("slow");        //Me muestra La imagen y tiempo
        $('#contenedorTabla').show("slow");     //Muestra la zona de juego.
        $('#miTabla').show("slow");
        $('#formulario').hide("slow");          //Me oculta el formulario.
    }else{
        alert("No se puede enviar!");
    }
}
