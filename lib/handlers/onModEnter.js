// @flow
import { Block, Text, type Change } from 'slate';

import { TablePosition } from '../utils';
import type Options from '../options';

/**
 * Exit the current table, by inserting a default block after the table.
 */
function onModEnter(
    opts: Options,
    event: *,
    editor: *,
    next: () => {},
): void | Change {
    const { value } = editor;
    if (!value.selection.isCollapsed) {
        return next();
    }

    event.preventDefault();

    const exitBlock = Block.create({
        type: opts.exitBlockType,
        nodes: [Text.create('')],
    });

    const table = TablePosition.create(
        opts,
        value.document,
        value.selection.start.key,
    ).table;
    const tableParent = value.document.getParent(table.key);
    const insertionIndex = tableParent.nodes.indexOf(table) + 1;

    return editor
        .insertNodeByKey(tableParent.key, insertionIndex, exitBlock)
        .moveToStartOfNode(exitBlock);
}

export default onModEnter;
