interface String {
  replaceAll(find: string, replace: string): string;
}

String.prototype.replaceAll = function (find, replace): string {
  var str = this;
  return str.replace(new RegExp(find, "g"), replace);
};
