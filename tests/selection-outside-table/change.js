import expect from 'expect';

export default function(editor) {
    const { value } = editor;
    const paragraph = value.document.getDescendant('paragraph');
    const table11 = value.document.getDescendant('table11');
    const table12 = value.document.getDescendant('table12');
    const cellText = value.document.getDescendant('cellText');
    const table2 = value.document.getDescendant('table2');

    editor.moveToStartOfNode(paragraph);
    expect(editor.isSelectionOutOfTable(editor.value)).toBe(true);

    editor.moveFocusToEndOfNode(cellText);
    expect(editor.isSelectionOutOfTable(editor.value)).toBe(false);

    editor.moveToStartOfNode(cellText);
    expect(editor.isSelectionOutOfTable(editor.value)).toBe(false);

    editor.moveToStartOfNode(table11);
    expect(editor.isSelectionOutOfTable(editor.value)).toBe(false);

    editor.moveFocusToEndOfNode(table12);
    expect(editor.isSelectionOutOfTable(editor.value)).toBe(false);

    editor.moveFocusToEndOfNode(table2);
    expect(editor.isSelectionOutOfTable(editor.value)).toBe(false);
}
