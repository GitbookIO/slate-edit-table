import expect from 'expect';

export default function(editor) {
    const cursorBlock = editor.value.document.getDescendant('anchor');
    editor.moveToRangeOfNode(cursorBlock);
    editor.removeTable();
    editor.undo();

    // Back to previous cursor position
    expect(editor.value.startBlock.text).toEqual('Before');

    return editor;
}
