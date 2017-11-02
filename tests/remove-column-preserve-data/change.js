module.exports = function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    return plugin.changes.removeColumn(change);
};
