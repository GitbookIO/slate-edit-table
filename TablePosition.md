# `EditTable.TablePosition`

An instance of `TablePosition` represents a position within a table (row and column).
You can get your current position in a table by using `plugin.utils.getPosition(state)`.

## `EditTable.TablePosition.create(options: Options, state: State, node: Node) => TablePosition`

Returns the TablePosition for the given node. This is general purpose. To get your current position, you can use `plugin.utils.getPosition(state)`.

## `position.getWidth() => number`

Returns the number of columns in the current table.

## `position.getHeight() => number`

Returns the number of rows in the current table.

## `position.getRowIndex() => number`

Returns the index of the current row in the table.

## `position.getColumnIndex() => number`

Return the index of the current column in the table.

## `position.isFirstCell() => boolean`

True if on first row and first column of the table

## `position.isLastCell() => boolean`

True if on last row and last column of the table

## `position.isFirstRow() => boolean`

True if on first row

## `position.isLastRow() => boolean`

True if on last row

## `position.isFirstColumn() => boolean`

True if on first column

## `position.isLastColumn() => boolean`

True if on last column
