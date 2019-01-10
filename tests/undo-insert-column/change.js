import expect from 'expect';

export default function(editor) {
    const cursorBlock = editor.value.document.getDescendant('anchor');

    editor.moveToRangeOfNode(cursorBlock);

    editor.insertColumn(editor);
    editor.undo();

    // Back to previous cursor position
    expect(editor.value.startBlock.text).toEqual('Col 1, Row 1');

    return editor;
}
