import expect from 'expect';
import { Range } from 'slate';

export default function(plugin, change) {
    const { document } = change.value;
    const anchorBlock = document.getDescendant('_anchor_');
    const focusBlock = document.getDescendant('_focus_');
    const range = Range.create()
        .moveAnchorToStartOf(anchorBlock)
        .moveAnchor(1)
        .moveFocusToStartOf(focusBlock)
        .moveFocus(1);

    const fragment = plugin.utils.getFragmentAtRange(document, range);
    expect(fragment.nodes.size).toEqual(1);
    expect(fragment.object === 'document');
    change.replaceNodeByKey(document.nodes.first().key, fragment.nodes.first());
    return change;
}
