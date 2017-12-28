// @flow
import { type Block } from 'slate';

function getAdjustedRow(row: Block, presetAlign: Array<string>) {
    if (!presetAlign) {
        return row;
    }
    const nodes = row.nodes;
    const nextRow = row.set(
        'nodes',
        nodes.map((cell, index) => {
            if (cell.data.get('textAlign') === presetAlign[index]) {
                return cell;
            }
            return cell.setIn(['data', 'textAlign'], presetAlign[index]);
        })
    );
    return nextRow;
}

export default getAdjustedRow;
