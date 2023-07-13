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
        if (detections.multiHandLandmarks.length == 2) {
          p.drawFingerTips();
        }
      }
    }
  };

  p.drawFingerTips = function () {
    const INDEX_TIP_1 = detections.multiHandLandmarks[0][8];
    const INDEX_TIP_2 = detections.multiHandLandmarks[1][8];

    const INDEX1 = p.createVector(
      p.width - INDEX_TIP_1.x * p.width,
      INDEX_TIP_1.y * p.height,
      INDEX_TIP_1.z
    );

    const INDEX2 = p.createVector(
      p.width - INDEX_TIP_2.x * p.width,
      INDEX_TIP_2.y * p.height,
      INDEX_TIP_2.z
    );

    const INDEX_TIP_DISTANCE = INDEX1.dist(INDEX2)

    const INDEX_TIP_MIDPOINT = INDEX1.lerp(INDEX2, 0.5);

    if (INDEX_TIP_DISTANCE < 15) {
        p.noFill();
        p.stroke(0, 255, 0);
        p.ellipse(INDEX_TIP_MIDPOINT.x, INDEX_TIP_MIDPOINT.y, 20);
        
        // toggleWallText();
      } else {
        // toggleWallText();
      }
  };

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
        p.ellipse(selectPointVector.x, selectPointVector.y, clickedCounter / 4);
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



// show or hide wall text
let wallTextVisible = false;

// $(window).click(function () {
//   if (wallTextVisible) {
//     showArtwork();
//   } else {
//     showWallText();
//   }
// });


function showWallText() {
    $(".artwork").addClass("blur-in");
    $(".wall-text").addClass("fade-in");
    $(".artwork").removeClass("blur-out");
    $(".wall-text").removeClass("fade-out");
    wallTextVisible = !wallTextVisible;
}

function hideWallText() {
    $(".artwork").addClass("blur-out");
    $(".wall-text").addClass("fade-out");
    $(".artwork").removeClass("blur-in");
    $(".wall-text").removeClass("fade-in");
    wallTextVisible = !wallTextVisible;
}