import expect from 'expect';

export default function(editor) {
    const { value } = editor;
    const cursorBlock = value.document.getDescendant('anchor');
    const offset = 2;
    editor.moveToRangeOfNode(cursorBlock).moveForward(offset);

    editor.moveSelection(2, 2);

    expect(editor.value.startBlock.text).toEqual('Col 2, Row 2');
    const selection = editor.value.selection;
    expect(selection.start.key).toEqual(selection.end.key);

    return editor;
}
