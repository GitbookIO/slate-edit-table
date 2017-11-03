export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('_cursor_1');
    change.moveToRangeOf(cursorBlock);
    plugin.changes.setColumnAlign(change, 'center');

    const cursorBlock2 = value.document.getDescendant('_cursor_2');
    change.moveToRangeOf(cursorBlock2);
    return plugin.changes.setColumnAlign(change, 'right');
};
