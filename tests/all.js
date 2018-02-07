/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';
import hyperprint from 'slate-hyperprint';
import EditTable from '../lib';

const PLUGIN = EditTable();
const SCHEMA = Slate.Schema.create({
    plugins: [PLUGIN]
});

function deserializeState(document) {
    return Slate.State.fromJSON(
        { document, schema: SCHEMA },
        { normalize: false }
    );
}

describe('slate-edit-table', () => {
    const tests = fs.readdirSync(__dirname);

    tests.forEach(test => {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, () => {
            const dir = path.resolve(__dirname, test);
            const inputDocument = require(path.resolve(dir, 'input.js'))
                .default;
            const expectedPath = path.resolve(dir, 'expected.js');
            const expectedDocument =
                fs.existsSync(expectedPath) && require(expectedPath).default;

            const runChange = require(path.resolve(dir, 'change.js')).default;

            const stateInput = deserializeState(inputDocument);

            const newChange = runChange(PLUGIN, stateInput.change());

            if (expectedDocument) {
                const newDoc = hyperprint(newChange.state.document);
                expect(newDoc).toEqual(hyperprint(expectedDocument));
            }
        });
    });
});
