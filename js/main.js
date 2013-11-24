$(document).ready(function()
{
  $('#desc-button').click(function () {
    if ($('#desc').css('opacity') === '0') {
      $('#profile').addClass('translate');
      $('#desc').addClass('fade-in');
    }
  })
});
