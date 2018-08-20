import EditTable from '../../lib';

export default function(prevPlugin, change) {
    const plugin = EditTable({ exitBlockType: null });
    const cursorBlock = change.value.document.getDescendant('anchor');
    change.moveToRangeOfNode(cursorBlock);

    return plugin.changes.removeTable(change);
}
