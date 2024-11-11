export function units(amount: number, unit = "rem"): string {
  return `${amount}${unit}`;
}

export type Fraction = `${number}fr`;

export type MathOperator = "+" | "-" | "*" | "/";
export type MathExpression =
  `${number | Fraction} ${MathOperator} ${number | Fraction}`;

export type Space = "fill" | number | Fraction | MathExpression;

export function computeSpace(value: Space | undefined): string | undefined {
  return typeof value === "number"
    ? units(value)
    : value === "fill"
      ? "100%"
      : isMathExpression(value)
        ? mathExpression(value)
        : value?.endsWith("fr")
          ? units(fraction(value), "%")
          : undefined;
}

function fraction(value: string): number {
  const amount = parseFloat(value);

  if (import.meta.env.DEV && (amount > 1 || amount < 0)) {
    throw new Error(
      `Fraction value must be in "[0, 1]" range, but received value is "${amount}".`,
    );
  }

  return Math.max(0, Math.min(amount * 100, 100));
}

function isMathExpression(value: string | undefined): value is MathExpression {
  return Boolean(value?.includes(" "));
}

function mathExpression(value: MathExpression): string {
  const [firstOperand, operator, secondOperand] = value.split(" ");
  const parsedFirstOperand = computeSpace(
    firstOperand.endsWith("fr")
      ? (firstOperand as Fraction)
      : Number(firstOperand),
  );
  const parsedSecondOperand = computeSpace(
    secondOperand.endsWith("fr")
      ? (secondOperand as Fraction)
      : Number(secondOperand),
  );
  return `calc(${parsedFirstOperand} ${operator} ${parsedSecondOperand})`;
}
