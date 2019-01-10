import expect from 'expect';

export default function(editor) {
    const cursorBlock = editor.value.document.getDescendant('anchor');
    editor.moveToRangeOfNode(cursorBlock);

    editor.run('onKeyDown',
        {
            key: 'Tab',
            preventDefault() {},
            stopPropagation() {},
        },
        editor,
    );

    const position = editor.getPosition(editor.value);

    // Last row (new one)
    expect(position.getRowIndex()).toEqual(2);
    // First cell
    expect(position.getColumnIndex()).toEqual(0);

    return editor;
}
