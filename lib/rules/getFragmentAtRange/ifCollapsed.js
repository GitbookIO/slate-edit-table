// @flow

import { type Node, type Range, type Document } from 'slate';
import type Options from '../../options';

function ifCollapsed(
    opts: Options,
    rootGetFragment: (Node, Range) => Document,
    node: Node,
    range: Range,
    next: () => Document
): Document {
    if (range.isCollapsed) {
        return node.getFragmentAtRange(range);
    }
    return next();
}
export default ifCollapsed;
