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

function doSearch(query, type="track") {

  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://api.spotify.com/v1/search",
      data: {
        "q": query,
        "type": type
      },
      headers: {
        'Authorization': 'Bearer ' + getUrlVars()['access_token']
      },
      success: function (response) {
        resolve(response);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
}

function makeSongBlock(data, img) {
  // data context: data["tracks"]["items"][0]
  let table = document.createElement("table");
  table.classList.add("blocktable");

  let tr = table.insertRow();
  let cell = tr.insertCell(0);
  cell.setAttribute("rowSpan", "2");
  let cell2 = tr.insertCell(1);
  cell.appendChild(img);
  cell2.appendChild(document.createTextNode(data["name"]));
  let cell3 = table.insertRow().insertCell(0);
  cell3.appendChild(document.createTextNode(data["artists"][0]["name"]));


  // <div id="divCheckbox" style="display: none;">
  let idDiv = document.createElement("div");
  idDiv.style.display = "none";
  idDiv.setAttribute("data-sid", data["id"]);
  cell3.appendChild(idDiv);

  return table;
}

function redirectTo(page) {
  window.location = page + window.location.search;
}


// function addBlock()

function getSongsFromTable() {
  // console.log("Slots");
  // console.log(slots);
  let songsIDs = [];

  for (const [key, value] of Object.entries(slots)) {
    // console.log(key, value);
    if (value !== undefined) {
      let sid = document.getElementById(value).getElementsByTagName("td")[2].getElementsByTagName("div")[0].getAttribute("data-sid");

      console.log(key, value, sid);
    }
  }
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
