// @flow
/* eslint-disable import/no-extraneous-dependencies */
/* global document */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate-react';

import PluginEditTable from '../lib/';
import INITIAL_STATE from './state';

const tablePlugin = PluginEditTable({
    typeContent: 'text_block'
});

const plugins = [tablePlugin];

const schema = {
    nodes: {
        table: ({ attributes, children }: *) => (
            <table>
                <tbody {...attributes}>{children}</tbody>
            </table>
        ),
        table_row: ({ attributes, children }: *) => (
            <tr {...attributes}>{children}</tr>
        ),
        table_cell: ({ node, attributes, children }: *) => {
            let textAlign = node.get('data').get('textAlign');
            textAlign =
                ['left', 'right', 'center'].indexOf(textAlign) === -1
                    ? 'left'
                    : textAlign;
            return (
                <td style={{ textAlign }} {...attributes}>
                    {children}
                </td>
            );
        },
        paragraph: ({ attributes, children }: *) => (
            <p {...attributes}>{children}</p>
        ),
        heading: ({ attributes, children }: *) => (
            <h1 {...attributes}>{children}</h1>
        ),
        text_block: ({ attributes, children }: *) => (
            <span {...attributes}>{children}</span>
        )
    }
};

class Example extends React.Component<*, *> {
    submitChange: Function;
    editorREF: Editor;
    state = {
        state: INITIAL_STATE
    };

    renderTableToolbar() {
        return (
            <div>
                <button onMouseDown={this.onInsertColumn}>Insert Column</button>
                <button onMouseDown={this.onInsertRow}>Insert Row</button>
                <button onMouseDown={this.onRemoveColumn}>Remove Column</button>
                <button onMouseDown={this.onRemoveRow}>Remove Row</button>
                <button onMouseDown={this.onRemoveTable}>Remove Table</button>
                <br />
                <button onMouseDown={e => this.onSetAlign(e, 'left')}>
                    Set align left
                </button>
                <button onMouseDown={e => this.onSetAlign(e, 'center')}>
                    Set align center
                </button>
                <button onMouseDown={e => this.onSetAlign(e, 'right')}>
                    Set align right
                </button>
            </div>
        );
    }

    renderNormalToolbar() {
        return (
            <div>
                <button onClick={this.onInsertTable}>Insert Table</button>
            </div>
        );
    }

    setEditorComponent = (ref: Editor) => {
        this.editorREF = ref;
        this.submitChange = ref.change;
    };

    onChange = ({ state }) => {
        this.setState({
            state
        });
    };

    onInsertTable = event => {
        event.preventDefault();
        this.submitChange(tablePlugin.changes.insertTable);
    };

    onInsertColumn = event => {
        event.preventDefault();
        this.submitChange(tablePlugin.changes.insertColumn);
    };

    onInsertRow = event => {
        event.preventDefault();
        this.submitChange(tablePlugin.changes.insertRow);
    };

    onRemoveColumn = event => {
        event.preventDefault();
        this.submitChange(tablePlugin.changes.removeColumn);
    };

    onRemoveRow = event => {
        event.preventDefault();
        this.submitChange(tablePlugin.changes.removeRow);
    };

    onRemoveTable = event => {
        event.preventDefault();
        this.submitChange(tablePlugin.changes.removeTable);
    };

    onSetAlign = (event, align) => {
        event.preventDefault();
        this.submitChange(change =>
            change.call(tablePlugin.changes.setColumnAlign, align)
        );
    };

    render() {
        const { state } = this.state;
        const isInTable = tablePlugin.utils.isSelectionInTable(state);
        const isOutTable = tablePlugin.utils.isSelectionOutOfTable(state);

        return (
            <div>
                {isInTable ? this.renderTableToolbar() : null}
                {isOutTable ? this.renderNormalToolbar() : null}
                <Editor
                    ref={this.setEditorComponent}
                    placeholder={'Enter some text...'}
                    schema={schema}
                    plugins={plugins}
                    state={state}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

// $FlowFixMe
ReactDOM.render(<Example />, document.getElementById('example'));
