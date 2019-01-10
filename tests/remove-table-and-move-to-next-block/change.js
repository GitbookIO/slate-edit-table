import expect from 'expect';

export default function(editor) {
    const cursorBlock = editor.value.document.getDescendant('anchor');
    editor.moveToRangeOfNode(cursorBlock);

    editor.removeTable(editor);
    expect(editor.value.startBlock.key).toEqual('anchor_after');
    expect(editor.value.selection.start.offset).toEqual(0);
    return editor;
}
