let slots = {};
let lastpos = {};


let startPos = null;
let SLOT = document.getElementById("1").getBoundingClientRect();

function setStartBlock(block_id, slot_id) {

  let fromBlock = document.getElementById(block_id);
  let toSlot = document.getElementById(slot_id);

  let toRect = toSlot.getBoundingClientRect();
  let fromRect = fromBlock.getBoundingClientRect();


  let startX = toRect["x"] - fromRect["x"];//+ (toRect["width"]/2 - fromRect["width"]/2);
  let startY = toRect["y"] - fromRect["y"];// + (toRect["height"]/2 - fromRect["height"]/2);

  fromBlock.style.transform = "translate(" + startX + "px, " + startY + "px)";

  fromBlock.setAttribute('data-x', startX);
  fromBlock.setAttribute('data-y', startY);

  slots[slot_id] = block_id;
  lastpos[slot_id] = {
    x: toRect["x"] + fromRect["width"],
    y: toRect["y"] + fromRect["height"]
  };
}


function searchTrack(track_name, block_id) {

  doSearch(track_name, "track").then((function (data) {

    function editBlock(block_id) {
      let b = document.getElementById(block_id);
      let img = new Image();
      img.onload = function() {
        let height = img.height;
        let width = img.width;
        if (height > width) {
          img.height = SLOT["height"];
        } else {
          img.width = SLOT["height"];
        }
      };

      img.src = data["tracks"]["items"][0]["album"]["images"][0]["url"];

      let table = makeSongBlock(data["tracks"]["items"][0], img);
      table.width = SLOT["width"];
      b.style.width = SLOT["width"];

      b.appendChild(table);

    }

    editBlock(block_id);
  }));
}


searchTrack("Snakes and Arrows", "block1");
searchTrack("Beans in my ears", "block2");

setStartBlock("block1", "1");
setStartBlock("block2", "2");




interact('.block')
  .draggable({
    onmove: function (event) {
      var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      target.style.webkitTransform =
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    },
    onend: function (event) {

    }
  })
  .inertia(true)
  .restrict({
    drag: "",
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  })
  .snap({
    mode: 'anchor',
    anchors: [],
    range: Infinity,
    elementOrigin: { x: 0.5, y: 0.5 },
    endOnly: true,
  })
  .on('dragstart', function (event) {
    if (!startPos) {
      var rect = interact.getElementRect(event.target);

      // record center point when starting the very first a drag
      startPos = {
        x: rect.left + rect.width  / 2,
        y: rect.top  + rect.height / 2
      }
    }

    // snap to the start position
    event.interactable.snap({ anchors: [startPos] });
  });


interact('.dropzone')
// enable draggables to be dropped into this
  .dropzone({ overlap: 'center' })
  // only accept elements matching this CSS selector
  .accept('.block')
  // listen for drop related events
  .on('dragenter', function (event) {
    console.log(event);

    if(slots[event.target.id] === undefined) {
      slots[event.target.id] = event.relatedTarget.id;

      var dropRect = interact.getElementRect(event.target),
        dropCenter = {
          x: dropRect.left + dropRect.width  / 2,
          y: dropRect.top  + dropRect.height / 2
        };
      lastpos[event.target.id] = dropCenter;

      event.draggable.snap({
        anchors: [ dropCenter ]
      });

      var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target');
      draggableElement.classList.add('can-drop');

    } else {

    }

  })
  .on('dragleave', function (event) {
    if(slots[event.target.id] === event.relatedTarget.id) {
      slots[event.target.id] = undefined;
    }

    event.draggable.snap(false);
    if(event.target.id in lastpos) {
      console.log("Snapping to last position");
      console.log(lastpos[event.target.id]);

      event.draggable.snap({ anchors: [lastpos[event.target.id]] });
    } else {
      event.draggable.snap({ anchors: [startPos] });
    }

    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
  })
  .on('dropactivate', function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  })
  .on('dropdeactivate', function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  })
  .on('drop', function (event) {
    // slots[event.target.id] = true;
    // console.log(slots);
    // console.log(event.target.id);
    // console.log(event);
    // event.relatedTarget.textContent = 'yeet';
  });
