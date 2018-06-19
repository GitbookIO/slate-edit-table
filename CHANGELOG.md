# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

## [0.15.2] - 2018-06-19

*  Export TablePosition type

## [0.15.1] - 2018-06-13

*   Add key option to `getPosition`

## [0.15.0] - 2018-04-19

*   Allow blocks in cells
*   Align for columns have been removed
*   Improve package size by publishing only the `dist` folder

## [0.14.3] - 2018-02-06

*   Fix normalization of multiple blocks in cells

## [0.14.2] - 2018-02-06

## [0.14.1] - 2018-02-06

*   Fixed build

## [0.14.0] - 2018-02-05

**BREAKING**

*   Upgrade to be compatible with Slate 0.32.x
*   Fixed missing peerDependencies for `eslint-config-gitbook`

## [0.13.3] - 2018-01-08

*   Fix peer depedency range for slate to include 0.30 and 0.31

## [0.13.2] - 2018-01-08

*   Add `isSelectionOutOfTable`
*   Fix keys detection
*   Fix selection errors when deleting table

## [0.13.1] - 2017-12-05

*   Improve `isSelectionInTable` to check for both end of the selection to be in the same table.

## [0.13.0] - 2017-11-22

**BREAKING**

*   Upgrade to be compatible with Slate 0.30.x

## [0.12.0] - 2017-11-02

**BREAKING**

*   Upgrade to be compatible with Slate 0.27.x

## [0.11.0] - 2017-09-20

**BREAKING**

*   Upgrade to be compatible with Slate after the `expose-transform` branch went in.
*   Change all instances of `transform` to `change`
*   Change the namespace of `plugin.transforms` to `plugin.changes`

## [0.10.2] - 2017-09-20

*   New `utils.getPosition(state) => TablePosition` to know easily the current
    position within a table (#39)
*   New option `exitBlockType`. When provided, `Mod+Enter` will exit the current
    table into a new block of this type.
*   Fixed cursor issues when inserting rows using Tab (#26)

## [0.10.1] - 2017-07-13

[0.10.1]: https://github.com/GitbookIO/slate-edit-table/compare/0.10.0...0.10.1

*   Fix rule to prevent extra blocks in rows

## [0.10.0] - 2017-07-13

[0.10.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.9.0...0.10.0

*   Add rule to prevent nested blocks in cells

## [0.9.0] - 2017-04-21

[0.9.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.8.4...0.9.0

*   Update slate to `^0.19.x`

## [0.8.4] - 2016-11-30

[0.8.4]: https://github.com/GitbookIO/slate-edit-table/compare/0.8.3...0.8.4

*   Update slate peer dependency to prevent NPM warnings when used with `0.15.x`

## [0.8.3] - 2016-11-09

[0.8.3]: https://github.com/GitbookIO/slate-edit-table/compare/0.8.2...0.8.3

*   Enforce align to be Immutable.List
*   Undo is now fixed, using GitbookIO:slate

## [0.8.2] - 2016-11-03

[0.8.2]: https://github.com/GitbookIO/slate-edit-table/compare/0.8.1...0.8.2

*   Move slate to `peerDependencies`

## [0.8.1] - 2016-11-01

[0.8.1]: https://github.com/GitbookIO/slate-edit-table/compare/0.8.0...0.8.1

*   Add schema to normalize `align` in table
*   `insertColumn` and `removeColumn` update correctly the alignment

## [0.8.0] - 2016-10-27

[0.8.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.7.0...0.8.0

*   Expose `setColumnAlign` transform
*   Expose `ALIGN.{LEFT,RIGHT,CENTER}` constants
*   Rules to ensure cells or rows are always within a table. Fix
    [#13](https://github.com/GitbookIO/slate-edit-table/issues/13)

## [0.7.0] - 2016-10-27

[0.7.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.6.0...0.7.0

*   Adapt for upcoming Slate release
*   Improve stability

## [0.6.0] - 2016-09-23

[0.6.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.5.1...0.6.0

*   Expose `moveSelectionBy` transform
*   `removeColumn` clears the column instead, if it is the last remaining column
*   `removeRow` clears the row instead, if it is the last remaining row
*   Undo of `insertColumn` when cursor is in inserted column

## [0.5.1] - 2016-09-15

[0.5.1]: https://github.com/GitbookIO/slate-edit-table/compare/0.5.0...0.5.1

*   `insertTable` does not grab text from current block anymore, and simply inserts an empty table.
*   Up/Down arrows behavior inside tables

## [0.5.0] - 2016-09-15

[0.5.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.4.0...0.5.0

*   `TablePosition.is{First|Last}{Row|Column|Cell}` methods
*   **BREAKING** Now uses `slate^0.14.x`
*   Split transform `moveSelection` into `moveSelection` and `moveSelectionBy`

## [0.4.0] - 2016-09-06

[0.4.0]: https://github.com/GitbookIO/slate-edit-table/compare/0.3.0...0.4.0

*   Schema normalization rules
