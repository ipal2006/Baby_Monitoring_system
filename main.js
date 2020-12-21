img="";
status="";
song = "";
object=[];
function preload()
{
   song= loadSound('alert-tone.mp3');
   img = loadImage('baby.jpeg');
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    dectector_of_object = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Is Loaded");
    status=true;
    
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    object=results;
    
}
function draw()
{ 
    image(video,0,0,650,450);
    if(status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        dectector_of_object.detect(video,gotResult);
        for (i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML="Object Detected";
            
            
            percent= floor(object[i].confidence*100);
            
            if(object[i].label=="person")
            {
                document.getElementById("person_dectection").innerHTML = "Baby Detected";
                song.stop();
            }
            else{
                document.getElementById("person_dectection").innerHTML = " Baby Not Detected";
                song.play();
                song.setVolume(0.2);
                song.rate(1);
            }  
            
        }
    }
    else if(status ="")
    {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }
    
}