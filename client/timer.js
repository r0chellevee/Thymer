$(document).ready(function() {
  console.log('wee')

  var clocks = [];

  var stepTime = parseInt($(this).find('.mins').text());
  var totalTime = parseInt($(this).find('.total-time').text());

  var secondise = function(mins) {
    return mins * 60;
  }


  clocks.push($('body').find('.total-cook').FlipClock(25, {
        clockFace: 'HourlyCounter',
        countdown: true,
        autoStart: true
    }));

  clocks.push($('body').find('.step-time').FlipClock(100, {
        clockFace: 'MinuteCounter',
        autoStart: true,
        countdown: true
    }));

});
