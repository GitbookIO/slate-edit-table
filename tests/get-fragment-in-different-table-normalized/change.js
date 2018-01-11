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
    const prevNodes = change.value.document.nodes;
    expect(fragment.nodes.size === 3);
    prevNodes.forEach((block, index) => {
        const nextBlock = fragment.nodes.get(index);
        change.replaceNodeByKey(block.key, nextBlock);
    });
    return change;
}
