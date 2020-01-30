
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

function setTabStream(evt, streamName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("stream__tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("stream__tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" stream__tab-link--active", "");
  }
  document.getElementById(streamName).style.display = "block";
  evt.currentTarget.className += " stream__tab-link--active";
}



document.addEventListener("DOMContentLoaded", function(event) {
  accordion.apply();
  moreInfo.apply();
  document.getElementById("defaultOpen").click();
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