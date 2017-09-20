# slate-edit-table

[![NPM version](https://badge.fury.io/js/slate-edit-table.svg)](http://badge.fury.io/js/slate-edit-table)
[![Linux Build Status](https://travis-ci.org/GitbookIO/slate-edit-table.png?branch=master)](https://travis-ci.org/GitbookIO/slate-edit-table)

A Slate plugin to handle table edition.

### Install

```
npm install slate-edit-table
```

### Features

- Pressing <kbd>Up</kbd> and <kbd>Down</kbd>, move the cursor to next/previous row
- Pressing <kbd>Enter</kbd>, insert a new row
- Pressing <kbd>Tab</kbd>, move the select to next cell
- Pressing <kbd>Shift+Tab</kbd>, move the select to previous cell

### Simple Usage

```js
import EditTable from 'slate-edit-table'

const plugins = [
  EditTable()
]
```

#### Arguments

- ``[typeTable: String]`` — type for table
- ``[typeRow: String]`` — type for the rows.
- ``[typeCell: String]`` — type for the cells.

### Utilities and Transform

`slate-edit-table` exports utilities and transforms:

#### `utils.isSelectionInTable`

`plugin.utils.isSelectionInTable(state: State) => boolean`

Return true if selection is inside a table cell.

#### `utils.getPosition`

`plugin.utils.getPosition(state: State) => TablePosition`

Returns the detailed position in the current table. Throws if not in a table.

#### `transforms.insertTable`

`plugin.transforms.insertTable(transform: Transform, columns: ?number, rows: ?number) => Transform`

Insert a new empty table.

#### `transforms.insertRow`

`plugin.transforms.insertRow(transform: Transform, at: ?number) => Transform`

Insert a new row after the current one or at the specific index (`at`).

#### `transforms.insertColumn`

`plugin.transforms.insertColumn(transform: Transform, at: ?number) => Transform`

Insert a new column after the current one or at the specific index (`at`).

#### `transforms.removeTable`

`plugin.transforms.removeTable(transform: Transform) => Transform`

Remove current table.

#### `transforms.removeRow`

`plugin.transforms.removeRow(transform: Transform, at: ?number) => Transform`

Remove current row or the one at a specific index (`at`).

#### `transforms.removeColumn`

`plugin.transforms.removeColumn(transform: Transform, at: ?number) => Transform`

Remove current column or the one at a specific index (`at`).

#### `transforms.moveSelection`

`plugin.transforms.moveSelection(transform: Transform, column: number, row: number) => Transform`

Move the selection to a specific position in the table.

#### `transforms.moveSelectionBy`

`plugin.transforms.moveSelectionBy(transform: Transform, column: number, row: number) => Transform`

Move the selection by the given amount of columns and rows.

#### `transforms.setColumnAlign`

`plugin.transforms.setColumnAlign(transform: Transform, align: string, at: number) => Transform`

Sets column alignment for a given column (`at`), in the current table. `align`
defaults to center, `at` is optional and defaults to current cursor position.

### TablePosition

An instance of `TablePosition` represents a position within a table (row and column).
You can get your current position in a table by using `plugin.utils.getPosition(state)`.

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
