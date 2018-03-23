import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const paragraph = value.document.getDescendant('paragraph');
    const table11 = value.document.getDescendant('table11');
    const table12 = value.document.getDescendant('table12');
    const cellText = value.document.getDescendant('cellText');
    const table2 = value.document.getDescendant('table2');

    change.collapseToStartOf(paragraph);
    expect(plugin.utils.isSelectionOutOfTable(change.value)).toBe(true);

    change.extendToEndOf(cellText);
    expect(plugin.utils.isSelectionOutOfTable(change.value)).toBe(false);

    change.collapseToStartOf(cellText);
    expect(plugin.utils.isSelectionOutOfTable(change.value)).toBe(false);

    change.collapseToStartOf(table11);
    expect(plugin.utils.isSelectionOutOfTable(change.value)).toBe(false);

    change.extendToEndOf(table12);
    expect(plugin.utils.isSelectionOutOfTable(change.value)).toBe(false);

    change.extendToEndOf(table2);
    expect(plugin.utils.isSelectionOutOfTable(change.value)).toBe(false);
}
