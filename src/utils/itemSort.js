function by(attribute) {
    return function (a, b) {
        if (a.data[attribute] < b.data[attribute]) {
            return -1;
        } else if (a.data[attribute] > b.data[attribute]) {
            return 1;
        } else {
            return 0;
        }
    };
}

function priorize(attribute, value) {
    return function (a, b) {
        if (a.data[attribute] === value) {
            if (b.data[attribute] === value) {
                return 0;
            }
            return -1;
        }
        if (b.data[attribute] === value) {
            return 1;
        }
        return 0;
    };
}

function compose(compareA, compareB) {
    return function (a, b) {
        const compareAResult = compareA(a, b);
        if (compareAResult === 0) {
            return compareB(a, b);
        }
        return compareAResult;
    };
}

function descending(compare) {
    return function (a, b) {
        return -(compare(a, b));
    };
}

function compare(compares) {
    if (compares.length === 0) {
        return undefined;
    }
    let result = compares[compares.length - 1];
    for (let i = compares.length -2 ; i >= 0 ; i--) {
        result = compose(compares[i], result);
    }
    return result;
}

const comparator = compare([
    priorize('visibility', 'pinned'),
    priorize('type', 'group'),
    priorize('type', 'block'),
    (objA, objB) => {
        const a = Math.min(objA.data.scheduledDate ?? Infinity, objA.data.deadline ?? Infinity);
        const b = Math.min(objB.data.scheduledDate ?? Infinity, objB.data.deadline ?? Infinity);
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    },
    by('date'),
    descending(by('priority')),
    descending(by('difficulty')),
    by('creationDate'),
]);

const comparatorNoPin = compare([
    (objA, objB) => {
        const a = Math.min(objA.data.scheduledDate ?? Infinity, objA.data.deadline ?? Infinity);
        const b = Math.min(objB.data.scheduledDate ?? Infinity, objB.data.deadline ?? Infinity);
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    },
    by('date'),
    descending(by('priority')),
    descending(by('difficulty')),
    by('creationDate'),
]);

export function itemSort(items) {
    return items?.sort?.(comparator);
}

export function itemSortNoPin(items) {
    return items?.sort?.(comparatorNoPin);
}
