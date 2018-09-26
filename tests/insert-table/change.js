export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('anchor');
    change.moveToRangeOfNode(cursorBlock).moveForward(6); // Cursor here: Before|After

    return plugin.changes.insertTable(change);
}
