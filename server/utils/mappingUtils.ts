export function getExactIds(ids: any[]) {
    return ids.map(doc => doc._id.toString());
}