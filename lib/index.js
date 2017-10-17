const insertTable     = require('./changes/insertTable');
const insertRow       = require('./changes/insertRow');
const removeRow       = require('./changes/removeRow');
const insertColumn    = require('./changes/insertColumn');
const removeColumn    = require('./changes/removeColumn');
const removeTable     = require('./changes/removeTable');
const moveSelection   = require('./changes/moveSelection');
const moveSelectionBy = require('./changes/moveSelectionBy');
const setColumnAlign  = require('./changes/setColumnAlign');

const Options     = require('./options');
const onEnter     = require('./onEnter');
const onModEnter  = require('./onModEnter');
const onTab       = require('./onTab');
const onBackspace = require('./onBackspace');
const onUpDown    = require('./onUpDown');
const ALIGN       = require('./ALIGN');
const makeSchema  = require('./makeSchema');
const TablePosition = require('./TablePosition');

const KEY_ENTER     = 'Enter';
const KEY_TAB       = 'Tab';
const KEY_BACKSPACE = 'Backspace';
const KEY_DOWN      = 'ArrowDown';
const KEY_UP        = 'ArrowUp1';


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
     * Bind a change
     */
    function bindChange(fn) {
        return function(change, ...args) {
            const { state } = change;

            if (!isSelectionInTable(state)) {
                return change;
            }

            return fn(...[opts, change].concat(args));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(event, change) {
        // Only handle events in cells
        if (!isSelectionInTable(change.state)) {
            return;
        }

        // Build arguments list
        const args = [
            event, change,
            opts
        ];

        switch (event.key) {
        case KEY_ENTER:
            if (event.metaKey && opts.exitBlockType) {
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

        changes: {
            insertTable:     insertTable.bind(null, opts),
            insertRow:       bindChange(insertRow),
            removeRow:       bindChange(removeRow),
            insertColumn:    bindChange(insertColumn),
            removeColumn:    bindChange(removeColumn),
            removeTable:     bindChange(removeTable),
            moveSelection:   bindChange(moveSelection),
            moveSelectionBy: bindChange(moveSelectionBy),
            setColumnAlign:  bindChange(setColumnAlign)
        }
    };
}

// Expose align constants to the plugin
EditTable.ALIGN = ALIGN;

module.exports = EditTable;
