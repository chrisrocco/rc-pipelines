
export const SERVICES = [
    {
        key: 'pub-repos',
        displayName: "Publication Repositories",
        events: [
            { key: 'pubs-added', desc: "Fired when publications are uploaded to a repository" },
            { key: 'pubs-updated', desc: "Fired when a publication is updated" },
            { key: 'pubs-removed', desc: "Fired when a publication is removed" }
        ]
    },
    {
        key: 'user-groups',
        displayName: "User Groups",
        events: [
            { key: 'user-joined', desc: "Fired when a user joins the group" },
            { key: 'user-left', desc: "Fired when a user leaves a group" }
        ]
    }
]
