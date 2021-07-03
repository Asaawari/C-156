AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },    
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 120;
    const timerE1 = document.querySelector("#timer");
    this.startTimer(duration,timerE1)
  },

  startTimer : function(duration,timerE1){
    setInterval(()=>{
      if(duration>=0){
        minutes = parseInt(duration/60);
        seconds=parseInt(duration%60);
  
        if(minutes <10){
          minutes = "0" + minutes;
        }
  
        if(seconds <10){
          seconds = "0" + seconds;
        }
  
        timerE1.setAttribute("text",{
          value:minutes + ":" + seconds,
        });
  
        duration -= 1;
      }else{
        this.gameOver()
      }      
    },1000)
  },

  updateTargets : function(){
    const element = document.querySelector("#targets");
    var count = element.getAttribute("text").value
    let currentTargets = parseInt(count)
    currentTargets -= 1
    element.setAttribute("text",{
      value:currentTargets
    });
  },

  updateScore : function(){
    const element = document.querySelector("#score");
    var count = element.getAttribute("text").value
    let currentScore = parseInt(count)
    currentScore += 50
    element.setAttribute("text",{
      value:currentScore
    });
  },

  gameOver : function(){
    var planeE1 = document.querySelector("#plane_model")
    var element = document.querySelector("#gameovertext")
    element.setAttribute("visible", "true")
    planeE1.setAttribute("dynamic-body", {mass:1})
  },

  isCollided: function (elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        element.setAttribute("visible","false")
        this.updateScore()
        this.updateTargets()
      } else {
        this.gameOver()
      }
    });
  },
  
});
