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
                        <paragraph>
                            <text key="cell">Col 1, Row 0</text>
                        </paragraph>
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
                <text key="outside">
                    <anchor />Elsewhere<focus />
                </text>
            </paragraph>
        </document>
    </value>
);
