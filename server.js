const express = require('express');
const app = express();

app.use(express.static(__dirname+'/dist/frontend-library'));

app.get('/*', (req, resp) => {
    resp.sendFile(__dirname+'/dist/frontend-library/index.html');
});

app.listen(process.env.PORT || 8080);