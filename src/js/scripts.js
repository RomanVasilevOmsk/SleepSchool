
var accordion = function() {
      var acc = document.getElementsByClassName("film__accordion-trigger");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("film__accordion-trigger--active");
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
};

var moreInfo = function() {
  var acc = document.getElementsByClassName("film__info-trigger");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("film__info-trigger--active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
};


document.addEventListener("DOMContentLoaded", function(event) {
  accordion.apply();
  moreInfo.apply();
});


document.addEventListener("click", function(e) {
  if (e.target.className=="film__accordion-trigger-play") {
    e.stopPropagation();
    var time = e.target.dataset.time;
    var iframe = document.querySelector('iframe');
    var player = new Vimeo.Player(iframe);

    player.setCurrentTime(time).then(function() {
      player.play();
    })

  }
});