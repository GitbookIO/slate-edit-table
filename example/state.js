/** @jsx h */
// eslint-disable-next-line
import { createHyperscript } from 'slate-hyperscript';

const h = createHyperscript({
    blocks: {
        heading: 'heading',
        paragraph: 'paragraph',
        table: 'table',
        table_row: 'table_row',
        table_cell: 'table_cell'
    }
});

const state = (
    <state>
        <document>
            <heading>Slate + Table Edition</heading>
            <paragraph>
                This page is a basic example of Slate + slate-edit-table plugin.
            </paragraph>
            <table>
                <table_row>
                    <table_cell>
                        <text>Cell 0,0</text>
                    </table_cell>
                    <table_cell>
                        <text>Cell 0,1</text>
                    </table_cell>
                </table_row>
                <table_row>
                    <table_cell>
                        <text>Cell 1,0</text>
                    </table_cell>
                    <table_cell>
                        <text>Cell 1,1</text>
                    </table_cell>
                </table_row>
                <table_row>
                    <table_cell>
                        <text>Cell 2,0</text>
                    </table_cell>
                    <table_cell>
                        <text>Cell 2,1</text>
                    </table_cell>
                </table_row>
            </table>
            <paragraph>
                Use Tab and Shift+Tab to move from cell to cells. Press Enter to
                go to next row. Press Up/Down to navigate the rows.
            </paragraph>
        </document>
    </state>
);

export default state;
