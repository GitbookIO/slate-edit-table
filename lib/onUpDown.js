const TablePosition = require('./TablePosition');
const moveSelectionBy = require('./changes/moveSelectionBy');

function onUpDown(event, change, opts) {

    const direction = event.key === 'UpArrow' ? -1 : +1;
    const pos = TablePosition.create(change.state, change.state.startBlock);

    if ((pos.isFirstRow() && direction === -1)
        || (pos.isLastRow() && direction === +1)) {
        // Let the default behavior move out of the table
        return change;

    } else {
        event.preventDefault();

        moveSelectionBy(
            opts, change,
            0, event.key === 'UpArrow' ? -1 : +1
        );

        return change;
    }
}

module.exports = onUpDown;

