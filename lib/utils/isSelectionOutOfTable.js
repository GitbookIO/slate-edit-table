import TablePosition from './TablePosition';
/**
 * Are the selection start and end outside a table.
 */
function isSelectionOutOfTable(opts, { value }) {
    if (!value.selection.start.key) return false;

    const { selection } = value;

    const startPosition = TablePosition.create(
        opts,
        value.document,
        selection.start.key,
    );
    const endPosition = TablePosition.create(
        opts,
        value.document,
        selection.end.key,
    );

    // Only handle events in tables
    return !startPosition.isInTable() && !endPosition.isInTable();
}

export default isSelectionOutOfTable;
