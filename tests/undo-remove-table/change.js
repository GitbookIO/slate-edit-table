import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('anchor');
    const initial = change.value.change({ save: false });
    initial.moveToRangeOf(cursorBlock);
    const toTest = initial.value.change();
    toTest.call(plugin.changes.removeTable).undo();

    // Back to previous cursor position
    expect(toTest.value.startBlock.text).toEqual('Before');

    return toTest;
}
