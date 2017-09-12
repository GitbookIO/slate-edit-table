module.exports = function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('_cursor_1');
    change.moveToRangeOf(cursorBlock);
    plugin.changes.setColumnAlign(change, 'center');

    const cursorBlock2 = state.document.getDescendant('_cursor_2');
    change.moveToRangeOf(cursorBlock2);
    return plugin.changes.setColumnAlign(change, 'right');
};
