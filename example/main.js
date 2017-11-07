// @flow
/* eslint-disable import/no-extraneous-dependencies */
/* global document */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { type Node } from 'slate';
import { Editor } from 'slate-react';

import PluginEditTable from '../lib/';
import INITIAL_VALUE from './value';

const tablePlugin = PluginEditTable();
const plugins = [tablePlugin];

type NodeProps = {
    attributes: Object,
    node: Node,
    children: React.Node
};

function renderNode(props: NodeProps): React.Node {
    const { node, attributes, children } = props;
    let textAlign;

    switch (node.type) {
        case 'table':
            return (
                <table>
                    <tbody {...attributes}>{children}</tbody>
                </table>
            );
        case 'table_row':
            return <tr {...attributes}>{children}</tr>;
        case 'table_cell':
            textAlign = node.get('data').get('align') || 'left';
            return (
                <td style={{ textAlign }} {...attributes}>
                    {children}
                </td>
            );
        case 'paragraph':
            return <p {...attributes}>{children}</p>;
        case 'heading':
            return <h1 {...attributes}>{children}</h1>;
        default:
            return null;
    }
}

class Example extends React.Component<*, *> {
    state = {
        value: INITIAL_VALUE
    };

    renderTableToolbar() {
        return (
            <div>
                <button onClick={this.onInsertColumn}>Insert Column</button>
                <button onClick={this.onInsertRow}>Insert Row</button>
                <button onClick={this.onRemoveColumn}>Remove Column</button>
                <button onClick={this.onRemoveRow}>Remove Row</button>
                <button onClick={this.onRemoveTable}>Remove Table</button>
                <br />
                <button onClick={e => this.onSetAlign(e, 'left')}>
                    Set align left
                </button>
                <button onClick={e => this.onSetAlign(e, 'center')}>
                    Set align center
                </button>
                <button onClick={e => this.onSetAlign(e, 'right')}>
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

    onChange = ({ value }) => {
        this.setState({
            value
        });
    };

    onInsertTable = () => {
        const { value } = this.state;

        this.onChange(tablePlugin.changes.insertTable(value.change()));
    };

    onInsertColumn = () => {
        const { value } = this.state;

        this.onChange(tablePlugin.changes.insertColumn(value.change()));
    };

    onInsertRow = () => {
        const { value } = this.state;

        this.onChange(tablePlugin.changes.insertRow(value.change()));
    };

    onRemoveColumn = () => {
        const { value } = this.state;

        this.onChange(tablePlugin.changes.removeColumn(value.change()));
    };

    onRemoveRow = () => {
        const { value } = this.state;

        this.onChange(tablePlugin.changes.removeRow(value.change()));
    };

    onRemoveTable = () => {
        const { value } = this.state;

        this.onChange(tablePlugin.changes.removeTable(value.change()));
    };

    onSetAlign = (event, align) => {
        const { value } = this.state;

        this.onChange(
            tablePlugin.changes.setColumnAlign(value.change(), align)
        );
    };

    render() {
        const { value } = this.state;
        const isTable = tablePlugin.utils.isSelectionInTable(value);

        return (
            <div>
                {isTable
                    ? this.renderTableToolbar()
                    : this.renderNormalToolbar()}
                <Editor
                    placeholder={'Enter some text...'}
                    renderNode={renderNode}
                    plugins={plugins}
                    value={value}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

// $FlowFixMe
ReactDOM.render(<Example />, document.getElementById('example'));
