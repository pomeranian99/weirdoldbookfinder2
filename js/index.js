google.books.load();
var openingGambits = ["GV6pbZp9j6wC", "y6EqAAAAYAAJ", "WSMSAAAAYAAJ", "YosIAQAAIAAJ", "-a5bAAAAQAAJ", "GclbAAAAQAAJ", "FesOAAAAYAAJ", "BdpRAAAAMAAJ", "fj0JAAAAQAAJ", "h58rAAAAMAAJ", "kUANAAAAYAAJ", "9xMeAAAAMAAJ", "vnVNAAAAYAAJ", "bRUVAAAAYAAJ", "PlJVAAAAMAAJ", "6MkNAAAAYAAJ", "ytgGAAAAcAAJ", "RFVLAAAAMAAJ", "PTEgAAAAMAAJ", "fqxCAAAAIAAJ", "G4kAAAAAMAAJ", "M25BAAAAcAAJ", "lOgVD2rMFgsC", "UiNxG1uVZFwC"],
    randomBook = openingGambits[Math.floor(Math.random() * (openingGambits.length)) - 1],
    bookQuery = document.querySelector("#bookQuery"),
    buttonPress = document.querySelector("#buttonPress"),
    bookRequest = "";

google.books.setOnLoadCallback(initialize);

// Open a google books viewer in the HTML
function initialize() {
  var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
  viewer.load(randomBook);
}

// on button press, grab search string and run
buttonPress.addEventListener("click", function(e) {
  e.preventDefault();
  bookRequest = bookQuery.value;
  findNewBook();
})

// on enter key, grab search string and run
document.getElementById('bookQuery').addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
          bookRequest = bookQuery.value;
          findNewBook();
        }
    });


/* search amongst free ebooks using google books API,
get 40 results, check each one to see it's published before 1923,
if it is, add it to the possibleBooks array and then pick one randomly
to display */

function findNewBook() {
  var possibleBooks = [];
  var possibleBooksYears = [];
  $.getJSON('https://www.googleapis.com/books/v1/volumes?q=' + bookRequest + '&download=epub&filter=free-ebooks&maxResults=40', function(data) {
    for (i = 0; i < data.items.length; i++) {
      if (Number(data.items[i].volumeInfo.publishedDate) < 1923) {
        possibleBooks.push(data.items[i].id);
        possibleBooksYears.push(data.items[i].volumeInfo.publishedDate);
      }
    }
    if (possibleBooks === undefined || possibleBooks.length === 0) {
      alert("Alas, Google Books didn't find any weird old books that matched that query. Try another one. Maybe ... vaguer.");
    } else {
      var randomPick = Math.floor(Math.random() * (possibleBooks.length));
      randomBook = possibleBooks[randomPick];
      initialize();
    }
  });
}
