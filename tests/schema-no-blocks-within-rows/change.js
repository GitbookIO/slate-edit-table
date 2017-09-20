const Slate = require('slate');

module.exports = function(plugin, change) {
    const schema = Slate.Schema.create(plugin.schema);
    return change
        .normalize(schema);
};
