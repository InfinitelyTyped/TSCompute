import type { Bit } from "./base";

type Reverse<T extends unknown[]> = T extends [infer Head, ...infer Tail] ? [...Reverse<Tail>, Head] : [];

type CheckNegative<T> = T extends [infer Head, ...infer Tail] 
  ? Head extends 1 
    ? `-${BitsToDecimalSpreaderSigned<Reverse<Tail>, [Bit]>["length"]}`
    : `${BitsToDecimalSpreader<Reverse<Tail>, [Bit]>["length"]}`
  : '0';

type BitsToDecimalSpreader<T, Bits extends Bit[]> = T extends [infer A, ...infer Tail] 
  ? [...BitsOrNone<A & Bit, Bits>, ...BitsToDecimalSpreader<Tail, [...Bits, ...Bits]>] : [];

type BitsToDecimalSpreaderSigned<T, Bits extends Bit[]> = T extends [infer A, ...infer Tail]
  ? [...BitsOrNoneSigned<A & Bit, Bits>, ...BitsToDecimalSpreaderSigned<Tail, [...Bits, ...Bits]>] : [Bit];

type BitsOrNone<A extends Bit, Bits extends Bit[]> = A extends 1 ? Bits : [];

type BitsOrNoneSigned<A extends Bit, Bits extends Bit[]> = A extends 0 ? Bits : [];

export type BitsToDecimal<T extends Bit[]> = CheckNegative<T>;