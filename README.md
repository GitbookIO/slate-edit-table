# slate-edit-table

[![NPM version](https://badge.fury.io/js/slate-edit-table.svg)](http://badge.fury.io/js/slate-edit-table)
[![Linux Build Status](https://travis-ci.org/GitbookIO/slate-edit-table.png?branch=master)](https://travis-ci.org/GitbookIO/slate-edit-table)

A Slate plugin to handle table edition.

Demo: [gitbookio.github.io/slate-edit-table/](https://gitbookio.github.io/slate-edit-table/)

> ⚠️  This repository is now using GitBook's fork of [ianstormtaylor/slate](https://github.com/ianstormtaylor/slate).
> Previous versions are still [available on NPM](https://www.npmjs.com/package/slate-edit-table)
> All the versions using GitBook's fork of slate are now published under the `@gitbook` NPM scope.
> To learn more about why we forked Slate, read [our manifest](https://github.com/GitbookIO/slate/blob/master/Readme.md)

## Install

```
npm install slate-edit-table
```

## Features

*   Pressing <kbd>Up</kbd>/<kbd>Down</kbd> moves the cursor to the row above/below
*   Pressing <kbd>Enter</kbd> inserts a new row
*   Pressing <kbd>Cmd+Enter</kbd> (<kbd>Ctrl+Enter</kbd> on Windows/Linux) exits the table, into a new default block
*   Pressing <kbd>Tab</kbd> moves the cursor to next cell
*   Pressing <kbd>Shift+Tab</kbd> moves the cursor to previous cell

All these default features are configurable.

### Copy/Paste behavior

Here are how different cases of copy-paste are handled by the plugin:

1. Copying the content of a single cell into another cell → The content of the first cell is pasted inside the second cell
2. Copying the content of a single cell outside the table →  Just the content of the cell is pasted (not the table)
3. Copying some content into a cell → The content is inserted inside the cell
4. Copying multiple cells somewhere else inside the table → The copied fragment of table is patched at the given position, overwritting cells and adding rows and columns if necessary.
5. Copying multiple cells outside the table → A new table is pasted, containing the copied cells.

## Simple Usage

```js
import EditTable from 'slate-edit-table';

const tablePlugin = EditTable(/* options */);

const plugins = [tablePlugin];
```

## Data structure

Here is what your Slate document containing tables should look like:

```jsx
<value>
    <document>
        <paragraph>Some text</paragraph>

        <table>
            <table_row>
                <table_cell>
                    <paragraph>Any block can goes into cells</paragraph>
                </table_cell>

                <table_cell>
                    <image isVoid src="image.png" />
                </table_cell>
            </table_row>

            <table_row>
                <table_cell>
                    <paragraph>Second row</paragraph>
                </table_cell>

                <table_cell>
                    <paragraph>Second row</paragraph>
                </table_cell>
            </table_row>
        </table>
    </document>
</value>
```

## `Options`

Option object you can pass to the plugin.

*   `[typeTable: string]` — type for table
*   `[typeRow: string]` — type for the rows.
*   `[typeCell: string]` — type for the cells.
*   `[typeContent: string]` — default type for blocks in cells. Also used as default type for blocks created when exiting the table with Mod+Enter.

## `EditTable`

### `EditTable(options: Options) => Instance`

Constructs an instance of the table plugin, for the given options. You can then add this instance to the list of plugins passed to Slate.

Once you have constructed an instance of the plugin, you get access to utilities and changes through `pluginInstance.utils` and `pluginInstance.changes`.

## Utils

### `utils.isSelectionInTable`

`isSelectionInTable(value: Slate.Value) => boolean`

Return true if selection is inside a table cell.

### `utils.isSelectionOutOfTable`

`isSelectionOutOfTable(value: Slate.Value) => boolean`

Return true if selection starts and ends both outside any table. (Notice: it is NOT the opposite value of `isSelectionInTable`)

### `utils.getPosition`

`getPosition(value: Slate.Value) => TablePosition`

Returns the position of the cursor in a table (and all related infos).

### `utils.getPositionByKey`

`getPositionByKey(tableAncestor: Node, key: string) => TablePosition`

Returns the position of a particular node in a table (and all related infos).

### `utils.createTable`

```js
createTable(
    columns: number,
    rows: number,
    getCellContent?: (row: number, column: number) => Node[]
): Block
```

Returns a table. The content can be filled with the given `getCellContent` generator.

### `utils.createRow`

```js
createRow(
    columns: number,
    getCellContent?: (column: number) => Node[]
): Block
```

Returns a row. The content can be filled with the given `getCellContent` generator.

### `utils.createCell`

```js
createCell(opts: Options, nodes?: Node[]): Block
```

Returns a cell. The content defaults to an empty `typeContent` block.

## Changes

### `changes.insertTable`

`insertTable(change: Change, columns: ?number, rows: ?number) => Change`

Insert a new empty table.

### `changes.insertRow`

```js
insertRow(
    opts: Options,
    change: Change,
    at?: number, // row index
    getRow?: (columns: number) => Block // Generate the row yourself
): Change
```

Insert a new row after the current one or at the specific index (`at`).

### `changes.insertColumn`

```js
insertColumn(
    opts: Options,
    change: Change,
    at?: number, // Column index
    getCell?: (column: number, row: number) => Block // Generate cells
): Change
```

Insert a new column after the current one or at the specific index (`at`).

### `changes.removeTable`

`removeTable(change: Change) => Change`

Remove current table.

### `changes.removeTableByKey`

`removeTableByKey(change: Change, key: string) => Change`

Remove the table containing the given key.

### `changes.removeRow`

`removeRow(change: Change, at: ?number) => Change`

Remove current row or the one at a specific index (`at`).

### `changes.removeRowByKey`

`removeRowByKey(change: Change, key: string) => Change`

Remove the row containing the given key.

### `changes.removeColumn`

`removeColumn(change: Change, at: ?number) => Change`

Remove current column or the one at a specific index (`at`).

### `changes.removeColumnByKey`

`removeColumnByKey(change: Change, key: string) => Change`

Remove the column containing the given key.

### `changes.moveSelection`

`moveSelection(change: Change, column: number, row: number) => Change`

Move the selection to a specific position in the table.

### `changes.moveSelectionBy`

`moveSelectionBy(change: Change, column: number, row: number) => Change`

Move the selection by the given amount of columns and rows.

## TablePosition

An instance of `TablePosition` represents a position within a table (row and column).
You can get your current position in a table by using `plugin.utils.getPosition(value)`.

#### `position.getWidth() => number`

Returns the number of columns in the current table.

#### `position.getHeight() => number`

Returns the number of rows in the current table.

#### `position.getRowIndex() => number`

Returns the index of the current row in the table.

#### `position.getColumnIndex() => number`

Return the index of the current column in the table.

#### `position.isFirstCell() => boolean`

True if on first row and first column of the table

#### `position.isLastCell() => boolean`

True if on last row and last column of the table

#### `position.isFirstRow() => boolean`

True if on first row

#### `position.isLastRow() => boolean`

True if on last row

#### `position.isFirstColumn() => boolean`

True if on first column

#### `position.isLastColumn() => boolean`

True if on last column
