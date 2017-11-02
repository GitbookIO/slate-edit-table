const expect = require('expect');

module.exports = function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('_cursor_');
    const initial = change.value.change({ save: false });
    initial.moveToRangeOf(cursorBlock);
    const toTest = initial.value.change();
    toTest.call(plugin.changes.removeTable).undo();

    // Back to previous cursor position
    expect(toTest.value.startBlock.text).toEqual('Before');

    return toTest;
};
