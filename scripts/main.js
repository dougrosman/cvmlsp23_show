let links = document.getElementsByClassName("work-link");
let clickedCounter = 4;

let sketch = function (p) {
  let font;

  p.preload = function () {
    font = p.loadFont("fonts/Poppins-Medium.ttf");
  };

  p.setup = function () {
    p.createCanvas(cam_w, cam_h, p.WEBGL);
    p.setAttributes({ alpha: true });
    p.textFont(font);
    p.textSize(12);
    p.pixelDensity(1);
  };

  p.draw = function () {
    p.clear(0);
    p.translate(-p.width / 2, -p.height / 2);

    if (detections != undefined) {
      if (detections.multiHandLandmarks != undefined) {
        p.drawHands();
      }
    }
  };

  const debug = true;

  p.drawHands = function () {
    //   p.stroke(0);
    p.strokeWeight(4);

    if (debug) {
      for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
        for (let j = 0; j < detections.multiHandLandmarks[i].length; j++) {
          const currentPoint = detections.multiHandLandmarks[i][j];
          p.stroke(0, 0, 255);
          const currentPointVector = p.createVector(
            p.width - currentPoint.x * p.width,
            currentPoint.y * p.height,
            currentPoint.z
          );

          p.point(
            currentPointVector.x,
            currentPointVector.y,
            currentPointVector.z
          );
        }
      }
    }

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

      p.stroke(255, 0, 0);
      p.point(INDEX.x, INDEX.y, INDEX.z);
      p.point(THUMB.x, THUMB.y, THUMB.z);
      const FINGER_DISTANCE = THUMB.dist(INDEX);

      p.stroke(0, 255, 0);

      const selectRatioX = p.windowWidth / cam_w;
      const selectRatioY = p.windowHeight / cam_h;

      const selectPointVector = THUMB.lerp(INDEX, 0.5);
      const selectPoint = {
        x: selectPointVector.x * selectRatioX,
        y: selectPointVector.y * selectRatioY,
      };
      // p.strokeWeight(4 + (clickedCounter/5));
      //p.imageMode(p.CENTER);
      p.noFill();
      p.ellipse(
        selectPointVector.x,
        selectPointVector.y,
        3 + clickedCounter / 4
      );
      // p.text(
      //   `${Math.floor(selectPoint.x)}, ${Math.floor(selectPoint.y)}`,
      //   selectPointVector.x,
      //   selectPointVector.y,
      //   selectPointVector.z
      //   );
      if (FINGER_DISTANCE < 15) {
        fingerSelect(selectPoint);
      } else {
        fingerDeSelect();
      }
    }
  };
};

// window.addEventListener("mousemove", function(){
// })

let clickedLink = "";

let myp5 = new p5(sketch);

// brute force hover effect with mouse
window.addEventListener("mousemove", function (e) {
  links.forEach((link) => {
    const linkBox = link.getBoundingClientRect();
    if (
      e.clientX > linkBox.x &&
      e.clientX < linkBox.x + linkBox.width &&
      e.clientY > linkBox.y &&
      e.clientY < linkBox.y + linkBox.height
    ) {
      link.style.filter = "contrast(10)";
      const currentLink = link.getAttribute("href");
      //window.location.href = "placeholder";
    } else {
      link.style.filter = "unset";
    }
  });
});

// brute force links with javascript
window.addEventListener("click", function (e) {
  links.forEach((link) => {
    const linkBox = link.getBoundingClientRect();
    if (
      e.clientX > linkBox.x &&
      e.clientX < linkBox.x + linkBox.width &&
      e.clientY > linkBox.y &&
      e.clientY < linkBox.y + linkBox.height
    ) {
      
      window.location.href = "placeholder";
    } else {
      link.style.filter = "unset";
    }
  });
});

function fingerSelect(selectPoint) {
  links.forEach((link) => {
    const linkBox = link.getBoundingClientRect();
    if (
      selectPoint.x > linkBox.x &&
      selectPoint.x < linkBox.x + linkBox.width &&
      selectPoint.y > linkBox.y &&
      selectPoint.y < linkBox.y + linkBox.height
    ) {
      link.style.filter = "contrast(10)";
      const currentLink = link.getAttribute("href");

      if (currentLink != clickedLink) {
        clickedCounter = 4;
        clickedLink = currentLink;
      } else {
        clickedCounter += 4;
      }

      if (clickedCounter > 360) {
        window.location.href = "placeholder";

        clickedCounter = 4;
      }

      // console.log(clickedCounter++);
    } else {
      link.style.filter = "unset";
    }
  });
}

function fingerDeSelect() {
  links.forEach((link) => {
    link.style.filter = "unset";
  });
  clickedCounter = 0;
  clickedLink = "";
}

// //mouse debug
//   window.addEventListener("mousemove", (e) => {

//     const mousePos = { x: e.clientX, y: e.clientY };
//     // console.log(mousePos)

//     links.forEach((link) => {

//         // console.log(link.getBoundingClientRect());

//         const linkBox = link.getBoundingClientRect();

//         if(mousePos.x > linkBox.x &&
//            mousePos.x < linkBox.x + linkBox.width &&
//            mousePos.y > linkBox.y &&
//            mousePos.y < linkBox.y + linkBox.height
//         ) {
//             console.log(link.innerHTML);
//             link.style.border = '4px solid rgb(0, 255, 0)';
//         } else {
//             link.style.border = 'none';
//         }

//         // check if mouse position is in bounding box
//         // if(mousePos.x)

//     })

// })
