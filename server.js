var express = require('express');
var app = express();
var path = require('path');

app.use('/static/', express.static('lib'));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(3000, function () {
  console.log('App listening at http://localhost:3000');
});
