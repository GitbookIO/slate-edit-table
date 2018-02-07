/** @jsx hyperscript */
import hyperscript from '../hyperscript';

export default (
    <document>
        <table presetAlign={['left', 'left', 'left']}>
            <table_row>
                <table_cell>
                    <paragraph>Row 1, Col 1</paragraph>
                    <paragraph>Row 1, Col 1, Content2</paragraph>
                </table_cell>
                <table_cell>
                    <link>Row 1, Col 2</link>
                </table_cell>
                <table_cell>Row 1, Col 3</table_cell>
            </table_row>
        </table>
    </document>
);
