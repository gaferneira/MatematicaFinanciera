function nominalEfectiva()
{

		form = "form#formNominal "; 
		interes = parseFloat($(form+"#tasaNominal").val());
		convertir = parseFloat($(form+"#tasaConvertir").val());
		tipoTasa = $(form+"#tipoTasa").val();
		rta=0;
		
		if(validarRangoInteres(interes))
		{
			if(tipoTasa==1)
			{
			rta = (Math.pow(1+interes/(convertir*100),convertir)-1)*100;
			}
			else{
			rta = (Math.pow(1-interes/(convertir*100),-1*convertir)-1)*100;
			}
			
			$(form+"#tasaCalculada").attr('value',rta.toFixed(4));
		}
		return false;		
}

function efectivaNominal()
{
		form = "form#formEfectiva "; 
		interes = parseFloat($(form+"#tasaEfectiva").val());
		convertir = parseFloat($(form+"#tipoEfectiva").val());
		tipoTasa = $(form+"#tipoTasa").val();
		rta=0;
		if(validarRangoInteres(interes*convertir))
		{
			if(tipoTasa==1)
			{
			rta = (Math.pow((interes/100)+1,1/convertir)-1)*convertir*100;
			}
			else{
			rta = (1-Math.pow((interes/100)+1,-1/convertir))*convertir*100;
			}
			
			$(form+"#tasaCalculada").attr('value',rta.toFixed(4));
		}
		return false;		
}

function tablaConversiones()
{
		form = "form#formConversiones "; 
		intervaloTasaInteres = parseFloat($(form+"#intervaloTasaInteres").val());
		
		if(intervaloTasaInteres >= 0.5 && intervaloTasaInteres<44)
		{
			tabla = $("#tablaConversion tbody");
			tabla.html("");
			
			periodos = new Array(12,4,2,1);
			rta = "";
			for(tasaInteres=0.5; tasaInteres<45; tasaInteres += intervaloTasaInteres)
			{	rta += "<tr>";
				for(i=0; i<4; i++)
				{
					interesVencido = (Math.pow(1+tasaInteres/(periodos[i]*100),periodos[i])-1)*100;
					interesAnticipado = (Math.pow(1-tasaInteres/(periodos[i]*100),-1*periodos[i])-1)*100;
					rta += "<td scope='col'>"+interesVencido.toFixed(4)+"</td>";
					rta += "<td scope='col'>"+interesAnticipado.toFixed(4)+"</td>";
				}
				rta += "</tr>";
			}
			
			tabla.append(rta);
		}
		else
		{
		alert("El intervalo tiene que estar entre 0.5 a 44");
		}
		return false;	

}