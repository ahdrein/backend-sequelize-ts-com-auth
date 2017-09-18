// module.exports = () => require('../env/&{proccess.env.NODE_ENV}.env.js')
module.exports = () => require(`../env/development`);