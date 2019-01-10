export default function(editor) {
    const { value } = editor;
    const blockStart = value.document.getDescendant('anchor');
    const blockEnd = value.document.getDescendant('focus');

    editor.moveToStartOfNode(blockStart).moveFocusToEndOfNode(blockEnd);

    return editor.run('onKeyDown', {
        key: 'Backspace',
        preventDefault() {},
        stopPropagation() {},
    });
}
