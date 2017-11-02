const expect = require('expect');
const fs = require('fs');
const path = require('path');
const Slate = require('slate');
const readMetadata = require('read-metadata');

const EditList = require('../lib');


function deserializeValue(json) {
    return Slate.Value.fromJSON(json, { normalize: false });
}

describe('slate-edit-table', function() {
    const tests = fs.readdirSync(__dirname);
    const plugin = EditList();

    tests.forEach(function(test) {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, function() {
            const dir = path.resolve(__dirname, test);
            const input = readMetadata.sync(path.resolve(dir, 'input.yaml'));
            const expectedPath = path.resolve(dir, 'expected.yaml');
            const expected = fs.existsSync(expectedPath) && readMetadata.sync(expectedPath);

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
