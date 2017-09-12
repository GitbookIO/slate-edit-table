module.exports = function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('_cursor_');
    change
        .moveToRangeOf(cursorBlock)
        .move(6); // Cursor here: Before|After

    return plugin.changes.insertTable(change);
};
