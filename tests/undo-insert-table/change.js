import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('anchor');
    const initial = change.withoutSaving(() => change.value.change());

    initial.moveToRangeOfNode(cursorBlock).moveForward(6); // Cursor here: Before|After

    const toTest = initial.value.change();

    plugin.changes.insertTable(toTest);

    toTest.undo();

    // Back to previous cursor position
    expect(toTest.value.startBlock.text).toEqual('BeforeAfter');

    return toTest;
}
