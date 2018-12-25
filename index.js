const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const app = new express();

const port = 8080;

app.use(express.static('public'));
app.use(expressEdge);
app.set('views', __dirname + '/views');


app.get('/', function (req, res)  {
    res.render('index');
});


app.get('/about',function (req,res) {
  res.sendFile(path.resolve(__dirname, 'pages/about.html'));
})

app.listen(port,function() {
  console.log('listening on '+port);
});
