import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const paragraph = value.document.getDescendant('paragraph');
    const table11 = value.document.getDescendant('table11');
    const table12 = value.document.getDescendant('table12');
    const cellText = value.document.getDescendant('cellText');
    const table2 = value.document.getDescendant('table2');

    change.moveToStartOfNode(paragraph);
    expect(plugin.utils.isSelectionInTable(change.value)).toBe(false);

    change.moveToStartOfNode(cellText);
    expect(plugin.utils.isSelectionInTable(change.value)).toBe(true);

    change.moveToStartOfNode(table11);
    expect(plugin.utils.isSelectionInTable(change.value)).toBe(true);

    change.moveFocusToEndOfNode(table12);
    expect(plugin.utils.isSelectionInTable(change.value)).toBe(true);

    change.moveFocusToEndOfNode(table2);
    expect(plugin.utils.isSelectionInTable(change.value)).toBe(false);
}
