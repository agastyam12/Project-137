status = "";
objects = [];
function setup(){
    canvas = createCanvas(330, 290);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(330 , 290);
    video.hide();
}


function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
   console.log("Model Loaded !");
   status = true;
}
function draw(){
    image(video , 0 , 0, 330, 290); 
    if(status != "") {
        percent = floor(objects.length * 100);
        objectDetector.detect(video , gotResult);
        for(i = 0 ; i > objects.length ; i++){
            fill(255, 0 , 0);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke();
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
    
    
}

function gotResult(results , error){
          if(error){
              console.log(error);
          }
          else{
              console.log(results);
              objects = results;
          }
}