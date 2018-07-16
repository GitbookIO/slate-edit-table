export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('anchor');
    change.moveToStartOf(cursorBlock);

    return plugin.changes.removeColumn(change);
}
