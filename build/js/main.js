function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function doRefresh() {
  $.ajax({
    url: "/refresh_token",
    type: 'GET',
    data: {
    "refresh_token": getUrlVars()['refresh_token']
  }})
  .done(function(data) {
    var text = window.location.href;
    var newSrc = data['access_token'];
    window.location.replace(text.replace(/(access_token=).*?(&)/,'$1' + newSrc + '$2'));

    // alert( "second success" );
  })
  .fail(function() {
    // alert( "error" );
  })
  .always(function() {
    // alert( "finished" );
  });
}

function doSearch() {

  $.ajax({
    url: "https://api.spotify.com/v1/search",
    data: {
      "q": "Clockwork Angels",
      "type": "track"
    },
    success: function (response) {
      // nothing lol
    },
    headers: {
      'Authorization': 'Bearer ' + getUrlVars()['access_token']
    }
  });

}


// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}
