import expect from 'expect';
import { is } from 'immutable';

export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('anchor');
    const offset = 2;

    change.moveToRangeOf(cursorBlock).move(offset);

    const position = plugin.utils.getPosition(change.value);

    expect(position.getWidth()).toEqual(3);
    expect(position.getHeight()).toEqual(3);
    expect(position.getRowIndex()).toEqual(1);
    expect(position.getColumnIndex()).toEqual(1);

    // Make sure that passing the node directly results in the same position
    expect(
        is(position, plugin.utils.getPosition(change.value, cursorBlock.key))
    );

    return value;
}
