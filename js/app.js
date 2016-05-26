var datos;
function crear_formulario(d) {

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
			for(var i = 0; i < $preguntas.length; i++) {
				$("section").append("<div class='bloque-pregunta'>");
				$("section").append("<p class='enunciado'> Pregunta" + (i+1) + $preguntas[i].childNodes[1].textContent + "</p>");
				$("section").append("<p class='respuesta'><label><input type='radio' name='"+i+"' value=''>" + $preguntas[i].childNodes[3].textContent + "</label></p>");
				$("section").append("<p class='respuesta'><label><input type='radio' name='"+i+"' value=''>" + $preguntas[i].childNodes[5].textContent + "</label></p>");
				$("section").append("<p class='respuesta'><label><input type='radio' name='"+i+"' value=''>" + $preguntas[i].childNodes[7].textContent + "</label></p>");
				$("section").append("</div>");
			}
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
$(document).ready(function() {

	$("input[type=checkbox]:checked").change(function(event) {
		if($(this).is(':checked'))
			alert("green");
		else
			alert("red");
	});;



	$("#inicio").click(function(event) {
		cargar_preguntas('xml/datos.xml');
	});
	$("#corregir").click(function(event) {
		/* Act on the event */
	});
	$("#anterior").click(function(event) {
		//cargar anterior
	});
	$("#siguiente").click(function(event) {
		//cargar siguiente
	});
});