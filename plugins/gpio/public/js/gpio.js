/**
 * GPIO on/off toggles
 */
function iGpioToggle() {
  var button = $(this);
  button.parent().children('input').attr('value', button.attr('data-value'));
}
$('button.gpio.toggle').unbind('click.toggle', iGpioToggle);
$('button.gpio.toggle').bind('click.toggle', iGpioToggle);

require([ "jquery", "/socket.io/socket.io.js" ], function() {

  var socket = io.connect();

  /**
   * GPIO input change
   */
  socket.on('gpio-input', function(data) {
    $('.gpiostatus[data-id="' + data.id + '"]').addClass('hide');
    $('.gpiostatus[data-id="' + data.id + '"][data-value="' + data.value + '"]').removeClass('hide');
  });

  /**
   * GPIO output change
   */
  socket.on('gpio-output', function(data) {
    $('button[data-id="' + data.id + '"]').removeClass('active');
    $('button[data-id="' + data.id + '"][data-value="' + data.value + '"]').addClass('active');
  });
});
