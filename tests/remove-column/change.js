export default function(editor) {
    const { value } = editor;
    const cursorBlock = value.document.getDescendant('anchor');
    editor.moveToStartOfNode(cursorBlock);

    return editor.removeColumn();
}
