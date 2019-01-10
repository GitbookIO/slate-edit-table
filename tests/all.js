/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate, { KeyUtils } from 'slate';
import EditTable from '../lib';

describe('slate-edit-table', () => {
    const tests = fs.readdirSync(__dirname);
    const plugin = EditTable();

    tests.forEach(test => {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, () => {
            KeyUtils.resetGenerator();
            const dir = path.resolve(__dirname, test);
            const input = require(path.resolve(dir, 'input.js')).default;
            const expectedPath = path.resolve(dir, 'expected.js');
            const expected =
                fs.existsSync(expectedPath) && require(expectedPath).default;

            const runChange = require(path.resolve(dir, 'change.js')).default;

            const editor = new Slate.Editor({
                value: input,
                plugins: [plugin],
            });
            const newChange = runChange(editor);

            if (expected && newChange) {
                const actual = newChange.value;

                expect(actual.toJSON()).toEqual(expected.toJSON());
            }
            // Check that the selection is still valid
            if (newChange && !newChange.value.document.nodes.isEmpty()) {
                expect(newChange.value.startBlock).toExist(null);
            }
        });
    });
});
