import TablePosition from './TablePosition';

/**
 * The position of the selection start block, in the current table
 */
function getPosition(opts, editor) {
    const { value } = editor;
    return TablePosition.create(
        opts,
        value.document,
        value.selection.start.key,
    );
}

export default getPosition;
