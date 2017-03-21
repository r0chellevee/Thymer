$(document).ready(function() {

  var clocks = [];

  var stepTime = parseInt($(this).find('.mins').text());
  var totalTime = parseInt($(this).find('.total-time').text());

  var secondise = function(mins) {
    return mins * 60;
  }

  clocks.push($('.total-cook').FlipClock(secondise(totalTime), {
        clockFace: 'HourlyCounter',
        countdown: true,
        autoStart: true
    }));

  clocks.push($('.step-time').FlipClock(secondise(stepTime), {
        clockFace: 'MinuteCounter',
        autoStart: true,
        countdown: true
    }));

});
