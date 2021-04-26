import type { And, Bit } from "./base";

export type OneBitMultiplier<A extends Bit, B extends Bit> = And<A, B>;

export type TwoBitMultipler<A extends [Bit, Bit], B extends [Bit, Bit]> = 0;