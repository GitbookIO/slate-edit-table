export default function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    return plugin.changes.insertColumn(change, 1);
}
