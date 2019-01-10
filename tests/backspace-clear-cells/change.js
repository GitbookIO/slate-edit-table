export default function(editor) {
    const { value } = editor;
    const blockStart = value.document.getDescendant('anchor');
    const blockEnd = value.document.getDescendant('focus');

    const withCursor = editor
        .moveToStartOfNode(blockStart)
        .moveFocusToEndOfNode(blockEnd);

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
