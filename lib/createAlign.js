// @flow
import { Range } from 'immutable';
import ALIGN from './ALIGN';

/**
 * Create a set of alignment
 * @param  {Number} columns
 * @param  {List} base
 * @return {List} list
 */
function createAlign(columns: number, base: string[] = []): string[] {
    return Range(0, columns)
        .map(i => base[i] || ALIGN.DEFAULT)
        .toArray();
}

export default createAlign;
