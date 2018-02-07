/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <document>
        <table custom="state" presetAlign={['center', 'right']}>
            <table_row>
                <table_cell textAlign="center">Col 0, Row 0</table_cell>
                <table_cell textAlign="right">Col 1, Row 0</table_cell>
            </table_row>
            <table_row>
                <table_cell textAlign="center">Col 0, Row 1</table_cell>
                <table_cell textAlign="right">Col 1, Row 1</table_cell>
            </table_row>
            <table_row>
                <table_cell textAlign="center">Col 0, Row 2</table_cell>
                <table_cell textAlign="right">Col 1, Row 2</table_cell>
            </table_row>
        </table>
    </document>
);
