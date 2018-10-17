/**
 * Decorator that can be used in Combination with an interface to describe static classes
 * @example
 * ```
 * export interface MyClassDescription {
 *   new (): GenericNodeTransformerBase;
 *   myStaticMethod(): string;
 * }
 *
 * @staticImplements<MyClassDescription>()
 * export class MyClass {
 *   public static myStaticMethod(){
 *       return `MyClass.myStaticMethod was called`;
 *   }
 * }
 * ```
 * @export
 * @template T
 * @returns
 */
export function staticImplements<T>() {
    // tslint:disable-next-line:no-empty
    return (constructor: T) => {};
}
