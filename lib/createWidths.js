const { Range } = require('immutable');
const DIMENSIONS = require('./DIMENSIONS');

/**
 * Create a set of widths
 * @param  {Number} columns
 * @param  {List} base
 * @return {List} list
 */
function createWidths(columns, base = []) {
    return Range(0, columns)
        .map(i => base[i] || DIMENSIONS.DEFAULT.WIDTH)
        .toArray();
}

module.exports = createWidths;
