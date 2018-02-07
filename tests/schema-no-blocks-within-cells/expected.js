/** @jsx hyperscript */
/* eslint-disable react/void-dom-elements-no-children */
import hyperscript from '../hyperscript';

export default (
    <document>
        <table presetAlign={['left', 'left', 'left']}>
            <table_row>
                <table_cell>Row 1, Col 1Row 1, Col 1, Content2</table_cell>
                <table_cell>
                    <link>Row 1, Col 2</link>
                </table_cell>
                <table_cell>Row 1, Col 3</table_cell>
            </table_row>
        </table>
    </document>
);
