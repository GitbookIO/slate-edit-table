import Slate from 'slate';

/**
 * @param plugin
 * @param {Slate.Change} change
 * @returns {Slate.Change}
 */
export default (plugin, change) => {
    const schema = Slate.Schema.create(plugin.schema);
    return change.normalize(schema);
};
