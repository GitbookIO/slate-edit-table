module.exports = function(plugin, change) {
    return plugin.changes.setColumnAlign(change, 'left', 0);
};
