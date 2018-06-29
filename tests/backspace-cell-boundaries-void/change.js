export default function(plugin, change) {
    return plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );
}
