import expect from 'expect';

export default function(editor) {
    const blockStart = editor.value.document.getDescendant('anchor');
    editor.moveToStartOfNode(blockStart);

    const result = editor.run('onKeyDown', {
        key: 'Enter',
        metaKey: true,
        preventDefault() {},
        stopPropagation() {},
    });

    expect(result.value.startBlock.type).toBe('paragraph');

    return result;
}
