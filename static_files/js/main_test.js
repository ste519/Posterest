let feed = document.getElementById("news");

$( ".list-group-item" ).click(function() {
  let media = $(this).html();
  $("#media-type").text(media);
});

let complexData;
$.getJSON('https://api.myjson.com/bins/ee3oc', function(json) {
  console.log(json);
  complexData  = json;// show the JSON file content into console

  complexData.sort(function(a,b){
    return new Date(b.time) - new Date(a.time);
  });

// Call this function when the page loads (the "ready" event)
  $(document).ready(function () {

    // compile the template


    // now iterate through the complexData list and keep appending:
    let curData;
    let curHtml;
    const parentDiv = $("#wrap");
    let source;
    let template
    for (let i = 0; i < complexData.length; i++) {


        if (complexData[i].image) {
          source = $("#entry-template").html();
        }
        else {
          source = $("#no-pic").html();
        }
        template = Handlebars.compile(source);
        complexData[i].time = moment(new Date(complexData[i].time)).fromNow();
        curData = complexData[i];
        curHtml = template(curData);
        parentDiv.append(curHtml);
      }
  });
});

//Infinite Scroll
function yHandler() {
  let wrap = document.getElementById('wrap');
  let contentHeight = wrap.offsetHeight;
  let yOffset = window.pageYOffset;
  let y = yOffset + window.innerHeight;
  if (y>= contentHeight) {
    getFeeds('https://api.myjson.com/bins/ee3oc');
  }
}
window.onscroll = yHandler;

function getFeeds(url) {
  //AJAX
  let ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url);
    ourRequest.onload = function() {
    let ourData = JSON.parse(ourRequest.responseText);
    console.log(ourData[0]);
    renderHTML(ourData);
  };
  ourRequest.send();
};

function renderHTML(data) {

    // compile the template
      let parentDiv = $("#wrap");
      let source = $("#entry-template").html();
      let template = Handlebars.compile(source);

    // now iterate through the complexData list and keep appending:

    for (let i = 0; i < complexData.length; i++) {

        data[i].time = moment(new Date(data[i].time)).fromNow();
        let curData = data[i];
        let curHtml = template(curData);
        parentDiv.append(curHtml);
      }

}
