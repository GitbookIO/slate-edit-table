export default function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    const pos = plugin.utils.getPosition(change.state);

    const cells = plugin.utils.getCellsAtRow(pos.table, pos.getRowIndex());
    cells.forEach(cell =>
        change.setNodeByKey(cell.key, { data: { custom: 'value' } })
    );
    return change;
}
