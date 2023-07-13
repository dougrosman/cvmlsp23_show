// Hand detection with mediapipe
// https://google.github.io/mediapipe/solutions/hands.html
// Adapted from "Multiple Hands Detection in p5.js" by Kazuki Umeda (https://www.youtube.com/watch?v=BX8ibqq0MJU)

let sketch = function(p) {

  let treeone;
  let TEETH;
  let ty;
  let font;
  let img;

  p.preload = function() {
    font = p.loadFont("Poppins-Medium.ttf");
    treeone = p.loadModel('treeone.obj');
    TEETH = p.loadModel('TEETH.obj');
    ty = p.loadModel('ty.obj');
    img = loadImage('chrys.png');

  }

  p.setup = function() {
    p.createCanvas(cam_w, cam_h, p.WEBGL);
    p.setAttributes({alpha: true})
    p.textFont(font);
    p.textSize(16)
  }

  p.draw = function() {
    p.clear(0);
    p.translate(-p.width/2, -p.height/2);

    if(detections != undefined) {
      if(detections.multiHandLandmarks != undefined) {
        p.drawHands();
      }
    }
  }

  p.drawHands = function() {
    p.stroke(0);
    p.strokeWeight(8);

   // for(let i = 0; i < detections.multiHandLandmarks.length; i++) { 
     // p.fill(255, 0, 255);
      // p.ellipse(p.width-(INDEX_FINGER.x * p.width), INDEX_FINGER.y * p.height, 40, 40);
   //  p.push()
   // p.translate(p.width-(THUMB.x * p.width), THUMB.y * p.height,0);
    // p.scale(5);
   //  p.model(treeone);
   //  p.pop()

   const myHandPoints = [4, 8, 12, 16, 20, 0];


    for(let i = 0; i < detections.multiHandLandmarks.length; i++) { 
      const THUMB = detections.multiHandLandmarks[i][4];
      const INDEX_FINGER = detections.multiHandLandmarks[i][8];
      const MIDDLE_FINGER = detections.multiHandLandmarks[i][12];
      const RING_FINGER = detections.multiHandLandmarks[i][16];
      const PINKY_FINGER = detections.multiHandLandmarks[i][20];
      const WRISTY = detections.multiHandLandmarks[i][0];


   
      p.fill(255, 0, 255);

      p.push()
      p.translate(p.width-(THUMB.x * p.width), THUMB.y * p.height,0);
      p.scale(5);
      p.normalMaterial();
      p.model(treeone);
      p.pop();

      p.push()
      p.translate(p.width-(INDEX_FINGER.x * p.width), INDEX_FINGER.y * p.height,0);
      p.scale(5);
      p.normalMaterial();
      p.model(treeone);
      p.pop();

      p.push()
      p.translate(p.width-(MIDDLE_FINGER.x * p.width), MIDDLE_FINGER.y * p.height,0);
      p.scale(5);
      p.normalMaterial();
      p.model(treeone);
      p.pop();

      p.push()
      p.translate(p.width-(RING_FINGER.x * p.width), RING_FINGER.y * p.height,0);
      p.scale(5);
      p.normalMaterial();
      p.model(treeone);
      p.pop();

      p.push()
      p.translate(p.width-(PINKY_FINGER.x * p.width), PINKY_FINGER.y * p.height,0);
      p.scale(5);
      p.normalMaterial();
      p.model(treeone);
      p.pop();

      p.push()
      p.translate(p.width-(WRISTY.x * p.width), WRISTY.y * p.height,0);
      p.scale(9);
      p.normalMaterial();
      p.rotateX(90);
      p.model(treeone);
      p.pop();




      for(let j = 0; j < detections.multiHandLandmarks[i].length; j++) {

        const x = p.width-(detections.multiHandLandmarks[i][j].x * p.width);
        const y = detections.multiHandLandmarks[i][j].y * p.height;
        const z = detections.multiHandLandmarks[i][j].z;
        
        p.strokeWeight(2);
       // p.texture(img);
        //triangle(x1, y1, x2, y2, x3, y3)
      
        

     // p.text(z.toFixed(3), x, y, z);
      p.fill(0,255,255);
      p.text('TE$T', x, y, z);
      p.textSize(15);


        // 1calculate how far the hand is from the camera by calculating the distance between keypoints 9 and 13 (base of middle and ring finger)
        if(j == 9 || j == 13) {
          const palm1 = detections.multiHandLandmarks[0][9]
          const palm2 = detections.multiHandLandmarks[0][13]
      
          const palm1Pos = p.createVector(palm1.x, palm1.y);
          const palm2Pos = p.createVector(palm2.x, palm2.y);
      
          const distance = palm1Pos.dist(palm2Pos)
      
          console.log(distance);
        }
         
      }
    }
  }
}

let myp5 = new p5(sketch)