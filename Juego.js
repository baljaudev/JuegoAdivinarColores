//Declaración de variables
let numCuadrados = 9;
let colores = generarColoresAlea(numCuadrados);
let cuadrados = document.querySelectorAll(".square");
let colorElegido = generarAlea();
let colorMostrado = document.querySelector("#colorMostrado");
let mensajeMostrado = document.querySelector("#mensajeMostrado");
let h1 = document.querySelector("h1");
let botonReset = document.querySelector("#reset");
let botonFacil = document.querySelector("#botonFacil");
let botonDificil = document.querySelector("#botonDificil");


botonFacil.addEventListener("click", function(){
	//Resaltar el botón para indicar que está seleccionado
	botonDificil.classList.remove("seleccionado");
	botonFacil.classList.add("seleccionado");
	//Cambiar el número de cuadrados; 6 para el nivel fácil
	numCuadrados = 6;
	//Generar nuevos colores RGB
	colores = generarColoresAlea(numCuadrados);
	//Elegir un nuevo color aleatorio RGB
	colorElegido = generarAlea();
	//Mostrar el nuevo color en el HTML
	colorMostrado.textContent = colorElegido;
	//Iterar sobre los 6 cuadrados y cambiar el color a cada uno de ellos
	for(let i = 0; i < cuadrados.length; i++){
		if(colores[i]){
			cuadrados[i].style.background = colores[i];
		} else {
			cuadrados[i].style.display = "none";
		}
	}
});

botonDificil.addEventListener("click", function(){
	//Resaltar el botón, será el modo de juego preseleccionado, según puesto en el HTML
	botonFacil.classList.remove("seleccionado");
	botonDificil.classList.add("seleccionado");
	numCuadrados = 9;
	colores = generarColoresAlea(numCuadrados);
	colorElegido = generarAlea();
	colorMostrado.textContent = colorElegido;
	for(let i = 0; i < cuadrados.length; i++){
		cuadrados[i].style.backgroundColor = colores[i];
		cuadrados[i].style.display = "block";
	}
});

botonReset.addEventListener("click", function(){
	colores = generarColoresAlea(numCuadrados);
	colorElegido = generarAlea();
	colorMostrado.textContent = colorElegido;
	botonReset.textContent = "Nuevos colores";
	mensajeMostrado.textContent = "";
	for(let i = 0; i < cuadrados.length; i++){
		cuadrados[i].style.backgroundColor = colores[i];
	}
	//poner el color ganador a su color original
	h1.style.background = "steelblue"; 
})

colorMostrado.textContent = colorElegido;
let intentos = 0;
for(let i = 0; i < cuadrados.length; i++) {
	//Rellena los cuadarados con colores aleatorios
	cuadrados[i].style.backgroundColor = colores[i];
	//Añade un evento click a cada cuadrado
	cuadrados[i].addEventListener("click", function(){
		//Coge el color del cuadrado que se ha pulsado
		let clickedColor = this.style.backgroundColor;
		//Compara ese color con colorElegido
		console.log(clickedColor, colorElegido);
		if(clickedColor === colorElegido){
			mensajeMostrado.textContent = "¡Correcto!";
			botonReset.textContent = "Jugar otra vez";
			//Si es igual, cambia el color de todos los cuadrados a colorElegido
			cambiarColores(clickedColor);
			//Pone el color ganador en el h1
			h1.style.background = clickedColor;
		}	else {
			//Si no es igual, cambia el color del cuadrado para que desaparezca
			this.style.backgroundColor = "#232323";
			mensajeMostrado.textContent = "Intentar de nuevo";
			intentos++;
			 //Si se han acumulado 3 intentos, cambia el color de todos los cuadrados
			if(intentos == 3){
				mensajeMostrado.textContent = "¡Perdiste!";
				cambiarColores("#232323");
				//Reinicia el contador de intentos
				intentos = 0;
			}
			}
		});
}

function cambiarColores(color){
	//Itera sobre los cuadrados y cambia el color al pasado por parámetro
	for(let i = 0; i < cuadrados.length; i++){
		cuadrados[i].style.background = color;
	}	
}

function generarAlea(){
	let aleatorio = Math.floor(Math.random() * colores.length)
	return colores[aleatorio];
}

function generarColoresAlea(genColor){
	//Crea un array
	let lista = []
	//Repite las veces necesarias 6 ó 9 veces
	for(let i = 0; i < genColor; i++){
	//Añade un color aleatorio a la lista
		lista.push(colorAlea())
	}
	return lista;
}

function colorAlea(){
	//Genera 3 números aleatorios entre 0 y 255
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return "rgb(" + r +", " + g +", " + b +")";
}