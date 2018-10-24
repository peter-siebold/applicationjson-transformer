/**
 * flatten a multidimensional array to a one dimensional array
 * @param arr
 * @returns arr
 */
export const flattenArray = (arr: any[]): any[] => {
    return arr.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val)), []);
};
