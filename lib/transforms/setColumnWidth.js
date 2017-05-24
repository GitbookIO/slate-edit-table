const TablePosition = require('../TablePosition');
const DIMENSIONS = require('../DIMENSIONS');
const createWidths = require('../createWidths');

/**
 * Sets column width for a given column
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} width
 * @param {Number} at
 * @return {Slate.Transform}
 */
function setColumnWidth(opts, transform, width = DIMENSIONS.DEFAULT.WIDTH, at) {
    const { state } = transform;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;
    const data = table.data;

    // Figure out column position
    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const widths = createWidths(pos.getWidth(), data.get('widths'));
    widths[at] = width;

    transform.setNodeByKey(table.key, { data: data.set('widths', widths) });

    return transform;
}

module.exports = setColumnWidth;
