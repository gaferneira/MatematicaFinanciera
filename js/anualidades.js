
//Funcion que se ejecuta al cargar la página
$(document).ready(function(){

	//Metodo que se encarga de habilitar/desabilitar una entradas para diferidos
	$("form#formAnualidades").on("change", "#opcion",
			function(){
			
			$inputs = $("form#formAnualidades :input");
				
			if($(this).val()=="2")
			{
				for(i=6; i<10; i++)	$inputs.eq(i).attr('readonly',false).removeClass("disabled");
			}
			
			else if(!$inputs.eq(6).hasClass('disabled'))
			{
				for(i=6; i<10; i++)	$inputs.eq(i).attr('readonly',true).addClass("disabled");
			}
			});
			
	$("form#formPerpetuas").on("change", "#opcion",
			function(){
			
			$inputs = $("form#formPerpetuas :input");
				
			if($(this).val()=="2")
			{
				for(i=4; i<7; i++)	$inputs.eq(i).attr('readonly',false).removeClass("disabled");
			}
			
			else if(!$inputs.eq(6).hasClass('disabled'))
			{
				for(i=4; i<7; i++)	$inputs.eq(i).attr('readonly',true).addClass("disabled");
			}
			});	
});

function anualidades()
{
		form = "form#formAnualidades "; 
		opcion = parseFloat($(form+"#opcion").val());
		tipoAnualidad = parseFloat($(form+"#tipoAnualidad").val());
		valorCuota = parseFloat($(form+"#valorCuota").val());
		numeroPeriodos = parseFloat($(form+"#numeroPeriodos").val());
		tipoPeriodos = parseFloat($(form+"#tipoPeriodos").val());
		tasaInteres = parseFloat($(form+"#tasaInteres").val())/(100*tipoPeriodos);
		periodosDiferidos = parseFloat($(form+"#periodosDiferidos").val());
		tipoPeriodoDiferido = parseFloat($(form+"#tipoPeriodoDiferido").val());
		tasaDiferida = parseFloat($(form+"#tasaDiferida").val());	

		tabla = $("#tablaAnualidades tbody");
		tabla.html("");
		rta = "<tr>";
		rta += "<td>"+numeroPeriodos+"</td>";
		rta += "<td>"+valorCuota+"</td>";
		
		factor=0.0;
		valor=0.0;
		
		if(tipoAnualidad==1) //Vencida
		{
			switch(opcion)
			{
			case 1: //Presente
				factor = favp(tasaInteres,numeroPeriodos);
				valor = factor*valorCuota;
				break;
			case 2: //Diferido con presente
				factor = favp(tasaInteres,numeroPeriodos);
				valor = factor*valorCuota;
				valor *= Math.pow(1+(tasaDiferida/(100*tipoPeriodoDiferido)),-1*periodosDiferidos);
				break;
			case 3: //Futuro
				factor = favf(tasaInteres,numeroPeriodos);
				valor = factor*valorCuota;
				break;
			}
		}
		else // Anticipada
		{
			switch(opcion)
			{
			case 1: //Presente
				factor = faap(tasaInteres,numeroPeriodos);
				valor = factor*valorCuota;
				break;
			case 2: 
				factor = faap(tasaInteres,numeroPeriodos);
				valor = factor*valorCuota;
				valor *= Math.pow(1+(tasaDiferida/(100*tipoPeriodoDiferido)),-1*periodosDiferidos);
				break;
			case 3: //Futuro
				factor = faaf(tasaInteres,numeroPeriodos);
				valor = factor*valorCuota;
				break;
			}
		}
		
		rta += "<td>"+factor.toFixed(4)+"</td>";
		rta += "<td>"+valor.toFixed(4)+"</td>";
		rta += "</tr>"
		tabla.append(rta);
		
		
		return false;	
}

				
function anualidadPerpetua()
{
		form = "form#formPerpetuas "; 
		opcion = parseFloat($(form+"#opcion").val());
		valorCuota = parseFloat($(form+"#valorCuota").val());
		tasaInteres = parseFloat($(form+"#tasaInteres").val());
		tipoTasa = parseFloat($(form+"#tipoTasa").val());
		periodosDiferidos = parseFloat($(form+"#periodosDiferidos").val());
		tasaDiferida = parseFloat($(form+"#tasaDiferida").val());
		tipoPeriodoDiferido = parseFloat($(form+"#tipoPeriodoDiferido").val());	
		
		
		switch(opcion)
		{
			case 1: valor = valorCuota/(tasaInteres/(tipoTasa*100));
				break;
			case 2: 
				valor = valorCuota/(tasaInteres/(tipoTasa*100));
				valor *= Math.pow(1+(tasaDiferida/(100*tipoPeriodoDiferido)),-1*periodosDiferidos);
				break;
		}
		
		$(form+"#valorPresente").attr('value',valor);
}

function factores()
{
	form = "form#formFactores "; 
	tasaInteres = parseFloat($(form+"#tasaInteres").val())/100;
	tabla = $("#tablaFactores tbody");
	tabla.html("");
	for(n=1; n<=180; n++)
	{
		rta = "<tr><td scope='col'>"+n+"</td>";
		rta += "<td scope='col'>"+favp(tasaInteres,n).toFixed(8).replace(".",",")+"</td>";
		rta += "<td scope='col'>"+favf(tasaInteres,n).toFixed(8).replace(".",",")+"</td>";
		rta += "<td scope='col'>"+faap(tasaInteres,n).toFixed(8).replace(".",",")+"</td>";
		rta += "<td scope='col'>"+faaf(tasaInteres,n).toFixed(8).replace(".",",")+"</td>";
		rta += "</tr>"	
		tabla.append(rta);
	}
}

//Factor anualidad vencida presente
function favp(ip, N)
{
return (1-Math.pow(1+ip,-1*N))/ip;
}


//Factor anualidad vencida futuro
function favf(ip, N)
{
	return (Math.pow(1+ip,N)-1)/ip;
}

//Factor anualidad anticipada presente
function faap(ip, N)
{
return 1+(1-Math.pow(1+ip,-1*N+1))/ip;
}
//Factor anualidad anticipada futura
function faaf(ip, N)
{
return ((Math.pow(1+ip,N+1)-1)/ip)-1;
}