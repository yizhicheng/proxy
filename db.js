/**
 *
 */
var mysql = require('mysql');
var dbconfig = require('./db.config');
var db = mysql.createConnection( dbconfig );
module.exports = db;
