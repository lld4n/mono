export function findNameByImage(value: string): string {
  const objectValue = JSON.parse(value);
  const stringSrcValue = objectValue.src.toString();
  let characterName = stringSrcValue.split('/');
  characterName = characterName[characterName.length - 1].split('.');
  return characterName[0];
}
