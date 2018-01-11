// @flow
import { type Node, type Range, type Document } from 'slate';
import ifCollapsed from './ifCollapsed';
import inSameCell from './inSameCell';
import inSameRow from './inSameRow';
import inSameTable from './inSameTable';
import startAtEndOfTable from './startAtEndOfTable';
import endAtStartOfTable from './endAtStartOfTable';
import edgeInTable from './edgeInTable';

import type Options from '../../options';

type typeRules = Array<
    (
        Options,
        (Node, Range) => Document,
        Node,
        Range,
        () => Document
    ) => Document
>;

const getFragmentRules: typeRules = [
    ifCollapsed,
    inSameCell,
    inSameRow,
    inSameTable,
    startAtEndOfTable,
    endAtStartOfTable,
    edgeInTable
];

function bindRules(
    rules: typeRules,
    index: number,
    opts: Options,
    node: Node,
    range: Range
): Document {
    if (index === rules.length) {
        return node.getFragmentAtRange(range);
    }
    const rule = rules[index];
    const next = () => bindRules(rules, index + 1, opts, node, range);
    const rootGetFragment = (n: Node, r: Range) =>
        bindRules(getFragmentRules, 0, opts, n, r);
    return rule(opts, rootGetFragment, node, range, next);
}

type typeRule = (
    (Node, Range) => Document,
    Node,
    Range,
    () => Document
) => Document;
function convertSingleRule(
    opts: Options,
    optsRule: (
        Options,
        (Node, Range) => Document,
        Node,
        Range,
        () => Document
    ) => Document
): typeRule {
    return (node, rootGet, range, next) =>
        optsRule(opts, rootGet, node, range, next);
}

type typePatch = {
    rules: {
        getFragmentAtRange: Array<typeRule>
    },
    utils: { getFragmentAtRange: (Node, Range) => Document }
};
function makePatch(opts: Options): typePatch {
    return {
        rules: {
            getFragmentAtRange: getFragmentRules.map(rule =>
                convertSingleRule(opts, rule)
            )
        },
        utils: {
            getFragmentAtRange: (node: Node, range: Range) =>
                bindRules(getFragmentRules, 0, opts, node, range)
        }
    };
}

export default makePatch;
