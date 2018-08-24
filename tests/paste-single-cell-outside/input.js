/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <value>
        <document>
            <table>
                <table_row>
                    <table_cell>
                        <paragraph>
                            <anchor />Col 0<focus />, Row 0
                        </paragraph>
                    </table_cell>
                    <table_cell>
                        <paragraph>Col 1, Row 0</paragraph>
                    </table_cell>
                </table_row>
                <table_row>
                    <table_cell>
                        <paragraph>Col 0, Row 1</paragraph>
                    </table_cell>
                    <table_cell>
                        <paragraph>Col 1, Row 1</paragraph>
                    </table_cell>
                </table_row>
            </table>
            <paragraph>
                <text key="paste-here">Elsewhere</text>
            </paragraph>
        </document>
    </value>
);
