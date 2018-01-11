// @flow
import { type Node } from 'slate';
import type Options from '../../options';

function isSameCell(
    opts: Options,
    document: Node,
    startKey: string,
    endKey: string
): boolean {
    const startBlock = document.getClosestBlock(startKey);
    const endBlock = document.getClosestBlock(endKey);
    return !!(
        startBlock &&
        startBlock === endBlock &&
        startBlock.type === opts.typeCell &&
        endBlock.type === opts.typeCell
    );
}
export default isSameCell;
