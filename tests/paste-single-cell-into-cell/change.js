import Simulator from 'slate-simulator';
import { BeforePlugin, AfterPlugin } from 'slate-react';

export default function(plugin, change) {
    const { value } = change;
    const simulator = new Simulator({
        plugins: [BeforePlugin, plugin, AfterPlugin],
        value
    });

    return simulator.copy().value.change();
}
