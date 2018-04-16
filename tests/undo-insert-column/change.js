import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('anchor');
    const initial = change.value.change({ save: false });
    initial.moveToRangeOf(cursorBlock);
    const toTest = initial.value.change();
    plugin.changes.insertColumn(toTest);
    toTest.undo();

    // Back to previous cursor position
    expect(toTest.value.startBlock.text).toEqual('Col 1, Row 1');

    return toTest;
}
