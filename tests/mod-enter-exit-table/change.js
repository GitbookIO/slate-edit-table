import expect from 'expect';

export default function(plugin, change) {
    const blockStart = change.state.document.getDescendant('anchor');
    const withCursor = change.collapseToStartOf(blockStart);

    const result = plugin.onKeyDown(
        {
            key: 'Enter',
            metaKey: true,
            preventDefault() {},
            stopPropagation() {}
        },
        null,
        withCursor
    );

    expect(result.state.startBlock.type).toBe('paragraph');

    return result;
}
