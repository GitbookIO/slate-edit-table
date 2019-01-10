export default function(editor) {
    const { value } = editor;
    const blockStart = value.document.getDescendant('anchor');

    const withCursor = editor.moveToStartOfNode(blockStart);

    editor.run(
        'onKeyDown',
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {},
        },
        withCursor,
    );

    return editor;
}
