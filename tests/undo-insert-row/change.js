export default function(editor) {
    const cursorBlock = editor.value.document.getDescendant('anchor');

    editor.moveToRangeOfNode(cursorBlock);

    editor.insertRow();

    editor.undo();

    return editor;
}
