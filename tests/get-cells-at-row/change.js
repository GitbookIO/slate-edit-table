export default function(editor) {
    const { value } = editor;
    const cursorBlock = value.document.getDescendant('anchor');
    editor.moveToRangeOfNode(cursorBlock);

    const pos = editor.getPosition(editor.value);

    const cells = editor.getCellsAtRow(pos.table, pos.getRowIndex());
    cells.forEach(cell =>
        editor.setNodeByKey(cell.key, { data: { custom: 'value' } }),
    );
    return editor;
}
