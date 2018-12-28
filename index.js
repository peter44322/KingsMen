const express = require('express');
const app = new express();
const config = require('./config.js')(app,express);
require('./routes/web.js')(app);


const port =process.env.PORT || 8080 ;


app.listen(port,function() {
  console.log('listening on '+port);
});
