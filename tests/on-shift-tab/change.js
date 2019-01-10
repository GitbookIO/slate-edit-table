import expect from 'expect';

export default function(editor) {
    const cursorBlock = editor.value.document.getDescendant('anchor');
    editor.moveToRangeOfNode(cursorBlock);

    const initialPosition = editor.getPosition(editor.value);

    editor.run('onKeyDown',
        {
            key: 'Tab',
            shiftKey: true,
            preventDefault() {},
            stopPropagation() {},
        },
        editor,
    );

    const position = editor.getPosition(editor.value);

    // Same row
    expect(position.getRowIndex()).toEqual(initialPosition.getRowIndex());
    // Moved to previous column
    expect(position.getColumnIndex()).toEqual(
        initialPosition.getColumnIndex() - 1,
    );

    return editor;
}
