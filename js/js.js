$(document).ready(function() {


	$(document).on("change", "input[type=text]", function(){
		
		input = $(this);
		if(input.val().indexOf(",")!=-1)
		{
			val = input.val().split(",").join(".");
			input.attr('value',val);
		}
		});
		
	$(document).on("click", ".menu a", function(){

		if(opcion = $(this).attr('opcionTab'))	$("#pestañas").children('li').eq(opcion).children('a').click();
		
	});
});

function limpiarTabla(table)
{
$(table + " tbody").html("");
}

function validarRangoInteres(valorI)
{

if(valorI<0.5 || valorI > 45)
{
alert("El rango de interes tiene que estar entre 0.5% y 45%");
return false;
}

return true;
}