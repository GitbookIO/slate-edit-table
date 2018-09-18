import Slate from '@gitbook/slate';

export default (plugin, change) => {
    const schema = Slate.Schema.create(plugin.schema);
    return change.normalize(schema);
};
