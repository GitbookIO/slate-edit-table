import { createHyperscript } from '@gitbook/slate-hyperscript';

const h = createHyperscript({
    blocks: {
        heading: 'heading',
        paragraph: 'paragraph',
        table: 'table',
        table_row: 'table_row',
        table_cell: 'table_cell',
        image: {
            type: 'image',
            isVoid: true
        }
    },
    inlines: {
        link: 'link'
    }
});

export default h;
