const { Record } = require('immutable');

const DEFAULTS = {
    // The type of table blocks
    typeTable: 'table',
    // The type of row blocks
    typeRow: 'table_row',
    // The type of cell blocks
    typeCell: 'table_cell',
    // The type of block inserted when exiting
    exitBlockType: 'paragraph'
};

/**
 * The plugin options
 */
class Options extends new Record(DEFAULTS) {}

module.exports = Options;
