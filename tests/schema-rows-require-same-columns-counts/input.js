/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <document>
        <table presetAlign={['left', 'left', 'left']}>
            <table_row>
                <table_cell>Row 1, Col 1</table_cell>
                <table_cell>Row 1, Col 2</table_cell>
                <table_cell>Row 1, Col 3</table_cell>
            </table_row>
            <table_row>There is no columns here</table_row>
            <table_row>
                <table_cell>Row 3, Col 1</table_cell>
                <invalid>Row 3, Col 2</invalid>
                <table_cell>Row 3, Col 3</table_cell>
            </table_row>
        </table>
    </document>
);
