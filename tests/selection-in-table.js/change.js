import expect from 'expect';

export default function(plugin, change) {
    const { state } = change;
    const start = state.document.getDescendant('start');
    const end = state.document.getDescendant('end');

    change.collapseToStartOf(start);

    expect(plugin.utils.isSelectionInTable(change.state)).toBe(true);

    change.extendToEndOf(end);

    expect(plugin.utils.isSelectionInTable(change.state)).toBe(false);
}
