import { Estimate } from "../entities/estimate";

export function displayDuration(from: number, to: number): string {
  if (from === to) {
    const days = Estimate.toDays(from);
    const finalAmount = days >= 30 ? toMonths(days) : days;

    return `${finalAmount} ${nounOf(finalAmount, days >= 30)}`;
  } else {
    const toDays = Estimate.toDays(to);
    const fromDays = Estimate.toDays(from);

    if (toDays >= 30 && fromDays >= 30) {
      return `${toMonths(fromDays)} - ${toMonths(toDays)} ${nounOf(2, true)}`;
    } else {
      return `${fromDays} - ${toDays} ${nounOf(2, false)}`;
    }
  }
}

function toMonths(days: number): number {
  return Number((days / 30).toFixed(1));
}

function nounOf(amount: number, isMonth: boolean): string {
  return (isMonth ? "month" : "day") + (amount === 1 ? "" : "s");
}
