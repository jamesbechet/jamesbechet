window.onscroll = function () {
  var s = window.scrollY;

  if (s < 300) {
    opacity = (s / 150.0);
    document.getElementsByClassName('blur')[0].style.opacity = opacity;
  }
}