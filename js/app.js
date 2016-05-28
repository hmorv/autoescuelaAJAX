var datos;
function crear_formulario(d) {

}
// function generar_pregunta(numPregunta, textoPregunta, arrayPreguntas) {
// 	var r = "<p> Pregunta" + (i+1) + "<br />" + 
// }

function cargar_respuestas_ajax(xml, r) {
		$.ajax({
			url: xml,
			type: 'GET',
			dataType: 'xml',
			async: false,
			success: function(data) {
			//var xmlDoc = $.parseXML(data);
			$xml = $(data);
			$p = $xml.find("test");
			$respuestas = $xml.find("RespuestaOK");
			//console.log($p);
			console.log($respuestas);
			//return $respuestas;
			var result = [];
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
function generar_bloques_preguntas($preguntas, destino) {
	if($preguntas.length > 0) {
		var result = "";
		for(var i = 0; i < $preguntas.length; i++ ) {
			result += "<h3> Pregunta" + (i+1) + "</h3>"
			result += "<h4>" + $preguntas[i].childNodes[1].textContent + "</h4>";
			result += "<ul class='.opcion'><li><label><input type='radio' name='"+i+"' value='"+(i+1)+"'>" + "<span class='opcion'>" + $preguntas[i].childNodes[3].textContent + "</span></label></li>";
			result += "<li><label><input type='radio' name='"+i+"' value='"+(i+1)+"'>" + "<span class='opcion'>" + $preguntas[i].childNodes[5].textContent + "</span></label></li>";
			result += "<li><label><input type='radio' name='"+i+"' value='"+(i+1)+"'>" + "<span class='opcion'>" + $preguntas[i].childNodes[7].textContent + "</span></label></li></ul>";
		}
		return result;
	}
}

function comprobar_respuesta(pregunta, respuesta) {
	return pregunta == respuesta;
}

function get_respuestas(origen) {
	
	/*var r = "";
	for(var i = 0; i < 30; i++) {
		r += "0";
	}*/
	var result = [];//r.split("");
	switch (origen) {
		case "local":
			//for(var i = 0; i < $("input").length; i++) {
				$(":radio").each(function(index, el) {
					if($(this).is(':checked'))
						result.push('Respuesta' + $(this).val());
				});
				return result;
			//}
		break;
		case "remoto":
			cargar_respuestas_ajax('xml/datos.xml', result);
			//var $obj = cargar_respuestas_ajax('xml/datos.xml');
			/*for (var i = 0; i < $obj.length; i++) {
				result.push($obj[i]);
			}*/
			return result;
		break;
		default:
			// statements_def
			return [-1];
			break;
		}
	}
	function marcar(str, indice) {
		var selector = ".opcion:checked:eq("+indice+")";
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
				// statements_1
				break;
			default:
				// statements_def
				break;
		}
	}

	function corregir_test() {
		var result = 0;
		var respuestas_usuario = get_respuestas("local");
		var respuestas_original = get_respuestas("remoto");
		for(var i = 0; i < respuestas_original.length; i++) {
			if(comprobar_respuesta(respuestas_usuario[i], respuestas_original[i])) {
				result++;
				marcar('verde', i+1);
			} else {
				marcar('rojo', i+1);
			}
		}
		if(result > 1) 
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
		$("#corregir, #anterior, #siguiente").hide();
		$("#inicio").click(function(event) {
			$("section").empty();
			mostrar_mensaje("#resultado","<h1>Vamos, suerte!</h1>");
			cargar_preguntas('xml/datos.xml');
			$(this).css({
				display: 'none',
			});
			$("#corregir").css({
				display: 'block',
			});
			$("input").prop({
				disabled: false,
			});
		});
		$("#corregir").click(function(event) {
			$("input").prop({
				disabled: true,
			});

			mostrar_mensaje("#resultado","<h1>Correción de test</h1>");
			corregir_test();
			//mostrar errores
			//dar nota
			$(this).css({
				display: 'none',
			});
			$("#inicio").css({
				display: 'block',
			});
			

		});
		$("#anterior").click(function(event) {
		//cargar anterior
	});
		$("#siguiente").click(function(event) {
		//cargar siguiente
	});
	});