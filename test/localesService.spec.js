const assert = require('assert');
let http = require('http');
let options = {
    host: 'localhost',
    path: '/api/locales',
    port: 3000
};

describe('localesService.js', () => {
    it('Requisição Locales', () => {
        http.get(options, function (res) {
            let status = res.statusCode;
            assert.equal(status, 200);
        });
    });
});