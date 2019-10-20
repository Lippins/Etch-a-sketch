function playEtchASketch (){

    const container = document.querySelector(".container");
    let box;
    let boxes;
    let userChoice;

    function createBoxes(num){
        let boxWidth = (450/num);
        for (i = 0; i< num ; i++){
            for (j = 0; j< num ; j++){
                box = document.createElement("div");
                box.style.width = `${boxWidth}px`;
                box.style.height = `${boxWidth}px`;
                container.appendChild(box);
                boxes = document.querySelectorAll(".container div");
            }  
        }
    }

    createBoxes(16);

    function defaultSketch(color = "black"){
        boxes.forEach((box)=>{
            box.addEventListener("mouseenter", ()=>{
                box.style.backgroundColor = color;
            });
        });
    }

    defaultSketch();

    function pickColor(){
        let selectColor = document.getElementById("pickColor");
        selectColor.addEventListener("click", ()=>{
            let userColorChoice = prompt("kindly Enter A Color Choice Or Hex Value");
            let formatUserChoice = userColorChoice.toLowerCase();
            defaultSketch(formatUserChoice)
        });
    }

    pickColor();

    function clearPad(){
        boxes.forEach((box)=>{
            box.style.backgroundColor = "white";
        });
    }

    function reset(){
        const resetPad = document.getElementById("reset");
        resetPad.addEventListener("click", ()=>{
            clearPad();
        });
    }

    reset();

    function removeBoxes(){
        container.innerHTML = "";
    }

    function redrawSketchPad(){
        const redrawPad = document.getElementById("redraw");
        redrawPad.addEventListener("click", ()=>{
            userChoice = parseInt(prompt("How many squares per side do you want to draw?"));
            if(userChoice < 2 || userChoice > 100){
                alert("Kindly enter a number between 2 and 100");
            } else{
                clearPad();
                removeBoxes();
                createBoxes(userChoice);
                defaultSketch();
            }
        });
    }

    redrawSketchPad();

   
    function generateRandomColor(){
        let generatedColor;
        let redValue = Math.floor((Math.random()*255) +1);
        let greenValue = Math.floor((Math.random()*255) +1);
        let blueValue = Math.floor((Math.random()*255) +1);
        
        generatedColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        return generatedColor;
    }

    function randomColorSketcher(){
        boxes.forEach((box) =>{
            box.addEventListener("mouseenter", ()=>{
                box.style.backgroundColor = `${generateRandomColor()}`;
            });
        });
    }

    function useRandomColorSketcher(){
        const randomColorPad = document.getElementById("random");
        randomColorPad.addEventListener("click", randomColorSketcher);
    }

    useRandomColorSketcher();

    
    function erase(){
        boxes.forEach((box) =>{
            box.addEventListener("mouseenter", ()=>{
                box.style.backgroundColor = "#FFFFFF";
            });
        });
    }

    function erasePad(){
        const eraser = document.getElementById("eraser");
        eraser.addEventListener("click", erase);
    }

    erasePad();

}

playEtchASketch();