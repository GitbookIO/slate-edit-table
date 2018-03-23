export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    const pos = plugin.utils.getPosition(change.value);

    const cells = plugin.utils.getCellsAtRow(pos.table, pos.getRowIndex());
    cells.forEach(cell =>
        change.setNodeByKey(cell.key, { data: { custom: 'value' } })
    );
    return change;
}
