/**
 * 引数が文字列かどうか判定する.
 * toStringした際の[object hoge]のhogeの部分で判定する.
 *
 * @param target
 */
const isString = (target: unknown): boolean => {
  return (
    Object.prototype.toString.call(target).slice(8, -1).toLocaleLowerCase() ===
    "string"
  );
};

export { isString };
