import expect from 'expect';

export default function(editor) {
    const cursorBlock = editor.value.document.getDescendant('anchor');
    editor.moveToRangeOfNode(cursorBlock);

    editor.removeTable(editor);
    const { value } = editor;
    expect(value.startBlock.type).toEqual('paragraph');
    expect(editor.value.selection.start.offset)
        .toEqual(editor.value.startBlock.text.length)
        .toEqual(0);
    return editor;
}
