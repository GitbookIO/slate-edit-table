export default function(plugin, change) {
    return plugin.changes.removeColumn(change, 0);
}
