$(document).ready(() => {

  $.ajax({
    url: '../../feeds',
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      let feed_list = data;

      for (const e	of Object.keys(data)) {
        const feed = data[e];
        $("#feeds").append(
        "<div id=\"feed_list\" class=\"container\">" +
          "<div class=\"feed_box\">" +
            "<div class=\"card h-100\" >" +
              "<div href=\""+ feed.url  + "\"><img class=\"card-img-top img-fluid\" src=\"" + feed.image + "\" alt=\"Card image cap\"></div>" +
              "<div class=\"card-block\">" +
                  "<p class=\"card-text\">" + feed.caption + "</p>" +
              "</div>" +
              "<div class=\"card-footer\">" +
              "<input id=\"input-id\" type=\"text\" class=\"rating\" data-size=\"lg\" >" +
                "<small class=\"text-muted\">&#9733; &#9733; &#9733; &#9733; &#9734;</small>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>"
        )};
      }
  });

});


$(document).ajaxError(() => {
  $('#status').html('Error: unknown ajaxError!');
});
