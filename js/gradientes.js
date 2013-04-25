var graficaAritmetico;
var graficaGeometrico;
var graficaPerpetuo;

//Funcion que se ejecuta al cargar la página
$(document).ready(function(){

	//Metodo que se encarga de habilitar/desabilitar una entradas para diferidos
	$(document).on("change", "#funcion",
			function(){
			
			if($(this).val()=="1") label="Presente";
			else label="Futuro";
			
			$(this).closest('form').find('label').eq(5).html("Valor "+label);
			
});
});

//Gradiente Aritmetico vencido en funcion presente
function gavp(A, ip, N, G){

factor = (1-Math.pow(1+ip,-1*N))/ip;

vp = A*factor + (G/ip)*(factor - (N/Math.pow(1+ip,N)));

return vp;
}

//Gradiente Aritmetico vencido en funcion futura
function gavf(A, ip, N, G){

factor = (Math.pow(1+ip,N)-1)/ip;
vf = A*factor + (G/ip)*(factor - N);
return vf;

}

//Gradiente Aritmetico perpetuo
function gap(A, ip, G){
vp = (A + (G/ip))/ip;
return vp;
}


//Gradiente Geometrico vencido en funcion presente
function ggvp(A, ip, N, k){

if(ip!=k)
{//Duda dudosa con el signo de k
vp = (A/(ip-k))*(1-Math.pow((1+k)/(1+ip),N));
}
else
{
vp = N*A/(1+ip);
}
return vp;
}
//Gradiente Geometrico vencido en funcion futura
function ggvf (A, ip, N, k){

vp = (A/(ip-k))*(Math.pow(1+ip,N)-Math.pow(1+k,N));
return vp;

}

//Gradiente Geometrico perpetuo
function ggp(A, ip, k){
vp = A/(ip-k);
return vp;
}

// ________ANTICIPADOS____________

//Gradiente Aritmetico Anticipado en funcion presente
function gaap(A, ip, N, G){

return gavp(A, ip, N, G)*(1+ip);

}

//Gradiente Aritmetico Anticipado en funcion futuro
function gaaf(A, ip, N, G){

return gavf(A, ip, N, G)*(1+ip);

}

//Gradiente Geometrico Anticipado en funcion presente
function ggap(A, ip, N, k){

return ggvp(A, ip, N, k)*(1+ip);

}

//Gradiente Geometrico Anticipado en funcion futura
function ggaf (A, ip, N, k){

return ggvf(A, ip, N, k)*(1+ip);

}

//-------------------------------------------//

function aritmetico()
{
	form = "form#formAritmetico "; 
	tipoGradiente = parseFloat($(form+"#tipoGradiente").val());
	formaGradiente = parseFloat($(form+"#formaGradiente").val());
	funcion = parseFloat($(form+"#funcion").val());
	primerPago = parseFloat($(form+"#primerPago").val());
	incremento = parseFloat($(form+"#incremento").val())*formaGradiente;
	numeroPeriodos = parseFloat($(form+"#numeroPeriodos").val());
	tipoPeriodos = parseFloat($(form+"#tipoPeriodos").val());
	tasaInteres = parseFloat($(form+"#tasaInteres").val())/(100*tipoPeriodos);

	rta=0.0;

	if(tipoGradiente==1)
	{	
		//Vencido
		switch(funcion)
		{
		case 1: rta = gavp(primerPago,tasaInteres,numeroPeriodos,incremento); break; //Presente
		case 2: rta = gavf(primerPago,tasaInteres,numeroPeriodos,incremento); break; //Futuro
		}
	}
	else
	{
		//Anticipado
		switch(funcion)
		{
		case 1: rta = gaap(primerPago,tasaInteres,numeroPeriodos,incremento); break; //Presente
		case 2: rta = gaaf(primerPago,tasaInteres,numeroPeriodos,incremento); break; //Futuro
		}	
	}
	
	
	$(form+"#valor").attr('value',rta.toFixed(4));
	
	x = new Array();
	y1 = new Array();
	y2 = new Array();
	
	for(i=0; i<numeroPeriodos; i++)
	{
	x[i]=i;
	y1[i]=0;y2[i]=0;	
	}

	if(funcion==1) p = 0; //Presente
	else p=numeroPeriodos; //Futuro
	
	y2[p] = -1*rta/numeroPeriodos;
	
	if(tipoGradiente==1)  p=1; //Vencido
	else p=0; //Anticipado
	
	for(i=p; i<numeroPeriodos+p; i++)
	{
		y1[i]=primerPago+(incremento*(i-p));
	}
	
	graficar(x,y1,y2,graficaAritmetico, 'graficaAritmetico', rta, 'Gradiente Aritmetico');	
	
}

function geometrico()
{
	form = "form#formGeometrico "; 
	tipoGradiente = parseFloat($(form+"#tipoGradiente").val());
	formaGradiente = parseFloat($(form+"#formaGradiente").val());
	funcion = parseFloat($(form+"#funcion").val());
	primerPago = parseFloat($(form+"#primerPago").val());
	incremento = parseFloat($(form+"#incremento").val())*formaGradiente/100;
	numeroPeriodos = parseFloat($(form+"#numeroPeriodos").val());
	tipoPeriodos = parseFloat($(form+"#tipoPeriodos").val());
	tasaInteres = parseFloat($(form+"#tasaInteres").val())/(100*tipoPeriodos);

	rta=0.0;

	if(tipoGradiente==1)
	{	
		//Vencido
		switch(funcion)
		{
		case 1: rta = ggvp(primerPago,tasaInteres,numeroPeriodos,incremento); break;
		case 2: rta = ggvf(primerPago,tasaInteres,numeroPeriodos,incremento); break;
		}
	}
	else
	{
		//Anticipado
		switch(funcion)
		{
		case 1: rta = ggap(primerPago,tasaInteres,numeroPeriodos,incremento); break;
		case 2: rta = ggaf(primerPago,tasaInteres,numeroPeriodos,incremento); break;
		}	
	}
	
	$(form+"#valor").attr('value',rta.toFixed(4));
	
	x = new Array();
	y1 = new Array();
	y2 = new Array();
	
	for(i=0; i<numeroPeriodos; i++)
	{
	x[i]=i;
	y1[i]=0;y2[i]=0;	
	}

	if(funcion==1) p = 0; //Presente
	else p=numeroPeriodos; //Futuro
	
	y2[p] = -1*rta/numeroPeriodos;
	
	if(tipoGradiente==1)  p=1; //Vencido
	else p=0; //Anticipado
	
	for(i=p; i<numeroPeriodos+p; i++)
	{
		y1[i]=primerPago*Math.pow(1+incremento,i-p);
	}
	
	graficar(x,y1,y2,graficaGeometrico, 'graficaGeometrico'	, rta, 'Gradiente Geometrico');	
	
}

function graficar(x,y1,y2,grafica,div,valor,titulo)
{

	grafica = new Highcharts.Chart({
					chart: {
						renderTo: div,
						defaultSeriesType: 'column'
					},
					title: {
						text: titulo
					},
					xAxis: {
						categories: x
					},
					yAxis: {
						title: {
							text: 'Pesos'
						},
						type: 'linear'
					},
					credits: {
						enabled: false
					},
					tooltip: {
						formatter: function() {
						
							if(this.series.name=='Valor' && this.y!=0) return ' $' + valor;
							return ' $' + this.y;
								//this.x +': '+ this.y +' visitas';
						}
					},
					plotOptions: {
						column: {
							stacking: 'normal',
							pointPadding: 0.2,
							borderWidth: 0,
						}
					},
				        series: [{
						name: 'Valor',
						data: y2,
						},
						{
						name: 'Cuotas',
						data: y1
						}						
					]
				});
}

function perpetuo()
{
	form = "form#formPerpetuo "; 
	tipoGradiente = parseFloat($(form+"#tipoGradiente").val());
	primerPago = parseFloat($(form+"#primerPago").val());
	incremento = parseFloat($(form+"#incremento").val());
	tipoPeriodos = parseFloat($(form+"#tipoPeriodos").val());
	tasaInteres = parseFloat($(form+"#tasaInteres").val())/(100*tipoPeriodos);
	
	rta=0.0;

	if(tipoGradiente==1) //Aritmetico
	{	
		rta = gap(primerPago,tasaInteres,incremento);
	}
	else //Geometrico
	{
		rta = ggp(primerPago,tasaInteres,incremento/100);
	}
	
	$(form+"#valor").attr('value',rta.toFixed(4));
	
	x = new Array();
	y1 = new Array();
	y2 = new Array();
	
	for(i=0; i<12; i++)
	{
	x[i]=i;
	y1[i]=0;y2[i]=0;	
	}

	y2[0] = -1*rta.toFixed(4)/12;
	
	for(i=1; i<12; i++)
	{
		if(tipoGradiente==1) y1[i]=primerPago+(incremento*(i-1)); //Aritmetico
		else y1[i]=primerPago*Math.pow(1+incremento/100,i-1); //Geometrico
	}
	
	graficar(x,y1,y2,graficaPerpetuo, 'graficaPerpetuo'	, rta, 'Gradiente Perpetuo');	
	
}

