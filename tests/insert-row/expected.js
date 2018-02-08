/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <state>
        <document>
            <table presetAlign={['left', 'left', 'left']}>
                <table_row>
                    <table_cell>
                        <paragraph>Col 0, Row 0</paragraph>
                    </table_cell>
                    <table_cell>
                        <paragraph>Col 1, Row 0</paragraph>
                    </table_cell>
                    <table_cell>
                        <paragraph>Col 2, Row 0</paragraph>
                    </table_cell>
                </table_row>
                <table_row>
                    <table_cell>
                        <paragraph>Col 0, Row 1</paragraph>
                    </table_cell>
                    <table_cell>
                        <paragraph>Col 1, Row 1</paragraph>
                    </table_cell>
                    <table_cell>
                        <paragraph>Col 2, Row 1</paragraph>
                    </table_cell>
                </table_row>
                <table_row>
                    <table_cell textAlign="left" />
                    <table_cell textAlign="left" />
                    <table_cell textAlign="left" />
                </table_row>
            </table>
        </document>
    </state>
);
