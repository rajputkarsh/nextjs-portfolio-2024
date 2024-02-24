export const cloneDeep = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const removeHyphens = (text: string): string => {
  let newText = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "-") {
      const nextChar = text.charAt(i + 1);
      if (nextChar) {
        newText += nextChar.toUpperCase();
        i++;
      }
    } else {
      newText += text[i];
    }
  }
  return newText;
};
