// BEHAVIOR FOR EACH PAGE

// DETECT HANDS FOR FINGER PINCH

// DETECT HANDS FOR FINGERS TOUCHING

let clickedCounter = 0;

let sketch = function (p) {
  p.setup = function () {
    p.createCanvas(cam_w, cam_h, p.WEBGL);
    p.setAttributes({ alpha: true });
    p.pixelDensity(1);
  };

  p.draw = function () {
    p.clear(0);
    p.translate(-p.width / 2, -p.height / 2);

    if (detections != undefined) {
      if (detections.multiHandLandmarks != undefined) {
        p.drawHands();
        p.drawFingerTips();
      }
    }
  };

  p.drawFingerTips = function() {
    
  }

  p.drawHands = function () {
    p.strokeWeight(4);

    for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
      const THUMB_TIP = detections.multiHandLandmarks[0][4];

      const THUMB = p.createVector(
        p.width - THUMB_TIP.x * p.width,
        THUMB_TIP.y * p.height,
        THUMB_TIP.z
      );

      const INDEX_FINGER_TIP = detections.multiHandLandmarks[0][8];

      const INDEX = p.createVector(
        p.width - INDEX_FINGER_TIP.x * p.width,
        INDEX_FINGER_TIP.y * p.height,
        INDEX_FINGER_TIP.z
      );

      
      const FINGER_DISTANCE = THUMB.dist(INDEX);

      const selectPointVector = THUMB.lerp(INDEX, 0.5);
      
      if (FINGER_DISTANCE < 15) {
          p.noFill();
          p.stroke(0, 255, 0);
          p.ellipse(
            selectPointVector.x,
            selectPointVector.y,
            clickedCounter / 4
          );
        clickedCounter += 4;

        if (clickedCounter > 300) {
          window.location.href = "../../index.html";

          clickedCounter = 0;
        }
      } else {
        clickedCounter = 0;
        clickedLink = "";
      }
    }
  };
};

// window.addEventListener("mousemove", function(){
// })

let myp5 = new p5(sketch);


