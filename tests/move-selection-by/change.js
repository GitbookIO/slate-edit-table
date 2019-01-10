import expect from 'expect';

export default function(editor) {
    const { value } = editor;
    const cursorBlock = value.document.getDescendant('anchor');
    const offset = 2;
    editor.moveToRangeOfNode(cursorBlock).moveForward(offset);

    editor.moveSelectionBy(-1, -1);

    expect(editor.value.startBlock.text).toEqual('Col 0, Row 0');
    const selection = editor.value.selection;
    expect(selection.start.key).toEqual(selection.end.key);

    return editor;
}
