// @flow
import { type Node, type Range, type Document } from 'slate';
import type Options from '../../options';
import isSameCell from '../utils/isSameCell';

function inSameCell(
    opts: Options,
    rootGetFragment: (Node, Range) => Document,
    node: Node,
    range: Range,
    next: () => Document
): Document {
    const { startKey, endKey } = range;
    if (startKey === endKey) {
        return node.getFragmentAtRange(range);
    }

    if (isSameCell(opts, node, startKey, endKey)) {
        return node.getFragmentAtRange(range);
    }
    return next();
}
export default inSameCell;
