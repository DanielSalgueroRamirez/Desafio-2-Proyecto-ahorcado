var palabras = ['MADRID', 'LONDRES', 'PARIS','BOGOTA', 'MEDELLIN'];
var tablero = document.getElementById('horca').getContext('2d');
var letras = [];
var palabraCorrecta = "";
var errores = 0;

function escojerPalabraSecreta(){
    var palabra = palabras[Math.floor(Math.random()*palabras.length)];
    palabraSecreta = palabra;
    console.log(palabra);
    return palabra;
}

function dibujarLineas(){
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.strokeStyle = "#0A3871";
    tablero.beginPath()

    var ancho = 600 / palabraSecreta.length;
    for(let i = 0; i < palabraSecreta.length; i++){
        tablero.moveTo(500 + (ancho * i), 640);
        tablero.lineTo(550 + (ancho * i), 640);

    }

    tablero.stroke();
    tablero.closePath();
}
dibujarLineas(escojerPalabraSecreta());

function escribirLetraCorrecta(index){
    tablero.font = 'bold 52px Inter';
    tablero.lineWidth = 'round';
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.strokeStyle = "#0A3871";

    var ancho = 600 / palabraSecreta.length;
    tablero.fillText(palabraSecreta[index], 505 + (ancho * index), 620);

}

function escribirLetraIncorrecta(letra, errorsLeft){
    tablero.font = 'bold 40px Inter';
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.strokeStyle = "#0A3871";
    tablero.fillText(letra, 535 + (40 * (10 - errorsLeft)), 710, 40)

}

function verificarLetraClicada(key){
    if (letras.length < 1 || letras.indexOf(key) < 0){
        letras.push(key);
        return false;
    }
    else{
        letras.push(key);
        return true;
    }
}

function adicionarLetraCorrecta(i){
    palabraCorrecta += palabraSecreta[i].toUpperCase();
}


function adicionarLetraIncorrecta(letter){
    if(palabraSecreta.indexOf(letter) <= 0){
        errores += 1;
        
    }
}

    document.onkeydown = (e) => {
        let letra = e.key.toUpperCase();
        if(!verificarLetraClicada(e.key)){
            if(palabraSecreta.includes(letra)){
                console.log(letra);
                adicionarLetraCorrecta(palabraSecreta.indexOf(letra));
                for (let i = 0; i < palabraSecreta.length; i++){
                    if(palabraSecreta[i] === letra){
                        escribirLetraCorrecta(i); 
                        //---------------------------------------------------------
                        console.log([...new Set(palabraSecreta)].length);
                        console.log(palabraCorrecta.length);
                
                        
                        if([...new Set(palabraSecreta)].length == palabraCorrecta.length){
                            console.log("ganaste");
                            document.onkeydown = false;
                            document.getElementById('caja-botones2').style.display = 'block';
                        }
                        //------------------------------------------------------
                    }


                    
                }
            }
            else{
                if(!verificarLetraClicada(e.key)) return
                adicionarLetraIncorrecta(letra);
                escribirLetraIncorrecta(letra, errores);
                console.log("Errores= " + errores);
                

                const source = `${errores}.png`;
                imagen.src = source;

                if(errores == 7){
                    document.onkeydown = false;
                    document.getElementById('caja-botones').style.display = 'block';
                    document.getElementById('titulo-perdiste').innerHTML = "PERDISTE!! la palabra era " + palabraSecreta;
                }

               
                
            }
        }
    }
    