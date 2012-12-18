/* 
 * Firepano: A simple client-side photo sharing site.
 *
 * Live demo: http://firepano.misc.firebase.com/
 * An example panorama: http://firepano.misc.firebase.com/#70ed37564320f9f4f8d753ae31fb6c1fad0bcc7630a607b6e8ee7e7cfbb650e4
 *
 * The security model of this simple photo sharing app is predicated on having
 * locations being unguessable. We construct paths into Firebase using a hash of
 * the file being uploaded. Then, anyone that has access to the share-able link
 * can then lookup the location in Firebase and view its contents. 
 *
 * A simple rule set is required to make sure none of the keys are enumerable
 * from Firebase. This prevents retrieval of the keys from any of the Firebase
 * clients, including REST endpoints. We also add a write rule to the photos so
 * that once the data has been written, no one can override or delete data that
 * already exists.
 *
 * The Firebase rules:

{
  "rules": {
    ".read": false,
    ".write": false,
    "pano": {
     ".read": false,
     ".write": false,
      "$pano": {
       ".read": true,
       ".write": "! data.exists()"
      }
    }
  }
}

 *
 * Exercises for the reader:
 *  1. Add a chat/comments system to each photo.
 *  2. Support logging in with Facebook/Twitter to manage photos: edits, removals, etc.
 *  3. Add metadata to indicate public/private photo; add a realtime feed of newly uploaded photos.
 *
 */

var firebaseRef = 'https://firepano.firebaseio.com/';

var spinner = new Spinner({color: '#ddd'});

function handleFileSelect(evt) {
  var f = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      var filePayload = e.target.result;
      // Generate a location that can't be guessed using the file's contents and a random number
      var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
      var f = new Firebase(firebaseRef + 'pano/' + hash + '/filePayload');
      spinner.spin(document.getElementById('spin'));
      // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
      f.set(filePayload, function(s) { 
        spinner.stop();
        document.getElementById("pano").src = e.target.result;
        $('#file-upload').hide();
	// Update the location bar so the URL can be shared with others
        window.location.hash = hash;
      });
    };
  })(f);
  reader.readAsDataURL(f);
}

$(function() {
  new Firebase(firebaseRef + '.info/connected').once('value', function(s) { } );
  $('#spin').append(spinner);

  var idx = window.location.href.indexOf('#');
  var hash = (idx > 0) ? window.location.href.slice(idx + 1) : '';
  if(hash === '') {
    // No hash found, so render the file upload button
    $('#file-upload').show();
    document.getElementById("file-upload").addEventListener('change', handleFileSelect, false);
  }
  else {
    // A hash was passed in, so let's retrieve and render it
    spinner.spin(document.getElementById('spin'));
    var f = new Firebase(firebaseRef + '/pano/' + hash + '/filePayload');
    f.once('value', function(snap) {
      var payload = snap.val();
      if(payload != null) {
        document.getElementById("pano").src = payload;
      }
      else {
        $('#body').append("Not found");
      }
      spinner.stop();
    });
  }
});
