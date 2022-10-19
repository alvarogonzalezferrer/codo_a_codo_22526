// sirve para mostrar u ocultar el menu
function mostrarMenu() 
{
	var x = document.getElementById("miMenu");
	if (x.style.display === "block") 
	{
		x.style.display = "none";
	} 
	else 
	{
		x.style.display = "block";
	}
}


// sirve para obtener el precio del dolar blue
// mediante la API publica de criptoya
// dolar hamburguesa

// ejemplo de : https://www.geeksforgeeks.org/how-to-use-the-javascript-fetch-api-to-get-data/

// api url
const api_url = "https://criptoya.com/api/dolar";
  
// funcion asincronica
async function get_dolar(url) 
{
    const dolar_r = await fetch(url);
	
	if (!dolar_r.ok) // fallo la carga del dato del dolar, API caida?
	{
		const message = 'Ocurrió un error: ${response.status}';
		document.getElementById("dolarBurgaCotizacion").innerHTML = "NO PUEDO OBTENER LA COTIZACION DEL DOLAR!";
		throw new Error(message);
	}
	
    const data = await dolar_r.json(); // guardar data en JSON
    
    return data;
}

// obtener el dolar... por un puñado de dolares...
// ejemplo de : https://dmitripavlutin.com/javascript-fetch-async-await/#2-fetching-json
function dolar_hamburgesa()
{
	// obtiene de manera asincrónica la cotización,
	// así que hay que esperar que la cargue
	get_dolar(api_url).then(data => 
	{
		//console.log("-- Dolar hamburguesa --");
		//console.log(data); ; // valores del dólar variados, mep, blue, etc
		
		var blue = parseFloat(data.blue); // dólar blue 
		
		//console.log("Blue:" + blue); // el precio que me interesa
		
		// poner cotizacion de hoy 
		document.getElementById("dolarBurgaCotizacion").innerHTML = "Dólar hamburguesa hoy: " + blue + " pesos argentinos.";
		
		// cambiar precios
		// ejemplo de: https://stackoverflow.com/questions/5338716/get-multiple-elements-by-id
		var elementos = document.getElementsByClassName("precio");
		var precio = '';
		for(var i = 0; i < elementos.length; i++) 
		{	
			//console.log(elementos[i].title); // precio en dolares pre cargado
			var precioARS = parseFloat(elementos[i].title) * blue; // precio en dolares * cotizacion blue
			//console.log(precioARS);
			
			precioARS = Math.ceil(precioARS)// como soy argento garca, redondedo para arriba
			
			elementos[i].innerHTML = "$ " + precioARS + " pesos (USD " + elementos[i].title + ")" ;
		}		
	});

}
