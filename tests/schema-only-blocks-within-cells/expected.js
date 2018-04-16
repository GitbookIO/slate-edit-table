/** @jsx hyperscript */
/* eslint-disable react/void-dom-elements-no-children */
import hyperscript from '../hyperscript';

export default (
    <value>
        <document>
            <table>
                <table_row>
                    <table_cell>
                        <paragraph>Row 1, Col 1</paragraph>
                    </table_cell>
                    <table_cell>
                        <paragraph>
                            <link>Row 1, Col 2</link> with some text
                        </paragraph>
                    </table_cell>
                    <table_cell>
                        <paragraph>Row 1, Col 3</paragraph>
                    </table_cell>
                </table_row>
            </table>
        </document>
    </value>
);
