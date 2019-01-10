import expect from 'expect';

export default function(editor) {
    const cursorBlock = editor.value.document.getDescendant('anchor');

    editor.moveToRangeOfNode(cursorBlock).moveForward(6); // Cursor here: Before|After

    editor.insertTable(editor);

    editor.undo();

    // Back to previous cursor position
    expect(editor.value.startBlock.text).toEqual('BeforeAfter');

    return editor;
}
