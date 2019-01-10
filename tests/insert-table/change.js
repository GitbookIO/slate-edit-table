export default function(editor) {
    const { value } = editor;
    const cursorBlock = value.document.getDescendant('anchor');
    editor.moveToRangeOfNode(cursorBlock).moveForward(6); // Cursor here: Before|After

    return editor.insertTable();
}
