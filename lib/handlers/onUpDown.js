import { TablePosition } from '../utils';
import { moveSelectionBy } from '../changes';

function onUpDown(opts, event, editor, next) {
    const { value } = editor;
    const direction = event.key === 'ArrowUp' ? -1 : +1;
    const pos = TablePosition.create(
        opts,
        value.document,
        value.selection.start.key,
    );

    if (
        (pos.isFirstRow() && direction === -1) ||
        (pos.isLastRow() && direction === +1)
    ) {
        // Let the default behavior move out of the table
        return next();
    }

    if (direction === -1 && !pos.isTopOfCell()) {
        return next();
    }

    if (direction === +1 && !pos.isBottomOfCell()) {
        return next();
    }

    event.preventDefault();

    moveSelectionBy(opts, editor, 0, direction);

    return editor;
}

export default onUpDown;
