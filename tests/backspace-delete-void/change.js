import expect from 'expect';

export default function(editor) {
    const res = editor.run('onKeyDown',
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {}
        },
        editor
    );

    // expect(res).toBe(undefined);

    return editor;
}
