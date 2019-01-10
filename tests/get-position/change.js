import expect from 'expect';

export default function(editor) {
    const position = editor.getPosition(editor.value);

    expect(position.getWidth()).toEqual(3);
    expect(position.getHeight()).toEqual(3);
    expect(position.getRowIndex()).toEqual(1);
    expect(position.getColumnIndex()).toEqual(1);

    return editor;
}
