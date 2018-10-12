/* class decorator */
export function staticImplements<T>() {
    // tslint:disable-next-line:no-empty
    return (constructor: T) => {};
}
