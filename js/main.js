$(document).ready(function()
{
  function doOnOrientationChange()
  {
    switch (window.orientation) 
    {  
      case -90:
      case 90: // Landscape
        break; 
      default: // Portrait
        break; 
    }
  }
  window.addEventListener('orientationchange', doOnOrientationChange);

});
