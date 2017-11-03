export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('_cursor_');
    change
        .moveToRangeOf(cursorBlock)
        .move(6); // Cursor here: Before|After

    return plugin.changes.insertTable(change);
};
