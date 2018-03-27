// @flow
/* eslint-disable import/no-extraneous-dependencies */
/* global document */

import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { type Block } from 'slate';
import { Editor } from 'slate-react';

import PluginEditTable from '../lib/';
import alignPlugin from './aligns';
import INITIAL_VALUE from './value';

const tablePlugin = PluginEditTable({
    typeTable: 'table',
    typeRow: 'table_row',
    typeCell: 'table_cell',
    typeContent: 'paragraph'
});

function renderNode(props) {
    switch (props.node.type) {
        case 'table':
            return <Table {...props} />;
        case 'table_row':
            return <TableRow {...props} />;
        case 'table_cell':
            return <TableCell {...props} />;
        case 'paragraph':
            return <Paragraph {...props} />;
        case 'heading':
            return <h1 {...props.attributes}>{props.children}</h1>;
        default:
            return null;
    }
}

const plugins = [tablePlugin, alignPlugin, { renderNode }];

type NodeProps = {
    attributes: Object,
    children: React.Node,
    node: Block
};

class Table extends React.Component<NodeProps> {
    static childContextTypes = {
        isInTable: PropTypes.bool
    };

    getChildContext() {
        return { isInTable: true };
    }

    render() {
        const { attributes, children } = this.props;
        return (
            <table>
                <tbody {...attributes}>{children}</tbody>
            </table>
        );
    }
}

class TableRow extends React.Component<NodeProps> {
    render() {
        const { attributes, children } = this.props;
        return <tr {...attributes}>{children}</tr>;
    }
}

class TableCell extends React.Component<NodeProps> {
    render() {
        const { attributes, children, node } = this.props;

        const textAlign = node.get('data').get('align', 'left');

        return (
            <td style={{ textAlign }} {...attributes}>
                {children}
            </td>
        );
    }
}

class Paragraph extends React.Component<NodeProps> {
    static contextTypes = {
        isInTable: PropTypes.bool
    };

    render() {
        const { attributes, children } = this.props;
        const { isInTable } = this.context;

        const style = isInTable ? { margin: 0 } : {};

        return (
            <p style={style} {...attributes}>
                {children}
            </p>
        );
    }
}

class Example extends React.Component<*, *> {
    submitChange: Function;
    editorREF: Editor;
    state = {
        value: INITIAL_VALUE
    };

    renderTableToolbar() {
        return (
            <div className="toolbar">
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
            <div className="toolbar">
                <button onClick={this.onInsertTable}>Insert Table</button>
            </div>
        );
    }

    setEditorComponent = (ref: Editor) => {
        this.editorREF = ref;
        this.submitChange = ref.change;
    };

    onChange = ({ value }) => {
        this.setState({
            value
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
            alignPlugin.changes.setColumnAlign(change, align)
        );
    };

    render() {
        const { value } = this.state;
        const isInTable = tablePlugin.utils.isSelectionInTable(value);
        const isOutTable = tablePlugin.utils.isSelectionOutOfTable(value);

        return (
            <React.Fragment>
                {isInTable ? this.renderTableToolbar() : null}
                {isOutTable ? this.renderNormalToolbar() : null}
                <Editor
                    ref={this.setEditorComponent}
                    placeholder={'Enter some text...'}
                    plugins={plugins}
                    value={value}
                    onChange={this.onChange}
                />
            </React.Fragment>
        );
    }
}

// $FlowFixMe
ReactDOM.render(<Example />, document.getElementById('example'));
