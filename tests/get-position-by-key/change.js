import expect from 'expect';

export default function(editor) {
    const table = editor.value.document.getClosest(
        'cell',
        el => el.key === 'table',
    );
    const position = editor.getPositionByKey(table, 'cell');

    expect(position.getWidth()).toEqual(3);
    expect(position.getHeight()).toEqual(3);
    expect(position.getRowIndex()).toEqual(1);
    expect(position.getColumnIndex()).toEqual(1);

    return editor;
}
