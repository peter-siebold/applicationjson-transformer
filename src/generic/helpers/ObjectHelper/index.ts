export const removeDuplicatesByPropName = (myArr: any[], prop: string) => {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
};

export default {
    removeDuplicates: removeDuplicatesByPropName,
};
