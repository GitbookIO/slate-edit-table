// @flow
import { type Node } from 'slate';
import type Options from '../../options';

function isSameTable(
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
    const startTable = document.getAncestors(startBlock.key).get(-2);
    const endTable = document.getAncestors(endBlock.key).get(-2);
    return !!(
        startTable === endTable &&
        startTable &&
        startTable.type === opts.typeTable
    );
}
export default isSameTable;
