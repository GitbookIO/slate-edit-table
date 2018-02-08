import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('anchor');
    const initial = change.state.change({ save: false });
    initial.moveToRangeOf(cursorBlock);
    const toTest = initial.state.change();
    plugin.changes.insertColumn(toTest);
    toTest.undo();

    // Back to previous cursor position
    expect(toTest.state.startBlock.text).toEqual('Col 1, Row 1');

    return toTest;
}
