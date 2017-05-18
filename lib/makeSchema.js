const Slate = require('slate');
const { Range, List } = require('immutable');
const createAlign = require('./createAlign');
const createWidths = require('./createWidths');

/**
 * Create a schema for tables
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A schema definition with rules to normalize tables
 */
function makeSchema(opts) {
    return {
        rules: [
            cellsWithinTable(opts),
            rowsWithinTable(opts),
            tablesContainOnlyRows(opts),
            rowsContainRequiredColumns(opts),
            tableContainAlignData(opts),
            tableContainWidthsData(opts),
            tableDataHasValidWidths(opts)
        ]
    };
}

/**
 * Rule to enforce cells are always surrounded by a row.
 *
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule to ensure cells are always surrounded by a row.
 */
function cellsWithinTable(opts) {
    return {
        match(node) {
            return (node.kind === 'document' || node.kind === 'block')
                && node.type !== opts.typeRow;
        },

        // Find child cells nodes not in a row
        validate(node) {
            const cells = node.nodes.filter((n) => {
                return n.type === opts.typeCell;
            });

            if (cells.isEmpty()) return;

            return {
                cells
            };
        },

        // If any, wrap all cells in a row block
        normalize(transform, node, { cells }) {
            transform = cells.reduce((tr, cell) => {
                return tr.wrapBlockByKey(cell.key, opts.typeRow, { normalize: false });
            }, transform);

            return transform;
        }
    };
}

/**
 * Rule to enforce rows are always surrounded by a table.
 *
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule to ensure rows are always surrounded by a table.
 */
function rowsWithinTable(opts) {
    return {
        match(node) {
            return (node.kind === 'document' || node.kind === 'block')
                && node.type !== opts.typeTable;
        },

        // Find child cells nodes not in a row
        validate(node) {
            const rows = node.nodes.filter((n) => {
                return n.type === opts.typeRow;
            });

            if (rows.isEmpty()) return;

            return {
                rows
            };
        },

        // If any, wrap all cells in a row block
        normalize(transform, node, { rows }) {
            transform = rows.reduce((tr, row) => {
                return tr.wrapBlockByKey(row.key, {
                    type: opts.typeTable,
                    data: {
                        align: createAlign(row.nodes.size),
                        widths: createWidths(rows.size)
                    }
                }, { normalize: false });
            }, transform);

            return transform;
        }
    };
}

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule that ensures tables only contain rows and
 * at least one.
 */
function tablesContainOnlyRows(opts) {
    const isRow = (node) => node.type === opts.typeRow;

    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            // Figure out invalid rows
            const invalids = table.nodes.filterNot(isRow);

            // Figure out valid rows
            const add = invalids.size === table.nodes.size ? [makeEmptyRow(opts)] : [];

            if (invalids.isEmpty() && add.length === 0) {
                return null;
            }

            return {
                invalids,
                add
            };
        },

        /**
         * Replaces the node's children
         * @param {List<Nodes>} value.nodes
         */
        normalize(transform, node, {invalids = [], add = []}) {
            // Remove invalids
            transform = invalids.reduce((t, child) => {
                return t.removeNodeByKey(child.key, { normalize: false });
            }, transform);

            // Add valids
            transform = add.reduce((t, child) => {
                return t.insertNodeByKey(node.key, 0, child);
            }, transform);

            return transform;
        }
    };
}

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule that ensures rows contains only cells, and
 * as much cells as there is columns in the table.
 */
function rowsContainRequiredColumns(opts) {
    const isRow = (node) => node.type === opts.typeRow;
    const isCell = (node) => node.type === opts.typeCell;
    const countCells = (row) => row.nodes.count(isCell);

    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            const rows = table.nodes.filter(isRow);

            // The number of column this table has
            const columns = rows.reduce((count, row) => {
                return Math.max(count, countCells(row));
            }, 1); // Min 1 column

            const valid = rows.every(row => columns === countCells(row));
            if (valid) {
                return null;
            }
            // else normalize, by padding with empty cells
            return rows
                .map(row => {
                    const cells = countCells(row);
                    const invalids = row.nodes.filterNot(isCell);

                    // Row is valid: right count of cells and no extra node
                    if (invalids.isEmpty() && cells === columns) {
                        return null;
                    }

                    // Otherwise, remove the invalids and append the missing cells
                    return {
                        row,
                        invalids,
                        add: (columns - cells)
                    };
                })
                .filter(Boolean);
        },

        /**
         * Updates by key every given nodes
         * @param {List<Nodes>} value.toUpdate
         */
        normalize(transform, node, rows) {
            return rows.reduce((tr, { row, invalids, add }) => {
                tr = invalids.reduce((t, child) => {
                    return t.removeNodeByKey(child.key, { normalize: false });
                }, tr);

                tr = Range(0, add).reduce(t => {
                    const cell = makeEmptyCell(opts);
                    return t.insertNodeByKey(row.key, 0, cell, { normalize: false });
                }, tr);

                return tr;
            }, transform);
        }
    };
}


/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule that ensures table node has all align data
 */
function tableContainAlignData(opts) {
    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            const align = table.data.get('align', []);
            const row = table.nodes.first();
            const columns = row.nodes.size;

            return align.length == columns ? null : { align, columns };
        },

        /**
         * Updates by key the table to add the data
         * @param {Map} align
         * @param {Number} columns
         */
        normalize(transform, node, { align, columns }) {
            const data = node.data.set('align', createAlign(columns, align));

            return transform.setNodeByKey(node.key, { data }, { normalize: false });
        }
    };
}

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @return {Object} A rule that ensures table node has all widths data
 */
function tableContainWidthsData(opts) {
    return {
        match(node) {
            return node.type === opts.typeTable;
        },

        validate(table) {
            const widths = table.data.get('widths', []);
            const columns = table.nodes.first().nodes.size;

            return widths.length == columns ? null : { widths, columns };
        },

        /**
         * Updates by key the table to add the data
         * @param {Map} widths
         * @param {Number} columns
         */
        normalize(transform, node, { widths, columns }) {
            const data = node.data.set('widths', createWidths(columns, widths));

            return transform.setNodeByKey(node.key, { data }, { normalize: false });
        }
    };
}

function tableDataHasValidWidths(opts) {
    return {
        match(node) {
            return node.type === opts.typeTable;
        },
        validate(table) {
            if (typeof opts.minimumWidth === 'undefined') { return null; }

            const widths = table.data.get('widths');
            const invalidIndices = widths.reduce((memo, width, index) => {
                if (width < opts.minimumWidth) {
                    memo.push(index);
                }

                return memo;
            }, []);

            return invalidIndices.length ? invalidIndices : null;
        },
        normalize(transform, node, invalidIndices) {
            let data = node.data;
            const widths = data.get('widths').slice();
            invalidIndices.forEach(index => {
                widths[index] = opts.minimumWidth;
            });

            data = data.set('widths', widths);

            return transform.setNodeByKey(node.key, { data }, { normalize: false });
        }
    };
}

function makeEmptyCell(opts) {
    return Slate.Block.create({
        type: opts.typeCell
    });
}

function makeEmptyRow(opts) {
    return Slate.Block.create({
        type: opts.typeRow,
        nodes: List([makeEmptyCell(opts)])
    });
}

module.exports = makeSchema;
