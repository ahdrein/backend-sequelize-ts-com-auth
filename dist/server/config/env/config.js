// module.exports = () => require('../env/&{proccess.env.NODE_ENV}.env.js')
module.exports = function () { return require("../env/development"); };
