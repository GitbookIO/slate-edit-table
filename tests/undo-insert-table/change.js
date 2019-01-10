export default function(editor) {
    const cursorBlock = editor.value.document.getDescendant('anchor');

    editor
        .moveToRangeOfNode(cursorBlock)
        .moveForward(6)
        .insertTable()
        .undo();

    return editor;
}
