jQuery(document).ready(function() {
  jQuery('.gist').each(function(i) {
    writeCapture.html(this, '<script src="'+jQuery(this).text()+'"></script>');
  });
});
