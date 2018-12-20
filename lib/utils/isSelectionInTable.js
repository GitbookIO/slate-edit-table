import isRangeInTable from './isRangeInTable';

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts, editor) {
    if (!editor.value.selection.start.key) return false;
    return isRangeInTable(opts, editor.value.document, editor.value.selection);
}

export default isSelectionInTable;
