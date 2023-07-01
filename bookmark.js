 // Retrieve the button element using its ID
    var bookmarkButton = document.getElementById('bookmarkButton');
  
    // Add a click event listener to the button
    bookmarkButton.addEventListener('click', function() {
      // Get the current page's URL
      var currentPageUrl = window.location.href;
  
      // Get the current page's title
      var currentPageTitle = document.title;
  
      // Create a new bookmark using the URL and title
      if (window.sidebar && window.sidebar.addPanel) { // For Mozilla Firefox
        window.sidebar.addPanel(currentPageTitle, currentPageUrl, '');
      } else if (window.external && ('AddFavorite' in window.external)) { // For Internet Explorer
        window.external.AddFavorite(currentPageUrl, currentPageTitle);
      } else if (window.opera && window.print) { // For Opera
        var bookmarkLink = document.createElement('a');
        bookmarkLink.setAttribute('href', currentPageUrl);
        bookmarkLink.setAttribute('title', currentPageTitle);
        bookmarkLink.setAttribute('rel', 'sidebar');
        bookmarkLink.click();
      } else { // For other browsers
        alert("Your browser doesn't support this bookmarking functionality. Please use your browser's bookmarking options.");
      }
    });