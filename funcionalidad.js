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