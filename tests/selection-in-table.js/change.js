import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const start = value.document.getDescendant('start');
    const end = value.document.getDescendant('end');

    change.collapseToStartOf(start);

    expect(plugin.utils.isSelectionInTable(change.value)).toBe(true);

    change.extendToEndOf(end);

    expect(plugin.utils.isSelectionInTable(change.value)).toBe(false);
}
