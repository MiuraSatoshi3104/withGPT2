'use strict'
console.log("---followup---");
///#4
// ここにコードを書きましょう

const addTwo = add(2);
addTwo(3); // 5
addTwo(70); // 72

const addOneHundred = add(100);
addOneHundred(3); // 103


///#5
// このコードを実行すると、どの順番で何が表示されるでしょうか？もちろん、コードを実行する前に答えてください。なぜそうなるのか、わからない場合はわかるまで調べましょう！

function simpleHello() {
  console.log("Hello");
}

function anotherGreeting(name) {
  return "Hello, " + name;
}

const foo = simpleHello();
const bar = anotherGreeting("JavaScript");

console.log(foo);
console.log(bar);

// あなたの回答と、なぜそうなるのかの説明をここに記載してください

///7

map という名前の関数を宣言してください。この関数は引数としてコレクション(オブジェクトまたは配列)とコールバック関数を受け取り、コレクション内の各要素に対してコールバック関数を実行した結果を要素に持つ新しい配列を返します。コールバック関数は、コレクション内のすべての要素に適用されます。
⚠️ 注意：ネイティブメソッド (.forEach, .map) は使用しないでください。

// ここにコードを書きましょう

function addOne(num) {
  return num + 1;
}
map([1, 2, 3], addOne); // [2, 3, 4]
map({ a: 1, b: 2, c: 3 }, addOne); // [2, 3, 4]


//#8
changeMiddle という名前の関数を宣言してください。この関数は引数として「3 つの単語からなる文字列(スペースで区切られる)」「1 単語の文字列」を受け取り、第一引数の中央の単語を第二引数の文字列に置き換えた新しい文字列を返します。

// ここにコードを書きましょう

changeMiddle("I like cats", "love"); // "I love cats"
changeMiddle("red green blue", "yellow"); // "red yellow blue"




////#9

// countSomething という名前の関数を宣言してください。この関数は引数として数値・文字列・ブーリアンを要素にもつ配列を受け取ります。要素の登場回数が最も多い型をチェックし、以下のいずれかの文字列を返してください。

// “BOOL COUNT: x” (ブーリアンが最も多い場合)
// “STRING COUNT: x” (文字列が最も多い場合)
// “NUMBER COUNT: x” （数値が最も多い場合）
// ※ x はその型の要素がが何回出現したかを表す。

// ここにコードを書きましょう

countSomething(["a", "b", "c", true, false, 2]); // "STRING COUNT: 3"
countSomething([true, true, false, true]); // "BOOL COUNT: 4"
countSomething([true, true, 1, 0, 1, false, 1]); // "NUMBER COUNT: 4"



//#10

// each という名前の関数を宣言してください。この関数は引数としてコレクション(オブジェクトまたは配列)とコールバック関数を受け取り、コレクション内の各要素に対してコールバック関数を一度だけ実行してください。この関数は何もリターンしません。
// ⚠️ 注意：ネイティブメソッド (.forEach, .map) は使用しないでください。

// ここにコードを書きましょう

each({ a: 1, b: 2, c: 3 }, console.log);
each([4, 5, 6], console.log);

// 上記を実行すると下記を表示するはずです
// 1
// 2
// 3
// 4
// 5
// 6


///#11
// compose という名前の関数を宣言してください。この関数は引数として funcA と funcB という 2 つの関数を受け取り、新しい関数を返します。リターンされた関数は引数 x を受け取ります。リターンされた関数を実行すると、funcA の実行結果を funcB の引数として渡した結果を返します。
// ここにコードを書きましょう

function multiplyTwo(x) {
  return x * 2;
}

function addTen(x) {
  return x + 10;
}

const baz = compose(multiplyTwo, addTen);
baz(5); // 20
baz(100); // 210

