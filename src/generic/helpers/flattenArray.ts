export const flattenArray = (arr1: any[]): any[] => {
    return arr1.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val)), []);
};
