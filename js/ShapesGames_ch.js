
	  var colors=["white","yellow", "Aqua", "Salmon","Blue", "Fuchsia", "SeaGreen","orange","BlueViolet","Silver", "red","purple","Chartreuse","DeepPink"];
	  var color_ind=0;;
	  var shapes=[];
	  var chains=[];
	  var score=0;
	  var longest_score=0;
	  var canvas = document.getElementById('myCanvas');
	  var context = canvas.getContext('2d');
	//  canvas.style.background="black";
	  var Start=true; // also for sound activation
	  var interv;
	  
	  var OneAddedSound = new sound("sounds/Ding.wav");
	  var MistakeSound= new sound("sounds/notification-alert-95.mp3");
	  var MoreAddedSound = new sound("sounds/correct-answer-bell-gliss-04.mp3");

function ActivateSounds()
{
	OneAddedSound.play(); //without that doesn't work on mobile
	OneAddedSound.stop();
	MistakeSound.play();
	MistakeSound.stop();
	MoreAddedSound.play();
	MoreAddedSound.stop();
}
	  
	  function shape(ct_x, ct_y,type){
		this.type=type;
		if(type=="rectangle")
		{
	      var measures=[19,24 ];
		   var measures=[19,19 ];
	      var ind=Math.floor(Math.random() * 2);
	      this.width=measures[ind];
	      switch(ind){
		     case 0: 
		      this.height=measures[1];
		      break;
		     case 1: 
		      this.height=measures[0];
		      break;
		   		   
	       }
	      this.height=ind==0?measures[1]:measures[0]; 
		}
		else if(type=="circle")
			this.r=12;
		
	    this.ct_x=ct_x;
		this.ct_y=ct_y;
	    this.clr=colors[0];
	    this.growing=true;	 
        this.chain=0;		
	  }
	  function chain(link1,link2)
	  {
		this.shapes=[]; 	
		this.shapes.push(link1);
		this.shapes.push(link2);
		this.length=2;
        color_ind=(color_ind+1)%colors.length;
        if(!color_ind)
			color_ind++;			
        this.clr = colors[color_ind];
		console.log(colors[color_ind]);	
	  }
	  
	   function redraw()
	  {
	     context.clearRect(0, 0, canvas.width, canvas.height);
         for (var i=0; i<shapes.length; i++)
    	  {
            context.beginPath();
			if (shapes[i].type=="circle")
		      DrawCircle(shapes[i]);
		   else if (shapes[i].type=="rectangle")
			   DrawRectangle(shapes[i]);
    	   }  
     }
	 
var PlaySounds=true;

function ToggleSound()
{
	PlaySounds=!PlaySounds;
	if(PlaySounds)
	{
		ActivateSounds();
		document.getElementById("sound-button").src="res/sound_mute.png";
	}
	else
		document.getElementById("sound-button").src="res/sound.png";
}
	
function sound(src)
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
		if(PlaySounds)
		{
		  this.sound.pause();
          this.sound.currentTime = 0;
          this.sound.play();
		}
    }
    this.stop = function(){
        this.sound.pause();
    }
}
	 