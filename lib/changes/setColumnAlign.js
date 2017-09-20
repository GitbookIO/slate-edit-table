const TablePosition = require('../TablePosition');
const ALIGN = require('../ALIGN');
const createAlign = require('../createAlign');

/**
 * Sets column alignment for a given column
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} at
 * @param {String} align
 * @return {Slate.Change}
 */
function setColumnAlign(opts, change, align = ALIGN.DEFAULT, at) {
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    // Figure out column position
    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const newAlign = createAlign(pos.getWidth(), table.data.get('align'));
    newAlign[at] = align;

    change.setNodeByKey(table.key, {
        data: {
            align: newAlign
        }
    });

    return change;
}

module.exports = setColumnAlign;
