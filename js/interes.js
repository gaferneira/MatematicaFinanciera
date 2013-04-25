
//Funcion que se ejecuta al cargar la página
$(document).ready(function(){

	//Metodo que se encarga de habilitar/desabilitar una entrada para el calculo de Interes Compuesto
	$valorCalcular = $("#valorCalcular");
	$("form#formCompuesto").on("change", "#valorCalcular",
			function(){
			opcion = $(this).val();
			$("form#formCompuesto :input").each(function(){
			$(this).attr("readonly",false);
			$(this).removeClass("disabled");
			if($(this).attr("name")==opcion){
			$(this).attr("readonly",true);
			$(this).addClass("disabled");
			$(this).attr("value","");
			}

			});

			});
});

function interesSimple()
{
		form = "form#formSimple "; 
		saldo = parseFloat($(form+"#monto").val());
		tasaInteresAnual = parseFloat($(form+"#tasaInteres").val());
		tasaInteres = tasaInteresAnual/(12*100);
		tipoPlazo = parseFloat($(form+"#tipoPlazo").val());
		plazo = parseFloat($(form+"#plazo").val())*tipoPlazo;
		pagoIntereses = parseFloat($(form+"#pagoInteres").val());
		amortizacionCapital = parseFloat($(form+"#amortizacionCapital").val());	

		if(validarRangoInteres(tasaInteresAnual))
		{
			tabla = $("#tablaInteresSimple tbody");

			tabla.html("");

			cuota = saldo*amortizacionCapital/plazo;

			incremento=1;

			if(pagoIntereses==amortizacionCapital) incremento = pagoIntereses;

			sumaIntereses= saldo*tasaInteres*incremento;

			for(i=incremento; i<=plazo; i=i+incremento)
			{

			if(i%pagoIntereses==0)
				{interes = sumaIntereses;
				 sumaIntereses = 0;
				}
			else {	
					interes = 0;
				 }


			if(i%amortizacionCapital==0) amortizacion = cuota;
			else amortizacion = 0;

			total = interes + amortizacion;

				rta = "<tr><td scope='col'>"+i+"</td>";
				rta += "<td scope='col'>"+saldo.toFixed(4).replace(".",",")+"</td>";
				rta += "<td scope='col'>"+interes.toFixed(4).replace(".",",")+"</td>";
				rta += "<td scope='col'>"+amortizacion.toFixed(4).replace(".",",")+"</td>";
				rta += "<td scope='col'>"+total.toFixed(4).replace(".",",")+"</td>";
				rta += "</tr>"	
				saldo -= amortizacion;
				sumaIntereses += saldo*tasaInteres*incremento;
				tabla.append(rta);

			}
		}
		return false;	
}

function interesCompuesto()
{
		form = "form#formCompuesto "; 
		opcion = $(form+"#valorCalcular").val();
		tipoInteres = parseFloat($(form+"#tipoInteres").val());
		valorPresente = parseFloat($(form+"#valorPresente").val());
		valorFuturo = parseFloat($(form+"#valorFuturo").val());
		numeroPeriodos = parseFloat($(form+"#numeroPeriodos").val());
		tipoPeriodos = parseFloat($(form+"#tipoPeriodos").val());
		interesAnual = parseFloat($(form+"#tasaInteres").val());
		interes = interesAnual*tipoPeriodos/(12*100);

		if(opcion == "tasaInteres" || validarRangoInteres(interesAnual))
		{
			var rta=0;
			if(tipoInteres==1)
			{
			
				switch(opcion){
				case "valorPresente": rta = valorFuturo*Math.pow(1+interes,-1*numeroPeriodos); break;
				case "valorFuturo": rta = valorPresente*Math.pow(1+interes,numeroPeriodos); break;
				case "tasaInteres": rta = (12.0/tipoPeriodos)*(Math.pow(valorFuturo*Math.pow(valorPresente,-1),1/numeroPeriodos)-1)*100; break;
				case "numeroPeriodos": rta = Math.log(valorFuturo*Math.pow(valorPresente,-1))/Math.log(1+interes); break;
				}
			}
			else
			{
				switch(opcion){
				case "valorPresente": rta = valorFuturo*Math.pow(1-interes,numeroPeriodos); break;
				case "valorFuturo": rta = valorPresente*Math.pow(1-interes,-1*numeroPeriodos); break;
				case "tasaInteres": rta = (12.0/tipoPeriodos)*(1-Math.pow(valorPresente/valorFuturo,1/numeroPeriodos))*100; break;
				case "numeroPeriodos": rta = Math.log(valorPresente/valorFuturo)/Math.log(1-interes); break;
				}
			
			}

			val = rta.toFixed(4);
			$(form+"input[name="+opcion+"]").attr("value", val);
		}
		return false;
}