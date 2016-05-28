var datos;
function crear_formulario(d) {

}
// function generar_pregunta(numPregunta, textoPregunta, arrayPreguntas) {
// 	var r = "<p> Pregunta" + (i+1) + "<br />" + 
// }

function cargar_preguntas_ajax(xml) {
		$.ajax({
			url: xml,
			type: 'GET',
			dataType: 'xml',
			success: function(data) {
			//var xmlDoc = $.parseXML(data);
			$xml = $(data);
			$p = $xml.find("test");
			$preguntas = $xml.find("pregunta");
			//console.log($p);
			console.log($preguntas);
			return $preguntas;
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
function generar_bloques_preguntas($preguntas, destino) {
	if($preguntas.length > 0) {
		var result = "";
		for(var i = 0; i < $preguntas.length; i++ ) {
			result += "<p> Pregunta" + (i+1) + "<br />" + $preguntas[i].childNodes[1].textContent + "</p>";
			result += "<ul><li><label><input type='radio' name='"+i+"' value='0'>" + $preguntas[i].childNodes[3].textContent + "</label></li>";
			result += "<li><label><input type='radio' name='"+i+"' value='1'>" + $preguntas[i].childNodes[5].textContent + "</label></li>";
			result += "<li><label><input type='radio' name='"+i+"' value='2'>" + $preguntas[i].childNodes[7].textContent + "</label></li></ul>";
		}
		return result;
	}
}

function comprobar_respuesta(pregunta, respuesta) {
	return pregunta == respuesta;
}

function get_respuestas(origen) {
	var result = [];
	switch (origen) {
		case "local":
			for(var i = 0; i < $("input").length; i++) {
				$("input").each(function(index, el) {
					result.push($(this).val());
				});
			}
		break;
		case "remoto":
			var obj = cargar_preguntas_ajax('xml/datos.xml');
			for (var i = 0; i < obj.length; i++) {
				result.push(obj[i]);
			}
			return result;
		break;
		default:
			// statements_def
			return [-1];
			break;
		}
	}

	function corregir_test() {
		var resul = 0;
		var respuestas_usuario = get_respuestas("local");
		var respuestas_original = get_respuestas("remoto");
		for(var i = 0; i < respuestas_original.length; i++) {
			if(comprobar_respuesta(respuesta_usuario[i], respuesta_original[i])) {
				resul++;
			} else {

			}
		}
		if(resul > 20) 
			mostrar_mensaje("#resultado", "<h2>Aprobado!</h2>");
		else
			mostrar_mensaje("#resultado", "<h2>Suspendido!</h2>");

	}

	function cargar_preguntas(xml) {
		$.ajax({
			url: xml,
			type: 'GET',
			dataType: 'xml',
			success: function(data) {
			//var xmlDoc = $.parseXML(data);
			$xml = $(data);
			$p = $xml.find("test");
			$preguntas = $xml.find("pregunta");
			//console.log($p);
			console.log($preguntas);
			//return $preguntas;
			/*for(var i = 0; i < $preguntas.length; i++) {
				$("section").append("<p> Pregunta" + (i+1) + $preguntas[i].childNodes[1].textContent + "</p>");
				$("section").append("<p><label><input type='radio' name='"+i+"' value=''>" + $preguntas[i].childNodes[3].textContent + "</label></p>");
				$("section").append("<p><label><input type='radio' name='"+i+"' value=''>" + $preguntas[i].childNodes[5].textContent + "</label></p>");
				$("section").append("<p><label><input type='radio' name='"+i+"' value=''>" + $preguntas[i].childNodes[7].textContent + "</label></p>");
			}*/
			var test = generar_bloques_preguntas($preguntas, '#section');
			$("section").append(test);
			//$("footer").append( $preguntas.text() );

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

	function mostrar_mensaje(destino, mensaje) {
		//destino es una id
		$("#resultado").empty;
		$("#resultado").html(mensaje);
	}




	$(document).ready(function() {
		$("#inicio").click(function(event) {
			mostrar_mensaje("#resultado","<h1>Vamos, suerte!</h1>");
			cargar_preguntas('xml/datos.xml');
			$(this).css({
				display: 'none',
			});
			$("#corregir").css({
				display: 'inline',
			});
			
		});
		$("#corregir").click(function(event) {
			mostrar_mensaje("#resultado","<h1>Correción de test</h1>");
			corregir_test();
			//mostrar errores
			//dar nota
			$(this).css({
				display: 'none',
			});
			$("#inicio").css({
				display: 'inline',
			});
			

		});
		$("#anterior").click(function(event) {
		//cargar anterior
	});
		$("#siguiente").click(function(event) {
		//cargar siguiente
	});
	});