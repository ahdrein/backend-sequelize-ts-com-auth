'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var config = require('../config/env/config')();
var env = config.env || 'development';
var db = {};
var sequelize;
var DBURL;
if (config.dbURL) {
    DBURL = config.dbURL;
}
else {
    DBURL = 'postgres://ahdrein:123@localhost:5432/ts_api';
}
if (process.env.NODE_ENV == 'production') {
    if (process.env.DATABASE_URL) {
        DBURL = process.env.DATABASE_URL;
    }
}
if (DBURL) {
    var sequelize = new Sequelize(DBURL);
}
else {
    var sequelize = new Sequelize(config.db, config.username, config.password);
}
console.log(__dirname);
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    var extension = '.js';
    if (process.env.NODE_ENV == 'development')
        extension = '.ts';
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
