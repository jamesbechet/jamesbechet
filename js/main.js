$(document).ready(function()
{
  $('#desc-button').click(function () {
    if ($('#desc').css('opacity') === '0') {
      $('#profile').addClass('translate');
      $('#desc').addClass('fade-in');
      $('nav#menu a:nth-child(2)').addClass('active');
    }
  })

  function doOnOrientationChange()
  {
    switch (window.orientation) 
    {  
      case -90:
      case 90: // Landscape
        $('#desc').hasClass('fade-in') && $('#desc').removeClass('fade-in');
        $('nav#menu a:nth-child(2)').hasClass('fade-in') && $('#desc').removeClass('fade-in');

        break; 
      default: // Portrait
        $('#profile').hasClass('translate') && $('#profile').removeClass('translate');
        break; 
    }
  }
  window.addEventListener('orientationchange', doOnOrientationChange);

});
