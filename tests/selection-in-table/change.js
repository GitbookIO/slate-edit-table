import expect from 'expect';

export default function(plugin, change) {
    const { state } = change;
    const paragraph = state.document.getDescendant('paragraph');
    const table11 = state.document.getDescendant('table11');
    const table12 = state.document.getDescendant('table12');
    const table2 = state.document.getDescendant('table2');

    change.collapseToStartOf(paragraph);
    expect(plugin.utils.isSelectionInTable(change.state)).toBe(false);

    change.collapseToStartOf(table11);
    expect(plugin.utils.isSelectionInTable(change.state)).toBe(true);

    change.extendToEndOf(table12);
    expect(plugin.utils.isSelectionInTable(change.state)).toBe(true);

    change.extendToEndOf(table2);
    expect(plugin.utils.isSelectionInTable(change.state)).toBe(false);
}
