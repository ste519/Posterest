var complexData;
$.getJSON('https://api.myjson.com/bins/hie12', function(json) {
  console.log(json);
  complexData  = json;// show the JSON file content into console

  complexData.sort(function(a,b){
    return new Date(b.time) - new Date(a.time);
  });
// Call this function when the page loads (the "ready" event)
  $(document).ready(function() {
    console.log(complexData);

    // compile the template
    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var parentDiv = $("#templatedProjects");

    // now iterate through the complexData list and keep appending:

    for (var i = 0; i < complexData.length; i++) {
        complexData[i].time = moment(new Date(complexData[i].time)).fromNow();
        var curData = complexData[i];
        var curHtml = template(curData);
        parentDiv.append(curHtml);
        console.log(curData)
      }
  });
});
