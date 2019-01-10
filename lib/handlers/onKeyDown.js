// @flow

import { type Change } from 'slate';

import type Options from '../options';
import { isSelectionInTable } from '../utils';

import onEnter from './onEnter';
import onModEnter from './onModEnter';
import onTab from './onTab';
import onBackspace from './onBackspace';
import onUpDown from './onUpDown';

const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';
const KEY_BACKSPACE = 'Backspace';
const KEY_DOWN = 'ArrowDown';
const KEY_UP = 'ArrowUp';

/**
 * User is pressing a key in the editor
 */
function onKeyDown(
    opts: Options,
    event: *,
    editor: Change,
    next: () => {},
): void | any {
    // Only handle events in cells
    if (!isSelectionInTable(opts, editor)) {
        return next();
    }

    // Build arguments list
    const args = [opts, event, editor, next];

    switch (event.key) {
        case KEY_ENTER:
            if (event.metaKey && opts.exitBlockType) {
                return onModEnter(...args);
            }
            return onEnter(...args);

        case KEY_TAB:
            return onTab(...args);
        case KEY_BACKSPACE:
            return onBackspace(...args);
        case KEY_DOWN:
        case KEY_UP:
            return onUpDown(...args);
        default:
            return next();
    }
}

export default onKeyDown;
