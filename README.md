# Status: Archived
This repository has been archived and is no longer maintained.

![status: inactive](https://img.shields.io/badge/status-inactive-red.svg)


# This is a legacy Firebase example (for SDK 2.x.x). You probably want to use one of the up-to-date examples at https://firebase.google.com/docs/samples

---

Firepano
========

A simple client-side photo sharing site.

### [Live Demo](http://firebase.github.io/firepano/) | [Example Panorama](http://firebase.github.io/firepano/#70ed37564320f9f4f8d753ae31fb6c1fad0bcc7630a607b6e8ee7e7cfbb650e4)

How does it work?
-----------------
The security model of this simple photo sharing app is predicated on having
locations being unguessable. We construct paths into Firebase using a hash of
the file being uploaded. Then, anyone that has access to the share-able link
can then lookup the location in Firebase and view its contents.

A simple rule set is required to make sure none of the keys are enumerable
from Firebase. This prevents retrieval of the keys from any of the Firebase
clients, including REST endpoints. We also add a write rule to the photos so
that once the data has been written, no one can override or delete data that
already exists. The rules for this application are in [rules.json](http://github.com/firebase/firepano/blob/gh-pages/rules.json).

Exercises for the reader
------------------------
  1. Add a chat/comment system to each photo.
  2. Support logging in with Facebook/Twitter to manage photos: edits, removals, etc.
  3. Add metadata to indicate public/private photos.
  4. Add a realtime feed of newly uploaded photos.

License
-------
[MIT](http://firebase.mit-license.org), except sha256.js.

sha256.js is part of [CryptoJS](http://code.google.com/p/crypto-js/) which
is distributed under the terms of
[this license](http://code.google.com/p/crypto-js/wiki/License) (BSD 3-clause).
