export function groupElementsBy<A>(
  elements: Array<A>,
  groupLength: number,
): Array<Array<A>> {
  return elements.reduce<Array<Array<A>>>(
    (accumulator, element) => {
      let lastGroup = accumulator.at(-1)!;

      if (lastGroup.length === groupLength) {
        lastGroup = [];
        accumulator.push(lastGroup);
      }

      lastGroup.push(element);

      return accumulator;
    },
    [[]],
  );
}
