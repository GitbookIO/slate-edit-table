/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <value>
        <document>
            <table>
                <table_row>
                    <table_cell>
                        <paragraph>Col 0, Row 0</paragraph>
                    </table_cell>
                    <table_cell>
                        <paragraph>Col 1, Row 0</paragraph>
                    </table_cell>
                </table_row>
                <table_row>
                    <table_cell>
                        <paragraph>Row 0</paragraph>
                    </table_cell>
                    <table_cell>
                        <paragraph>Col 1, Row 0</paragraph>
                    </table_cell>
                </table_row>
                <table_row>
                    <table_cell>
                        <paragraph>Col 0</paragraph>
                    </table_cell>
                    <table_cell>
                        <paragraph />
                    </table_cell>
                </table_row>
            </table>
        </document>
    </value>
);
