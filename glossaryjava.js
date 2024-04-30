document.getElementById('searchInput').addEventListener('input', function() {
  var searchQuery = this.value.toLowerCase();
  var glossaryItems = document.querySelectorAll('#glossaryList li');

    glossaryItems.forEach(function(item) {
        if (item.textContent.toLowerCase().includes(searchQuery)) {
        item.style.display = '';
        }          
        else {
        item.style.display = 'none';
        }
      
    });
    
});
