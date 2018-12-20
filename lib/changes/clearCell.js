import { Block } from 'slate';

/**
 * Clear the content of the given cell
 */
function clearCell(opts, editor, cell) {
    const newBlock = Block.create({ type: opts.typeContent });
    const { nodes } = cell;

    // Insert a new empty node
    editor.withoutNormalizing(() => {
        editor.insertNodeByKey(cell.key, 0, newBlock);
    });

    // Remove all previous nodes
    nodes.forEach(node => {
        editor.removeNodeByKey(node.key);
    });

    return editor;
}

export default clearCell;
