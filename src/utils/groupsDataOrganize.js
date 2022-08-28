export function groupsDataOrganize(groupsData, excluded) {
    if (groupsData === undefined) {
        return undefined;
    }
    const groups = {};
    const root = [];
    for (const groupSnapshot of groupsData) {
        const {id, data} = groupSnapshot;
        groups[id] = data;
        if (data.parent === null) {
            root.push(id);
        }
    }
    const result = [];
    function aux(children, tabLevel) {
        children = children.filter(child => groups[child]);
        children.sort(function(a, b) {
            const nameA = groups[a].title.toUpperCase(); // ignore upper and lowercase
            const nameB = groups[b].title.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
        for (const child of children) {
            if (child === excluded) {
                continue;
            }
            result.push({
                id: child,
                data: groups[child],
                label: tabLevel + groups[child].title + ((groups[child].visibility ===  'pinned') ? ' ⚑' : ''),
            });
            aux(groups[child].children, tabLevel + ' ');
        }
    }
    aux(root, '');
    return result;
}
