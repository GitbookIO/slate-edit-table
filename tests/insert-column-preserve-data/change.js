export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('anchor');
    change.moveToRangeOfNode(cursorBlock);

    return plugin.changes.insertColumn(change, 1);
}
