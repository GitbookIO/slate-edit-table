# slate-edit-table

[![NPM version](https://badge.fury.io/js/slate-edit-table.svg)](http://badge.fury.io/js/slate-edit-table)
[![Linux Build Status](https://travis-ci.org/GitbookIO/slate-edit-table.png?branch=master)](https://travis-ci.org/GitbookIO/slate-edit-table)

A Slate plugin to handle table edition.

<<<<<<< HEAD
## Install
=======
Demo: [gitbookio.github.io/slate-edit-table/](https://gitbookio.github.io/slate-edit-table/)

### Install
>>>>>>> 853ad6b24acf462a55821f77a9c7708fbf4ca5d4

```
npm install slate-edit-table
```

## Features

- Pressing <kbd>Up</kbd> and <kbd>Down</kbd>, moves the cursor to next/previous row
- Pressing <kbd>Enter</kbd>, insert a new row
- Pressing <kbd>Cmd+Enter</kbd> (<kbd>Ctrl+Enter</kbd> on Windows/Linux) exits the table, into a new default block.
- Pressing <kbd>Tab</kbd>, move the cursor to next cell
- Pressing <kbd>Shift+Tab</kbd>, move the cursor to previous cell

All these default features are configurable.

## Simple Usage

```js
import EditTable from 'slate-edit-table'

const tablePlugin = EditTable(/* options */)

const plugins = [
  tablePlugin
]
```

## API

### `Options`

Option object you can pass to the plugin.

- ``[typeTable: String]`` — type for table
- ``[typeRow: String]`` — type for the rows.
- ``[typeCell: String]`` — type for the cells.
- ``[typeContent: String]`` — default type for blocks in cells. Also used as default type for blocks created when exiting the table with Mod+Enter.

### `EditTable`

#### `EditTable(options: Options) => Instance`

Constructs an instance of the table plugin, for the given options.

#### [`EditTable.TablePosition`](./TablePosition)

An instance of `TablePosition` represents a position within a table (row and column).

### `Instance`

Once you have constructed an instance of the plugin, you have access to utilities and changes.

#### `plugin.utils.isSelectionInTable`

`plugin.utils.isSelectionInTable(state: Slate.State) => boolean`

Return true if selection is inside a table cell.

#### `plugin.utils.isSelectionOutOfTable`

`plugin.utils.isSelectionOutOfTable(state: Slate.State) => boolean`

Return true if selection starts and ends both outside any table.  (Notice: it is NOT the opposite state of `isSelectionInTable`)

#### `plugin.utils.getPosition`

`plugin.utils.getPosition(state: Slate.State) => TablePosition`

Returns the detailed position in the current table. Throws if not in a table.

#### `plugin.changes.insertTable`

`plugin.changes.insertTable(change: Change, columns: ?number, rows: ?number) => Change`

Insert a new empty table.

#### `plugin.changes.insertRow`

`plugin.changes.insertRow(change: Change, at: ?number) => Change`

Insert a new row after the current one or at the specific index (`at`).

#### `plugin.changes.insertColumn`

`plugin.changes.insertColumn(change: Change, at: ?number) => Change`

Insert a new column after the current one or at the specific index (`at`).

#### `plugin.changes.removeTable`

`plugin.changes.removeTable(change: Change) => Change`

Remove current table.

#### `plugin.changes.removeRow`

`plugin.changes.removeRow(change: Change, at: ?number) => Change`

Remove current row or the one at a specific index (`at`).

#### `plugin.changes.removeColumn`

`plugin.changes.removeColumn(change: Change, at: ?number) => Change`

Remove current column or the one at a specific index (`at`).

#### `plugin.changes.moveSelection`

`plugin.changes.moveSelection(change: Change, column: number, row: number) => Change`

Move the selection to a specific position in the table.

#### `plugin.changes.moveSelectionBy`

`plugin.changes.moveSelectionBy(change: Change, column: number, row: number) => Change`

Move the selection by the given amount of columns and rows.

#### `plugin.changes.setColumnAlign`

`plugin.changes.setColumnAlign(change: Change, align: string, at: number) => Change`

Sets column alignment for a given column (`at`), in the current table. `align`
defaults to center, `at` is optional and defaults to current cursor position.

> The `align` states are stored in the table node's data.
> `table.node.data.get('align')` should be an array of aligns string, corresponding to
each column.
