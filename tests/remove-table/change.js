export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    return plugin.changes.removeTable(change);
}
