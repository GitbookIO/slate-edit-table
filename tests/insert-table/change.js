export default function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock).move(6); // Cursor here: Before|After

    return plugin.changes.insertTable(change);
}
