let wallTextVisible = false;

$(window).click(function () {
  if (wallTextVisible) {
    showArtwork();
  } else {
    showWallText();
  }
});

function showArtwork() {
    $(".artwork").addClass("blur-out");
    $(".wall-text").addClass("fade-out");
    $(".artwork").removeClass("blur-in");
    $(".wall-text").removeClass("fade-in");
    wallTextVisible = !wallTextVisible;
}

function showWallText() {
    $(".artwork").addClass("blur-in");
    $(".wall-text").addClass("fade-in");
    $(".artwork").removeClass("blur-out");
    $(".wall-text").removeClass("fade-out");
    wallTextVisible = !wallTextVisible;
}

