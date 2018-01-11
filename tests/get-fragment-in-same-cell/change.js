import { Range } from 'slate';
import expect from 'expect';

export default function(plugin, change) {
    const { document } = change.value;
    const cursorBlock = document.getDescendant('_cursor_');
    const range = Range.create()
        .moveAnchorToStartOf(cursorBlock)
        .moveAnchor(1)
        .moveFocusToEndOf(cursorBlock);

    const fragment = plugin.utils.getFragmentAtRange(document, range);
    expect(fragment.nodes.size).toEqual(1);
    change.replaceNodeByKey(document.nodes.first().key, fragment.nodes.first());
    return change;
}
