module.exports = function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    return plugin.changes.insertColumn(change, 1);
};
