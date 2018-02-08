export default function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('anchor1');
    change.moveToRangeOf(cursorBlock);
    plugin.changes.setColumnAlign(change, 'center');

    const cursorBlock2 = state.document.getDescendant('anchor2');
    change.moveToRangeOf(cursorBlock2);
    return plugin.changes.setColumnAlign(change, 'right');
}
