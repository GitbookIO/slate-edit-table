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

function deserializeValue(value) {
    return Slate.Value.fromJSON(
        { document: value.document, schema: SCHEMA },
        { normalize: false }
    );
}

describe('slate-edit-table', () => {
    const tests = fs.readdirSync(__dirname);

    tests.forEach(test => {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, () => {
            Slate.resetKeyGenerator();
            const dir = path.resolve(__dirname, test);
            const input = require(path.resolve(dir, 'input.js')).default;
            const expectedPath = path.resolve(dir, 'expected.js');
            const expected =
                fs.existsSync(expectedPath) && require(expectedPath).default;

            const runChange = require(path.resolve(dir, 'change.js')).default;

            const valueInput = deserializeValue(input);

            const newChange = runChange(PLUGIN, valueInput.change());

            if (expected) {
                const newDoc = hyperprint(newChange.value.document, {
                    strict: true
                });
                expect(newDoc).toEqual(
                    hyperprint(expected.document, { strict: true })
                );
            }
        });
    });
});
