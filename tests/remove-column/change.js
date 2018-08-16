export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('anchor');
    change.moveToStartOfNode(cursorBlock);

    return plugin.changes.removeColumn(change);
}
