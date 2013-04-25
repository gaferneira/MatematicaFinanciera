function uvrSimple()
{
		form = "form#formUvrSimple "; 
		inflacionAnterior = parseFloat($(form+"#inflacionAnterior").val())/100;
		uvr15Anterior = parseFloat($(form+"#uvr15Anterior").val());
		diaSerie = parseFloat($(form+"#diaSerie").val());
		totalDias = parseFloat($(form+"#totalDias").val());		
		
		tabla = $("#tablaUvrSimple tbody");
		tabla.html("");
		diaAnterior = uvr15Anterior*Math.pow(1+inflacionAnterior,(diaSerie-1)/totalDias);
		calculada = uvr15Anterior*Math.pow(1+inflacionAnterior,diaSerie/totalDias);
		rta = "<tr>";
		rta += "<td>"+diaSerie+"</td>";
		rta += "<td>"+diaAnterior.toFixed(4)+"</td>";
		rta += "<td>"+calculada.toFixed(4)+"</td>";
		rta += "</td>";
			
		tabla.append(rta);
		
		return false;	

}

function uvrSerie()
{
		form = "form#formUvrSerie "; 
		inflacionAnterior = parseFloat($(form+"#inflacionAnterior").val())/100;
		uvr15Anterior = parseFloat($(form+"#uvr15Anterior").val());
		totalDias = parseFloat($(form+"#totalDias").val());		
		
		tabla = $("#tablaUvrSerie tbody");
		tabla.html("");
		rta = "";
		diaAnterior = uvr15Anterior;
		
		for(diaSerie=1; diaSerie<=totalDias; diaSerie++)
		{
		calculada = uvr15Anterior*Math.pow(1+inflacionAnterior,diaSerie/totalDias);
		rta += "<tr>";
		rta += "<td>"+diaSerie+"</td>";
		rta += "<td>"+diaAnterior.toFixed(4)+"</td>";
		rta += "<td>"+calculada.toFixed(4)+"</td>";
		rta += "</td>";
		diaAnterior = calculada;
		}
		
		tabla.append(rta);
		return false;	
}