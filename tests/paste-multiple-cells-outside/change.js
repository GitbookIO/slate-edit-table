import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;

    // Copy the selection
    let copiedFragment = plugin.utils.getCopiedFragment(value);
    // Default copy in this case
    expect(copiedFragment).toBeFalsy();

    copiedFragment = value.fragment;

    // Paste it
    return change
        .select({
            anchorKey: 'paste-here',
            anchorOffset: 4,
            focusKey: 'paste-here',
            focusOffset: 4
        })
        .insertFragment(copiedFragment);
}
