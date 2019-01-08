const assert = require('assert');
let http = require('http');
let options = {
    host: 'localhost',
    path: '/api/weather',
    port: 3000
};

describe('weatherService.js', () => {
    it('Requisição Weather', () => {
        http.get(options, function (res) {
            let status = res.statusCode;
            assert.equal(status, 200);
        });
    });
});