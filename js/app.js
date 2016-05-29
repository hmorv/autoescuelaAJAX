function cargar_cuestionario(xml) {
	/* esta funcion hace una llamada AJAX al xml y genera el cuestionario en el HTML */
	$.ajax({
		url: xml,
		type: 'GET',
		dataType: 'xml',
		success: function(data) {
			$xml = $(data);
			$preguntas = $xml.find("pregunta");
			$("section").append(generar_bloques_preguntas($preguntas));
		}
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}

function cargar_respuestas_ajax(xml, r) {
	/* también hace llamada pero desactivando el asíncrono
	esta llamada obtiene las respuestas.
	Se desactiva el asíncrono porque si no no me deja guardar las respuestas */
	$.ajax({
		url: xml,
		type: 'GET',
		dataType: 'xml',
		async: false,
		success: function(data) {
			$xml = $(data);
			$respuestas = $xml.find("RespuestaOK");
			for (var i = 0; i < $respuestas.length; i++) {
				r.push($respuestas[i].textContent);
			}
		}
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
		return r;
	});
}

function generar_bloques_preguntas($preguntas) {
	/* genera una cadena con el código HTML del cuestionario y lo devuelve */
	var bloque_preguntas = "";
	if($preguntas.length > 0) {
		for(var i = 0; i < $preguntas.length; i++ ) {
			bloque_preguntas += "<h3> Pregunta - " + (i+1) + "</h3>"
			bloque_preguntas += "<h4>" + $preguntas[i].childNodes[1].textContent + "</h4>";
			bloque_preguntas += "<ul class='opcion'><li><label><input type='radio' name='"+i+"' value='"+(i+1)+"'>" + "<span>" + $preguntas[i].childNodes[3].textContent + "</span></label></li>";
			bloque_preguntas += "<li><label><input type='radio' name='"+i+"' value='"+(i+1)+"'>" + "<span>" + $preguntas[i].childNodes[5].textContent + "</span></label></li>";
			bloque_preguntas += "<li><label><input type='radio' name='"+i+"' value='"+(i+1)+"'>" + "<span>" + $preguntas[i].childNodes[7].textContent + "</span></label></li></ul>";
			if($preguntas[i].childNodes[11].textContent != "")
				bloque_preguntas += "<img src='img/" + $preguntas[i].childNodes[11].textContent + "'></img>";
		}
		
	} else {
		bloque_preguntas = "<h1>ERROR! ¿No hay preguntas?</h1>";
	}
	return bloque_preguntas;
}

function son_iguales(pregunta, respuesta) {
	// compara respuesta usuario con la del xml
	return pregunta === respuesta;
}

function obtener_respuestas(origen) {
	/* Esta funcion obtiene las respuestas en funcion del parametro origen:
	- local, las obtiene del HTML manipulado por el usuario
	- remoto, las obtiene del xml
	las devuelve en formato array */
	var respuestas = [];
	switch (origen) {
		case "local":
		$(".opcion").each(function(index, el) {
			//recorremos toso los ul
			var grupo = this.childNodes;
			for(var i = 0; i < grupo.length; i++) {
				/*recorremos uno a uno los 3 input de cada bloque buscando 
				si hay uno seleccionado: si no encuentra ninguno, devuelve un 0
				*/
				var opcion_actual = grupo[i].childNodes[0].childNodes[0];

				if($(opcion_actual).is(':checked')) {
					respuestas.push('Respuesta' + (i+1));
					break;
				}
				if(!$(opcion_actual).is(':checked') && i == 2)
					respuestas.push('0');
			}
		});
		break;
		case "remoto":
		//cargamos las respuestas desde el xml
		cargar_respuestas_ajax('xml/datos.xml', respuestas);
		break;
		default:
		break;
	}
	return respuestas;
}

function marcar(str, indice) {
	//marca las respuestas en verde o en rojo, en funcion de str
	var selector = ".opcion:eq("+indice+")";
	switch (str) {
		case 'verde':
		$(selector).css({
			color: 'green',
		});
		break;
		case 'rojo':
		$(selector).css({
			color: 'red',
		});
		break;
		default:
		break;
	}
}

function corregir_test() {
	var aciertos = 0;
	//obtenemos las respuestas del usuario y las del xml
	var respuestas_usuario = obtener_respuestas("local");
	var respuestas_original = obtener_respuestas("remoto");
	
	/*aprobado se corresponde con el porcentaje que queramos establecer de aciertos 
	sobre el cuestionario original*/
	var aprobado = parseInt((respuestas_original.length * 90) / 100);
	
	for(var i = 0; i < respuestas_original.length; i++) {
		if(son_iguales(respuestas_usuario[i], respuestas_original[i])) {
			aciertos++;
			marcar('verde', i);
		} else {
			marcar('rojo', i);
		}
	}
	if(aciertos > aprobado)
		mostrar_mensaje("#resultado", "<h2>Aprobado! Has acertado "+ aciertos + " preguntas</h2>");
	else
		mostrar_mensaje("#resultado", "<h2>Suspendido! Has acertado "+ aciertos + " preguntas</h2>");

}

function mostrar_mensaje(destino, mensaje) {
	//destino es un selector id. borra mensajes previos
	$(destino).empty;
	$(destino).html(mensaje);
}

$(document).ready(function() {
	//ocultamos el boton corregir
	$("#corregir").hide();

	$("#inicio").click(function(event) {
		$("section").empty();

		$(this).css({
			display: 'none'
		});
		$("#corregir").css({
			display: 'block'
		});
		$("input").prop({
			disabled: false
		});

		mostrar_mensaje("#resultado","<h1>Vamos, suerte!</h1>");
		cargar_cuestionario('xml/datos.xml');
	});

	$("#corregir").click(function(event) {
		$("input").prop({
			disabled: true
		});
		corregir_test();
		$(this).css({
			display: 'none',
		});
		$("#inicio").css({
			display: 'block',
		});
	});
});