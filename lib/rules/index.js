// @flow
import { type Node, type Range, type Document } from 'slate';
import makeGetFragmentAtRange from './getFragmentAtRange/index';
import type Options from '../options';

type typePatch = {
    utils: {
        getFragmentAtRange: (Node, Range) => Document
    },
    rules: {
        getFragmentAtRange: Array<
            ((Node, Range) => Document, Node, Range, () => Document) => Document
        >
    }
};

function createPatch(opts: Options): typePatch {
    const patchGetFragmentAtRange = makeGetFragmentAtRange(opts);
    return {
        utils: { ...patchGetFragmentAtRange.utils },
        rules: { ...patchGetFragmentAtRange.rules }
    };
}

export default createPatch;
