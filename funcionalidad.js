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
		
		var blue = Math.ceil(parseFloat(data.blue)); // dólar blue , redondeado para arriba
		
		//console.log("Blue:" + blue); // el precio que me interesa
		
		// poner cotizacion de hoy 
		document.getElementById("dolarBurgaCotizacion").innerHTML = "Dólar hamburguesa hoy: " + Number(blue).toFixed(2) + " pesos argentinos.";
		
		// cambiar precios
		// ejemplo de: https://stackoverflow.com/questions/5338716/get-multiple-elements-by-id
		var elementos = document.getElementsByClassName("precio");
		var precio = '';
		for(var i = 0; i < elementos.length; i++) 
		{	
			//console.log(elementos[i].title); // precio en dolares pre cargado
			
			var precioARS = parseFloat(elementos[i].title) * blue; // precio en dolares * cotizacion blue
			precioARS = Math.ceil(precioARS)// como soy argento garca, redondedo para arriba
			
			//console.log(precioARS);
			
			elementos[i].innerHTML = "$ " + precioARS + " pesos (USD " + Number(elementos[i].title).toFixed(2) + ")" ;
		}		
	});

}


/*-----formulario contacto--*/
const $formulario= document.getElementById("formulario");
const $inputs= document.querySelectorAll("#formulario_input")

const expresiones= {
	nombre:     /^[a-zA-ZÀ-ÿ`\s`] {1,40}$/,
	email:    /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono:  /^\d {7,14}$/,
	sucursal:/^[a-zA-ZÀ-ÿ`\s`] {1,40}$/,
	comentario: /^[a-zA-ZÀ-ÿ`\s`] {1,40}$/
}
const campos={
	nombre:false,
	email:false,
	telefono:false,
	sucursal:false,
	comentario:false,
}
const validarFormulario = (e) =>{
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, "nombre");
		break;
		case"email":
		    validarCampo(expresiones.email, e.target, "email"); 
		break;
		case"telefono":
		    validarCampo(expresiones.telefono, e.target, "telefono"); 
		break;
		case"sucursal":
		    validarCampo(expresiones.sucursal, e.target, "sucursal"); 
		break;
		case"comentario":
		    validarCampo(expresiones.comentario, e.target, "comentario"); 
		break;

	}
}

const validarCampo = ( expresiones, input, campo)=>{
	if (expresiones.test (input.value)){
		document.getElementById(`grupo_${campo}`).classList.remove("formulario_grupo-incorrecto");
		document.getElementById(`grupo_${campo}`).classList.add("formulario_grupo-correcto");
		document.getElementById(`#grupo_${campo} i`).classList.remove(" fa-times-circle");
		document.getElementById(`#grupo_${campo} i`).classList.add("fa-check-circle");
		document.getElementById(`#grupo_${campo} .formulario_input-error`).classList.remove("formulario_input-error-activo");
		campos=[campo]=true;
		console.log("funciona");

	}else{
		document.getElementById(`grupo_${campo}`).classList.add(formulario_grupo-incorrecto);
		document.getElementById(`grupo_${campo}`).classList.remove("formulario_grupo-correcto");
		document.getElementById(`#grupo_${campo}i`).classList.add("fa-times-circle");
		document.getElementById(`#grupo_${campo}i`).classList.remove("fa-check-circle");
		document.getElementById(`#grupo_${campo} .formulario_input-error`).classList.add("formulario_input-error-activo");
		campos=[campo]=true;
		console.log("funciona");
	}

}

$inputs.forEach(( input) => {

	$inputs.addEventListener( "keyup", validarFormulario);
	$inputs.addEventListener( "blur", validarFormulario);

});

$formulario.addEventListener("submit", handleSubmit);

function handleSubmit(e){;
	e.preventDefault();
	
	const $terminos = document.getElementById("terminos");

	if (campos.nombre && campos.email && campos.telefono && campos.sucursal && campos.comentario && $terminos.checked) {
		document.getElementById("formulario_mensaje-exitoso").classList.add("formulario_mensaje-exitoso-activo");


		setTimeout(() => {
			document.getElementById("formulario_mensaje-exito").classList.remove("formulario_mensaje-exitoso-activo");
			document.getElementById("formulario_grupo-terminos").style.display = "none";


		}, 3000);

		document.querySelectorAll("formulario_grupo-correcto").each(functionformulario_grupo - correcto).forEach((icono) => {
			icono.classList.remove("formulario_grupo-correcto");
		});
		setTimeout(() => {
			location.reload();
		}, 3100);
	} else {
		document.getElementById("formulario_mensaje").classList.add("formulario_mensaje-activo");
	}
}
