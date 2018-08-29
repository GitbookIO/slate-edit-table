import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;

    // Copy the selection
    const copiedFragment = plugin.utils.getCopiedFragment(value);
    expect(copiedFragment).toBeTruthy();

    // Paste it
    return change
        .select({
            anchorKey: 'paste-here',
            anchorOffset: 7,
            focusKey: 'paste-here',
            focusOffset: 7
        })
        .insertFragment(copiedFragment);
}
