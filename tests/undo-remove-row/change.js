export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('anchor');
    const initial = change.withoutSaving(() =>
        change.value.change().moveToRangeOfNode(cursorBlock),
    );
    const toTest = initial.value.change();
    plugin.changes.removeRow(toTest).undo();

    return toTest;
}
