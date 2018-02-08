/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <state>
        <document>
            <paragraph>Before</paragraph>
            <table presetAlign={['left', 'left']}>
                <table_row>
                    <table_cell textAlign="left">
                        <paragraph />
                    </table_cell>
                    <table_cell textAlign="left">
                        <paragraph />
                    </table_cell>
                </table_row>
                <table_row>
                    <table_cell textAlign="left">
                        <paragraph />
                    </table_cell>
                    <table_cell textAlign="left">
                        <paragraph />
                    </table_cell>
                </table_row>
            </table>
        </document>
    </state>
);
