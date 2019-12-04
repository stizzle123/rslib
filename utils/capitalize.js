export function capitalize(str) {
  let name1 = str.split(" ")[0];
  let name2 = str.split(" ")[1];
  if (!name2) {
    return `${str.charAt(0).toUpperCase() + str.substring(1)}`;
  } else {
    return `${name1.charAt(0).toUpperCase() +
      name1.substring(1)} ${name2.charAt(0).toUpperCase() +
      name2.substring(1)}`;
  }
}
