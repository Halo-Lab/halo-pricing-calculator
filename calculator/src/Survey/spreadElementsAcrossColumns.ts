import { JSX } from "react";

export function spreadElementsAcrossColumns(
  list: Array<JSX.Element>,
): [even: Array<JSX.Element>, odd: Array<JSX.Element>] {
  const zip: [Array<JSX.Element>, Array<JSX.Element>] = [[], []];
  list.forEach((element, index) => zip[index % 2].push(element));
  return zip;
}
