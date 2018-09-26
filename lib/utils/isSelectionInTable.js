// @flow

import type { Value } from 'slate';

import type Options from '../options';
import isRangeInTable from './isRangeInTable';

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts: Options, value: Value): boolean {
    if (!value.selection.start.key) return false;
    return isRangeInTable(opts, value.document, value.selection);
}

export default isSelectionInTable;
