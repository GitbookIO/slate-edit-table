/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <document>
        <table>No rows</table>
        <table>
            <table_row>
                <table_cell>Row 1, Col 1</table_cell>
            </table_row>
            <paragraph>
                <table_cell>Row 2, Col 1</table_cell>
            </paragraph>
            <table_row>
                <table_cell>Row 3, Col 1</table_cell>
            </table_row>
        </table>
    </document>
);
