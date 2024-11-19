import { Estimate } from "../entities/estimate";

export function daysText(from: number, to: number): string {
  return `${from === to ? Estimate.toDays(from) : `${Estimate.toDays(from)}-${Estimate.toDays(to)}`} days`;
}
