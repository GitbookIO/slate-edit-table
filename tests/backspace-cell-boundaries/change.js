export default function(editor) {
    editor.run('onKeyDown', {
        key: 'Backspace',
        preventDefault() {},
        stopPropagation() {},
    });
    return editor;
}
