/* @flow */
import { type Value, type Document } from 'slate';

import type Options from '../options';
import { isSelectionInTable, TablePosition } from '../utils';

/*
 * Alters what is copied to the clipboard in the following cases:
 * - Copying the content of a single cell
 */
function getCopiedFragment(opts: Options, value: Value): ?Document {
    // Outside of tables, do not alter copy behavior
    if (!isSelectionInTable(opts, value)) {
        return undefined;
    }

    const { selection, document } = value;
    const anchorPosition = TablePosition.create(
        opts,
        document,
        selection.anchorKey
    );
    const focusPosition = TablePosition.create(
        opts,
        document,
        selection.focusKey
    );

    if (focusPosition.cell !== anchorPosition.cell) {
        return undefined;
    }

    // The selection is inside a single cell. Only copy the content of that cell
    const baseFragment = value.fragment;

    const copiedCell = baseFragment
        .getAncestors(baseFragment.getFirstText().key)
        .findLast(n => n.type === opts.typeCell);

    return baseFragment.merge({
        nodes: copiedCell.nodes
    });
}

export default getCopiedFragment;
