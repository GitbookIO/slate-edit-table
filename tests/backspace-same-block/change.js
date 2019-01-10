import expect from 'expect';

export default function(editor) {
    const { value } = editor;
    const blockStart = value.document.getDescendant('anchor');
    const blockEnd = value.document.getDescendant('anchor');

    const withCursor = editor
        .moveToStartOfNode(blockStart)
        .moveFocusToEndOfNode(blockEnd);

    const result = editor.run('onKeyDown', {
        key: 'Backspace',
        preventDefault() {},
        stopPropagation() {},
    });

    expect(result).toBe(undefined);

    return editor;
}
