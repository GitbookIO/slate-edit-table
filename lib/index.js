const insertTable     = require('./transforms/insertTable');
const insertRow       = require('./transforms/insertRow');
const removeRow       = require('./transforms/removeRow');
const insertColumn    = require('./transforms/insertColumn');
const removeColumn    = require('./transforms/removeColumn');
const removeTable     = require('./transforms/removeTable');
const moveSelection   = require('./transforms/moveSelection');
const moveSelectionBy = require('./transforms/moveSelectionBy');
const setColumnAlign  = require('./transforms/setColumnAlign');

const Options     = require('./options');
const onEnter     = require('./onEnter');
const onModEnter  = require('./onModEnter');
const onTab       = require('./onTab');
const onBackspace = require('./onBackspace');
const onUpDown    = require('./onUpDown');
const ALIGN       = require('./ALIGN');
const makeSchema  = require('./makeSchema');
const TablePosition = require('./TablePosition');

const KEY_ENTER     = 'enter';
const KEY_TAB       = 'tab';
const KEY_BACKSPACE = 'backspace';
const KEY_DOWN      = 'down';
const KEY_UP        = 'up';


/**
 * @param {Options} opts The plugin options
 */
function EditTable(opts) {
    opts = new Options(opts);

    /**
     * Is the selection in a table
     */
    function isSelectionInTable(state) {
        if (!state.selection.startKey) return false;

        const { startBlock } = state;

        // Only handle events in cells
        return (startBlock.type === opts.typeCell);
    }

    /**
     * @param {State} state The current state
     * @returns {TablePosition} The position of the selection start, in the current table
     * @throws {Error} If the start of the selection is not in a table
     */
    function getPosition(state) {
        if (!isSelectionInTable(state)) {
            throw new Error('Not in a table');
        }
        const cell = state.startBlock;
        return TablePosition.create(state, cell);
    }

    /**
     * Bind a transform
     */
    function bindTransform(fn) {
        return function(transform, ...args) {
            const { state } = transform;

            if (!isSelectionInTable(state)) {
                return transform;
            }

            return fn(...[opts, transform].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(e, data, state) {
        // Only handle events in cells
        if (!isSelectionInTable(state)) {
            return;
        }

        // Build arguments list
        const args = [
            e, data, state,
            opts
        ];

        switch (data.key) {
        case KEY_ENTER:
            if (data.isMod && opts.exitBlockType) {
                return onModEnter(...args);
            } else {
                return onEnter(...args);
            }
        case KEY_TAB:
            return onTab(...args);
        case KEY_BACKSPACE:
            return onBackspace(...args);
        case KEY_DOWN:
        case KEY_UP:
            return onUpDown(...args);
        }
    }

    const schema = makeSchema(opts);

    return {
        onKeyDown,

        schema,

        utils: {
            isSelectionInTable,
            getPosition
        },

        transforms: {
            insertTable:     insertTable.bind(null, opts),
            insertRow:       bindTransform(insertRow),
            removeRow:       bindTransform(removeRow),
            insertColumn:    bindTransform(insertColumn),
            removeColumn:    bindTransform(removeColumn),
            removeTable:     bindTransform(removeTable),
            moveSelection:   bindTransform(moveSelection),
            moveSelectionBy: bindTransform(moveSelectionBy),
            setColumnAlign:  bindTransform(setColumnAlign)
        }
    };
}

// Expose align constants to the plugin
EditTable.ALIGN = ALIGN;

module.exports = EditTable;
