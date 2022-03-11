let quotesData;

var currentQuote = '',
    currentAuthor = '';

const URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
const TWITTER_URL =  'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';

function getQuotes() {
  return $.ajax({
    headers: {
        Accept: 'application/json'
    },
    url: URL,
    success: function (jsonQuotes) {
        if (typeof jsonQuotes === 'string') {
            quotesData = JSON.parse(jsonQuotes);
        }
    }
  });
}

function getRandomQuote() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  $('#tweet-quote').attr('href', TWITTER_URL + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));

    $('.quote-text').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#text').text(randomQuote.quote);
    });

    $('.quote-author').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#author').html(randomQuote.author);
    });

}

$(document).ready(function () {
    getQuotes().then(() => {
        getQuote();
    });

    $('#new-quote').on('click', getQuote);
});
