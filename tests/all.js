import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';
import readMetadata from 'read-metadata';

import EditTable from '../lib';

function deserializeValue(json) {
    return Slate.Value.fromJSON(json, { normalize: false });
}

describe('slate-edit-table', () => {
    const tests = fs.readdirSync(__dirname);
    const plugin = EditTable();

    tests.forEach(test => {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, () => {
            const dir = path.resolve(__dirname, test);
            const input = readMetadata.sync(path.resolve(dir, 'input.yaml'));
            const expectedPath = path.resolve(dir, 'expected.yaml');
            const expected =
                fs.existsSync(expectedPath) && readMetadata.sync(expectedPath);

            // eslint-disable-next-line
            const runChange = require(path.resolve(dir, 'change.js'));

            const valueInput = deserializeValue(input);

            const newChange = runChange(plugin, valueInput.change());

            if (expected) {
                const newDocJSon = newChange.value.toJSON();
                expect(newDocJSon).toEqual(deserializeValue(expected).toJSON());
            }
        });
    });
});
