$(document).ready(function() {
  // Example api call:
  // https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Albert%20Einstein&format=json

  $("#search_box").keyup(function(event) {
    if (event.keyCode == 13) {
      $("#search_button").click();
    }
  });

  var searchedOnce = false;
  $("#search_button").click(function() {

    var enteredSearch = document.getElementById("search_box").value;
    var api = "https://en.wikipedia.org/w/api.php?"; // api or endpoint
    var action = "action=query&list=search&";
    var search = "srsearch=" + enteredSearch + "&";
    var format = "format=json&callback=?";
    // Following error is fixed by adding &callback=?,
    // 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://s.codepen.io' is therefore not allowed access.

    var finalApiCall = api + action + search + format;

    console.log(searchedOnce);

    $.getJSON(finalApiCall, function(json) {

      if (!searchedOnce) {
        for (var i = 0; i < 10; i++) {
          var title = json.query.search[i].title;
          var snippet = json.query.search[i].snippet;
          var titleOpeningTag = '<p class="title">';
          var snippetOpeningTag = '<p class="snippet">';
          var closingTag = '</p>';
          var titleTagged = titleOpeningTag + title + closingTag;
          var snippetTagged = snippetOpeningTag + snippet + closingTag;
          var boxNum = 'box' + i;
          var box = '<div class="box" id="' + boxNum + '"></div>'
          var articleLink = "https://en.wikipedia.org/wiki/" + title;
          var linkNum = "link" + i;
          var linkHtml = '<a href="' + articleLink + '" class="links" id="' + linkNum + '"></a>';
          var linkNumWithHash = '#' + linkNum;
          console.log(linkHtml);
          $("#search_results").append(linkHtml);
          $(linkNumWithHash).append(box);
          var boxNumWithHash = '#' + boxNum;
          $(boxNumWithHash).append(titleTagged);
          $(boxNumWithHash).append(snippetTagged);
        }

        searchedOnce = true;
      } else {
        // Delete old search results
        $("#search_results").empty();

        for (var i = 0; i < 10; i++) {
          var title = json.query.search[i].title;
          var snippet = json.query.search[i].snippet;
          var titleOpeningTag = '<p class="title">';
          var snippetOpeningTag = '<p class="snippet">';
          var closingTag = '</p>';
          var titleTagged = titleOpeningTag + title + closingTag;
          var snippetTagged = snippetOpeningTag + snippet + closingTag;
          var boxNum = 'box' + i;
          var box = '<div class="box" id="' + boxNum + '"></div>'
          var articleLink = "https://en.wikipedia.org/wiki/" + title;
          var linkNum = "link" + i;
          var linkHtml = '<a href="' + articleLink + '" class="links" id="' + linkNum + '"></a>';
          var linkNumWithHash = '#' + linkNum;
          console.log(linkHtml);
          $("#search_results").append(linkHtml);
          $(linkNumWithHash).append(box);
          var boxNumWithHash = '#' + boxNum;
          $(boxNumWithHash).append(titleTagged);
          $(boxNumWithHash).append(snippetTagged);
        }
      }
    });

  });

});