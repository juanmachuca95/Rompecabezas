

window.addEventListener("load", inicio, false);

function inicio(){
	//separado
	$('#panelControl').hide();
	$('#miTabla').hide();
	primerClick();
}

var seleccion = false;
var seleccion2 = false;

function primerClick(){
	var vPrimerClick;
	var vSegundoClick;
	
	var primerId;
	var segundoId;
	
	$('#miTabla').click(function(e){
		//si seleccion es true es porque ya se seleccion el primero
		if(seleccion == false){

			vPrimerClick = e.target.id; //click tendra el elemento id
			primerId = document.getElementById(vPrimerClick)	
			//obtengo el id del click


			$(primerId).css("border","2px solid red");
			//le doy un borde rojo al id seleccionado
			$(primerId).css("opacity","0.7");
			//le doy una opacidad
			

			seleccion = true;
			vPrimerClick = null; //borro el valor del primerClick en la variable
			e.target = null; // lo que tenga guardado en target. 


			return 0;
		}

		if((seleccion && !seleccion2) && (e.target.id != null)){
		
			//$('#miTabla').click(function(e){//escucho un segundo click
			//un error que tuve aca fue poner otra escucha al segundo click. 
			//El codigo funcionaba pero en el modo debugg me tiraba error al errar y decirme que
			//el e.targe.id es null.
				
				vSegundoClick = e.target.id;
			
				segundoId = document.getElementById(vSegundoClick);
			
				$(segundoId).css("border","2px solid blue");//primero le doy un color azul para que en el modo debugg me marque en el paso a paso
				$(segundoId).css("opacity","0.7");

				seleccion2 = true;
				e.target = null;

				if(seleccion && seleccion2){
					var vfuentePrimerId;
					var vfuenteSegundoId;
					
					
					vfuentePrimerId = $(primerId).attr("src");
					vfuenteSegundoId = $(segundoId).attr("src");

					$(primerId).attr("src",vfuenteSegundoId);
					$(segundoId).attr("src",vfuentePrimerId);
					
					$(primerId).css("border","2px solid green"); 	//le pongo un bordesito verde
					$(segundoId).css("border","2px solid green");   //le pongo un bordesito verde
					
					seleccion = false;
					seleccion2 = false;
					primerId = "";
					segundoId = "";
					
					vSegundoClick = null;
					return 0;
				}
			//})
		}else{
			return 0;
		}
	})

}	




function paises(){
	var state = new Array(
		"Alemania", "Armenia","Argentina", "Bolivia",
		"Brazil",  "Chile", "Colombia", "Costa Rica",
		"Cuba", "Republica Dominicana", "Ecuador",
		"Emiratos Arabes", "España", "Estados Unidos", "Francia",
		"Mexico", "Noruega", "Paraguay", 
		"Peru" ,"Russia", "Ukraine", 
		"Uruguay", "Venezuela");

	//genero una lista dinamica de paises!!
	//con jquery			
	for(var i=0; i < state.length; i++){
		$('#pais').append(
			'<option>'+state[i]+'</option>'
		);
	}
}



