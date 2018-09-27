/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <value>
        <document>
            <table>
                <table_row>
                    <table_cell>
                        <paragraph>Row 1, Col 1</paragraph>
                    </table_cell>
                </table_row>
                <paragraph>
                    <table_cell>
                        <paragraph>Row 2, Col 1</paragraph>
                    </table_cell>
                </paragraph>
                <table_row>
                    <table_cell>
                        <paragraph>Row 3, Col 1</paragraph>
                    </table_cell>
                </table_row>
            </table>
            <table>No Rows here</table>
        </document>
    </value>
);
