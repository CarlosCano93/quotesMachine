var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var currentQuote = '';
var currentAuthor ='';

function ajaxRequest() {
  $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      }
    })
    .done(update);
}

function update(r) {
  $('#quote-text').text(r.quoteText);
  currentQuote = r.quoteText;
  if (r.quoteAuthor){
    currentAuthor = r.quoteAuthor;
    $('#author-text').text("- " + r.quoteAuthor);  
  } else {
    currentAuthor = 'Anonymous';
    $('#author-text').text("- Anonymous");
  }
  
  var color = Math.floor(Math.random() * colors.length);
  $("html body").animate({
    backgroundColor: colors[color],
    color: colors[color]
  }, 1000);
  $(".btn").animate({
    backgroundColor: colors[color]
  }, 1000);
  
}

$(document).ready(function() {
  ajaxRequest();
  $('#quoteAJAX').on('click', ajaxRequest);
  
  $('#tweet-quote').on('click', function() {
      window.open('https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor), "Share");
  });
});