const insertRow = require('./changes/insertRow');

/**
 * Insert a new row when pressing "Enter"
 */
function onEnter(event, data, change, opts) {
    event.preventDefault();

    return insertRow(opts, change);
}

module.exports = onEnter;
