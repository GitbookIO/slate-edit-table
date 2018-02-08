export default function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('anchor');
    const initial = change.state.change({ save: false });
    initial.moveToRangeOf(cursorBlock);
    const toTest = initial.state.change();
    plugin.changes.removeColumn(toTest);
    toTest.undo();

    return toTest;
}
