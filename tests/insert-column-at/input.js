/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <document>
        <table presetAlign={['center', 'center']}>
            <table_row>
                <table_cell>Col 0, Row 0</table_cell>
                <table_cell>Col 1, Row 0</table_cell>
            </table_row>
            <table_row>
                <table_cell>Col 0, Row 1</table_cell>
                <table_cell key="_cursor_">Col 1, Row 1</table_cell>
            </table_row>
            <table_row>
                <table_cell>Col 0, Row 2</table_cell>
                <table_cell>Col 1, Row 2</table_cell>
            </table_row>
        </table>
    </document>
);
