// @flow
import { type Node } from 'slate';
import type Options from '../../options';

function isSameRow(
    opts: Options,
    document: Node,
    startKey: string,
    endKey: string
): boolean {
    const startBlock = document.getClosestBlock(startKey);
    const endBlock = document.getClosestBlock(endKey);
    if (
        !startBlock ||
        !endBlock ||
        startBlock.type !== opts.typeCell ||
        endBlock.type !== opts.typeCell
    ) {
        return false;
    }
    const startRow = document.getParent(startBlock.key);

    return !!(
        startRow &&
        startRow.type === opts.typeRow &&
        startRow.nodes.indexOf(endBlock) !== -1
    );
}
export default isSameRow;
