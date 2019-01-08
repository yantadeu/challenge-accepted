let express = require('express');
let router = express.Router();
let fs = require('fs'), json;
let encoding = 'utf8';
let filepathWeather = 'routes/api/base/weather.json';
let filepathLocale = 'routes/api/base/locales.json';
let datetime = require('node-datetime');

router.get('/', function (req, res, next) {
    let locals = getLocales();
    let weathers = [];
    let description = 'Bem-Vindo! Selecione um cidade acima';
    let search = req.query.search;
    if(search !== undefined){
        weathers = getWeatherByLocale(search);
        console.log('weathers', weathers);
        let local = getLocale(search);
        if(local.name !== undefined){
            description = 'Previsão para ' + local.name + ' - ' + local.state;
        }else{
            description = 'Cidade '+search+' não encontrada!';
        }

    }
    res.render('index', {title: 'Climatempo', locales: JSON.stringify(locals), weathers: weathers, description: description});
});

let getWeatherByLocale = function (locale) {
    let file = fs.readFileSync(filepathWeather, encoding);
    let ws = JSON.parse(file);
    let array = [];
    ws.forEach(function (value, index, arr) {
        if(value.locale.name.toUpperCase() === locale.toUpperCase()){
            value.weather.forEach(function (val, idx, ar) {
                let dt = datetime.create(val.date + " 23:59:59", 'd/m/Y');
                val.date = dt.format();
                array.push(val);
            });
        }
    });
    return array;
};

let getLocales = function () {
    let file = fs.readFileSync(filepathLocale, encoding);
    let locs = JSON.parse(file);
    let array = [];
    locs.forEach(function (value, index, arr) {
        array.push(value.name)
    });
    return array;
};

let getLocale = function (search) {
    let file = fs.readFileSync(filepathLocale, encoding);
    let locs = JSON.parse(file);
    let array = [];
    let local = [];
    locs.forEach(function (value, index, arr) {
        if(value.name.toUpperCase() === search.toUpperCase()){
            local = value;
        }
    });
    return local;
};

module.exports = router;
