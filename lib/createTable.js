const { Range } = require('immutable');
const Slate = require('slate');
const createRow = require('./createRow');
const createAlign = require('./createAlign');
const createWidths = require('./createWidths.js');

/**
 * Create a table
 *
 * @param {Slate.State} state
 * @param {Object} opts
 * @param {Number} columns
 * @param {Number} rows
 * @param {Function} textGetter
 * @return {State.Block}
 */
function createTable(opts, columns, rows, textGetter) {
    const rowNodes = Range(0, rows)
        .map(i => createRow(opts, columns, textGetter ? textGetter.bind(null, i) : null))
        .toList();
    const align = createAlign(columns);
    const widths = createWidths(columns);

    return Slate.Block.create({
        type:  opts.typeTable,
        nodes: rowNodes,
        data: {
            align,
            widths
        }
    });
}

module.exports = createTable;
