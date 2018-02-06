import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';
import readMetadata from 'read-metadata';

import EditTable from '../lib';

const PLUGIN = EditTable();
const SCHEMA = Slate.Schema.create({
    plugins: [PLUGIN]
});

function deserializeState(json) {
    return Slate.State.fromJSON(
        { ...json, schema: SCHEMA },
        { normalize: false }
    );
}

describe('slate-edit-table', () => {
    const tests = fs.readdirSync(__dirname);

    tests.forEach(test => {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, () => {
            const dir = path.resolve(__dirname, test);
            const input = readMetadata.sync(path.resolve(dir, 'input.yaml'));
            const expectedPath = path.resolve(dir, 'expected.yaml');
            const expected =
                fs.existsSync(expectedPath) && readMetadata.sync(expectedPath);

            // eslint-disable-next-line
            const runChange = require(path.resolve(dir, 'change.js')).default;

            const stateInput = deserializeState(input);

            const newChange = runChange(PLUGIN, stateInput.change());

            if (expected) {
                const newDocJSon = newChange.state.toJSON();
                expect(newDocJSon).toEqual(deserializeState(expected).toJSON());
            }
        });
    });
});
