"use strict";
exports.__esModule = true;
exports.SERVICES = [
    {
        key: 'pub-repos',
        events: [
            { key: 'pubs-added' },
            { key: 'pubs-updated' },
            { key: 'pubs-removed' }
        ]
    },
    {
        key: 'user-groups',
        events: [
            { key: 'user-joined' },
            { key: 'user-left' }
        ]
    }
];