import expect from 'expect';

export default function(plugin, change) {
    const blockStart = change.value.document.getDescendant('anchor');
    const withCursor = change.collapseToEndOf(blockStart);

    const result = plugin.onKeyDown(
        {
            key: 'Enter',
            shiftKey: true,
            preventDefault() {},
            stopPropagation() {}
        },
        withCursor
    );

    expect(result.value.startBlock.type).toBe('paragraph');

    return result;
}
