document.addEventListener('DOMContentLoaded', () => {
    const SQUARES = document.querySelectorAll('.grid div');
    const SCOREDISPLAY = document.querySelector('span');
    const STARTBTN = document.querySelector('.start');

    const WIDTH = 10;
    let currentIndex = 0;  // Primeira div do Grid
    let appleIndex = 0;  // Primeira div do Grid
    let currentSnake = [2,1,0]; // Corpo da snake = 2 cabeça, 0 rabo
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;


    // Função para Iniciar e Reiniciar o jogo
    function startGame(){
        currentSnake.forEach(index => SQUARES[index].classList.remove('snake'));
        SQUARES[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        SCOREDISPLAY.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => SQUARES[index].classList.add('snake'));
        interval = setInterval(moveOutComes, intervalTime);
    }

    // Função para lidar com os outcomes 
    function moveOutComes(){

        
    // Função para quando Snake bate na borda ou em si mesma
        if (
            (currentSnake[0] + WIDTH >= (WIDTH * WIDTH) && direction === WIDTH) || // se bater em baixo
            (currentSnake[0] % WIDTH === WIDTH - 1 && direction === 1) || // se bater na parede da direita
            (currentSnake[0] % WIDTH === 0 && direction === -1) || // se bater na esquerda
            (currentSnake[0] - WIDTH < 0 && direction === -WIDTH) || // se bater no teto
            SQUARES[currentSnake[0] + direction].classList.contains('snake') // se bater em si mesma
        ) {
            alert("Game over!");
            return clearInterval(interval);
        };

        const TAIL = currentSnake.pop(); // Remove do Array e mostra
        SQUARES[TAIL].classList.remove('snake'); // remove classe 'snake' da TAIL
        currentSnake.unshift(currentSnake[0] + direction); //da direção pra cobra da snake
    
        // Função para quando Snake pega maçã
        if(SQUARES[currentSnake[0]].classList.contains('apple')){
            SQUARES[currentSnake[0]].classList.remove('apple');
            SQUARES[TAIL].classList.add('snake');
            currentSnake.push(TAIL);
            randomApple()
            score++;
            SCOREDISPLAY.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutComes,intervalTime);
        }
        SQUARES[currentSnake[0]].classList.add('snake');

    }

    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * SQUARES.length)
        }while(SQUARES[appleIndex].classList.contains('snake'))
        SQUARES[appleIndex].classList.add('apple');
    }

    // Função para os controles da snake
    function control(e){
        SQUARES[currentIndex].classList.remove('snake'); // Remove a class 'snake' de todos os quadrados
        if(e.keyCode === 39){
            direction = 1;              // Seta pra direita faz snake ir para a direita um quadrado
        } else if(e.keyCode === 38){
            direction = -WIDTH;         // Seta para cima faz snake voltar dez divs (ela vai pra cima)
        } else if(e.keyCode === 37){
            direction = - 1;              // Seta para esquerda faz snake ir para a esquerda um quadrado
        } else if(e.keyCode === 40){
            direction = +WIDTH;         // Seta para baixo faz snake aparecer 10 divs de onde estava antes
        }
    }

    document.addEventListener('keyup', control);
    STARTBTN.addEventListener('click', startGame);
})