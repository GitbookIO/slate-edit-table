module.exports = function(plugin, state) {
    let transform = state.transform();

    const cursorBlock = state.document.getDescendant('_cursor');
    state = transform.moveToRangeOf(cursorBlock).apply();
    return plugin.transforms.setColumnWidth(state.transform(), 50).apply();
};
