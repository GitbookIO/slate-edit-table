export default function(plugin, change) {
    return plugin.changes.removeRow(change, 1);
}
