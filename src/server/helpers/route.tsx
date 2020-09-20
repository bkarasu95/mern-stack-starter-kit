export function toURLConverter(text: string): string {
  text = text.toLowerCase();
  text = text.replace("ü", "u");
  text = text.replace(" ", "-");
  text = text.replace("ö", "o");
  text = text.replace("ı", "i");
  text = text.replace("ş", "s");
  text = text.replace("ğ", "g");
  text = text.replace("ç", "c");
  text = encodeURI(text); // ensure for uncoverted parts
  return text;
}
