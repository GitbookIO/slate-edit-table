export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('anchor');
    const initial = change.value.change({ save: false });
    initial.moveToRangeOf(cursorBlock);
    const toTest = initial.value.change();
    plugin.changes.removeColumn(toTest);
    toTest.undo();

    return toTest;
}
