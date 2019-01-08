let express = require('express');
let router = express.Router();
let fs = require('fs'), json;
let encoding = 'utf8';

router.get('/', function (req, res, next) {
    let filepath = 'routes/api/base/weather.json';
    let file = fs.readFileSync(filepath, encoding);
    res.send(JSON.parse(file));
});

module.exports = router;
