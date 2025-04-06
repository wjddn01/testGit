const PocketBase = require('pocketbase');
const pb = new PocketBase('http://127.0.0.1:8090'); // PocketBase 서버 주소

module.exports = pb;
