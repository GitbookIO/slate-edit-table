export default function(plugin, editor, next) {
    return plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {},
        },
        editor,
        next,
    );
}
