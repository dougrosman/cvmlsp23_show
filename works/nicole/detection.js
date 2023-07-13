let detections = {};
const videoElement = document.getElementsByClassName("input_video")[0];

// dimensions you can try:
// vertical (these might not work because webcams don't often support verical dimensions but it's worth a try)

// cam_w cam_h
// 180 x 320
// 240 x 320
// 360 x 640
// 480 x 640
// 540 x 960
// 720 x 1280

// horizontal (these should all work, but might be slightly lower quality if using a vertical monitor)

// cam_w cam_h
// 320 x 180
// 640 x 360
// 960 x 540
// 1280 x 720

const cam_w = 1280; // 1280
const cam_h = 720; // 720

function gotHolistic(results) {
  detections = results;
}

const holistic = new Holistic({
  locateFile: (file) => {
    return `models/holistic/${file}`;
  },
});

holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  smoothSegmentation: true,
  refineFaceLandmarks: false,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
holistic.onResults(gotHolistic);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await holistic.send({ image: videoElement });
  },
  width: cam_w,
  height: cam_h,
});
camera.start();
