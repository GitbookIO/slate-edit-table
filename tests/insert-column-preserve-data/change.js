export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    return plugin.changes.insertColumn(change, 1);
}
