// @flow
import { type Node, type Range, type Document } from 'slate';
import type Options from '../../options';
import isSameRow from '../utils/isSameRow';

function inSameRow(
    opts: Options,
    rootGetFragment: (Node, Range) => Document,
    node: Node,
    range: Range,
    next: () => Document
): Document {
    const { startKey, endKey } = range;
    if (isSameRow(opts, node, startKey, endKey)) {
        return node.getFragmentAtRange(range);
    }
    return next();
}

export default inSameRow;
