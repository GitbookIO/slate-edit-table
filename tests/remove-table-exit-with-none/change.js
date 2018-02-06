// import expect from 'expect';
import EditTable from '../../lib';

export default function(prevPlugin, change) {
    const plugin = EditTable({ exitBlockType: null });
    const cursorBlock = change.state.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    return plugin.changes.removeTable(change);
}
