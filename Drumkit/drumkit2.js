
document.addEventListener("keypress", function(event) { 
    sound(event.key); 
    animation(event.key); 
  }); 
  
  function sound(key) { 
      switch (key) { 
        case "q": 
          var sound1 = new Audio("sounds/boom.wav"); 
          sound1.play(); 
          break; 
      
        case "w": 
          var sound2 = new Audio("sounds/clap.wav"); 
          sound2.play(); 
          break; 
      
        case "e": 
          var sound3 = new Audio('sounds/hihat.wav'); 
          sound3.play(); 
          break;
      
        case "r": 
          var sound4 = new Audio('sounds/kick.wav'); 
          sound4.play(); 
          break; 
      
        case "t": 
          var sound5 = new Audio('sounds/openhat.wav'); 
          sound5.play(); 
          break; 
      
        case "y": 
          var sound6 = new Audio('sounds/ride.wav'); 
          sound6.play(); 
          break; 
      
        case "u": 
          var sound7 = new Audio('sounds/snare.wav'); 
          sound7.play(); 
          break; 
  
        case "i": 
          var sound7 = new Audio('sounds/tink.wav'); 
          sound7.play(); 
          break; 
          
        case "o": 
          var sound7 = new Audio('sounds/tom.wav'); 
          sound7.play(); 
          break; 
      
        default: console.log(key); 
      } 
    } 