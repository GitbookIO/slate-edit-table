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

### Utilities and Change

`slate-edit-table` exports utilities and changes:

#### `utils.isSelectionInTable`

`plugin.utils.isSelectionInTable(state: State) => Boolean`

Return true if selection is inside a table.

#### `changes.insertTable`

`plugin.changes.insertTable(change: Change, columns: Number?, rows: Number?) => Change`

Insert a new empty table.

#### `changes.insertRow`

`plugin.changes.insertRow(change: Change, at: Number?) => Change`

Insert a new row after the current one or at the specific index (`at`).

#### `changes.insertColumn`

`plugin.changes.insertColumn(change: Change, at: Number?) => Change`

Insert a new column after the current one or at the specific index (`at`).

#### `changes.removeTable`

`plugin.changes.removeTable(change: Change) => Change`

Remove current table.

#### `changes.removeRow`

`plugin.changes.removeRow(change: Change, at: Number?) => Change`

Remove current row or the one at a specific index (`at`).

#### `changes.removeColumn`

`plugin.changes.removeColumn(change: Change, at: Number?) => Change`

Remove current column or the one at a specific index (`at`).

#### `changes.moveSelection`

`plugin.changes.moveSelection(change: Change, column: Number, row: Number) => Change`

Move the selection to a specific position in the table.

#### `changes.moveSelectionBy`

`plugin.changes.moveSelectionBy(change: Change, column: Number, row: Number) => Change`

Move the selection by the given amount of columns and rows.

#### `changes.setColumnAlign`

`plugin.changes.setColumnAlign(change: Change, align: String, at: Number) => Change`

Sets column alignment for a given column (`at`), in the current table. `align`
defaults to center, `at` is optional and defaults to current cursor position.
