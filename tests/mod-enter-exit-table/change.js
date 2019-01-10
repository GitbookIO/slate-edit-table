import expect from 'expect';

export default function(editor) {
    const blockStart = editor.value.document.getDescendant('anchor');
    const withCursor = editor.moveToStartOfNode(blockStart);

    const result = editor.run('onKeyDown',
        {
            key: 'Enter',
            metaKey: true,
            preventDefault() {},
            stopPropagation() {}
        },
        withCursor
    );

    expect(result.value.startBlock.type).toBe('paragraph');

    return result;
}
