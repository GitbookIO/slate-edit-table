import { TablePosition } from '../utils';
import { insertRow } from '../changes';

/**
 * Insert a new row when pressing "Enter"
 */
function onEnter(opts, event, editor, next) {
    event.preventDefault();
    const { selection, document } = editor.value;
    const pos = TablePosition.create(opts, document, selection.start.key);

    if (
        !selection.focus.isAtStartOfNode(pos.cell) &&
        !selection.focus.isAtEndOfNode(pos.cell)
    ) {
        return next();
    }

    if (event.shiftKey) {
        return editor
            .splitBlock()
            .setBlocks({ type: opts.typeContent, data: {} });
    }

    return insertRow(opts, editor);
}

export default onEnter;
