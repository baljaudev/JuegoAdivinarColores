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
	//highlight button to show seleccionado
	botonDificil.classList.remove("seleccionado");
	botonFacil.classList.add("seleccionado");
	//set number of cuadrados to 6
	numCuadrados = 6;
	//change colores to 6
	colores = generarColoresAlea(numCuadrados);
	//reset winning color
	colorElegido = generarAlea();
	//change display to show new picked color
	colorMostrado.textContent = colorElegido;
	//loop through 6 cuadrados and reset colores while displaying none for cuadrados without new reset colores
	for(let i = 0; i < cuadrados.length; i++){
		if(colores[i]){
			cuadrados[i].style.background = colores[i];
		} else {
			cuadrados[i].style.display = "none";
		}
	}
	
});

botonDificil.addEventListener("click", function(){
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
	gameOverClear();
});

botonReset.addEventListener("click", function(){
	//generate all new colores
	colors = generarColoresAlea(numCuadrados);
	//pick a new random color from listaay
	colorElegido = generarAlea();
	//change colorMostrado to match picked color
	colorMostrado.textContent = colorElegido;
	botonReset.textContent = "Nuevos colores";
	mensajeMostrado.textContent = "";
	//change colores of cuadrados
	for(let i = 0; i < cuadrados.length; i++){
		cuadrados[i].style.backgroundColor = colores[i];
	}
	//set winning color highlight back to default
	h1.style.background = "steelblue"; 
	gameOverClear();
	
})

colorMostrado.textContent = colorElegido;
let intentos = 0;
for(let i = 0; i < cuadrados.length; i++) {
	//add initial colores to cuadrados
	cuadrados[i].style.backgroundColor = colores[i];
	//letiable para los intentos
	//let intentos = 0;
	//add click listeners to cuadrados
	cuadrados[i].addEventListener("click", function(){
		//grab color of clicked square
		let clickedColor = this.style.backgroundColor;
		//compare color to colorElegido
		console.log(clickedColor, colorElegido);
		if(clickedColor === colorElegido){
			mensajeMostrado.textContent = "¡Correcto!";
			botonReset.textContent = "Jugar otra vez";
			cambiarColores(clickedColor);
			h1.style.background = clickedColor;
		}	else {
			this.style.backgroundColor = "#232323";
			mensajeMostrado.textContent = "Intentar de nuevo";
			intentos++;
			if(intentos == 3){ //si se han acumulado 3 intentos
				mensajeMostrado.textContent = "¡Perdiste!";
				cambiarColores("#232323"); //pone en negro todos los cuadrados
				gameOver();
				intentos = 0; //reiniciar intentos para próxima partida
			}
		}
		});
}

function gameOver(){
    let gameOver= document.getElementById("game-over");
	gameOver.style.display= "block";
}

function gameOverClear(){
    let gameOver= document.getElementById("game-over");
	gameOver.style.display= "none";
}

function cambiarColores(color){
	//loop through all cuadrados
	for(let i = 0; i < cuadrados.length; i++){
		//change each color to match given color
		cuadrados[i].style.background = color;
	}	
}

function generarAlea(){
	//pick a random number
	let aleatorio = Math.floor(Math.random() * colores.length)
	return colores[aleatorio];
}

function generarColoresAlea(genColor){
	//make an listaay
	let lista = []
	//repeat num times
	for(let i = 0; i < genColor; i++){
	// get aleatori color and push into listaay
		lista.push(colorAlea())
	}
	//return that listaay
	return lista;
}

function colorAlea(){
	//pick a "red" from 0 - 255
	let r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	let g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0 - 255
	let b = Math.floor(Math.random() * 256);
	return "rgb(" + r +", " + g +", " + b +")";
}