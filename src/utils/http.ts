type QueriesType = {
  [key: string]:
    | string
    | boolean
    | number
    | string[]
    | boolean[]
    | number[]
    | undefined;
};

/**
 * GETメソッドで、APIを実行する.
 *
 * @param url URL
 * @param queries クエリオブジェクト
 */
async function callGetApi<T>(url: string, queries: QueriesType): Promise<T> {
  // クエリ文字列を作成
  const queryStr = makeQuery(queries);

  // URLを組み立て
  const requestUrl = url + "?" + queryStr;

  // リクエスト
  return await fetch(requestUrl, {
    method: "GET",
  })
    .then(async (response) => {
      return await response.json();
    })}

async function callPostApi<T>(url: string, body: BodyInit): Promise<T> {
  // リクエスト
  return await fetch(url, {
    method: "POST",
    body: body,
  })
    .then(async (response) => {
      return await response.json();
    })
    .catch((err) => {
      // TODO ログ
      console.log(err);
      return;
    });
}

/**
 * クエリ文字列を作成する.
 *
 * @param queries クエリオブジェクト (一つのキーに対して、複数の値を設定する場合、配列で指定してください)
 */
const makeQuery = (queries: QueriesType): string => {
  const result = [];
  for (const entry of Object.entries(queries)) {
    // クエリのキーと値を取得
    const key = entry[0];
    const values = entry[1];
    // 未定義のキーは無視
    if (!key) {
      continue;
    }
    if (Array.isArray(values)) {
      for (const value of values) {
        // 不正な文字列は無視
        if (!isValidQueryValue(value)) {
          continue;
        }
        result.push(key + "=" + value);
      }
    } else {
      if (!isValidQueryValue(values)) {
        continue;
      }
      result.push(key + "=" + values);
    }
  }

  return result.join("&");
};

/**
 * クエリ文字列の値として、妥当か判定する
 *
 * @param value 判定対象
 * @returns true: 妥当な場合, false: 不正な場合
 */
const isValidQueryValue = (value: unknown): boolean => {
  // null or undefined or 空文字は不正
  if (value === undefined || value === null || value === "") {
    return false;
  }

  return true;
};

export {
  callGetApi,
  callPostApi,
  makeQuery,
  isValidQueryValue as isValidValue,
};
