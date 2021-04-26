import type { Bit, EightBitNumber, FourBitNumber, Nand, Xor } from "./base";

export type OneBitAdder<A extends Bit, B extends Bit, C extends Bit = 0> = Nand<A, B> extends infer S0
  ? Nand<Nand<A, S0 & Bit>, Nand<B, S0 & Bit>> extends infer S1
    ? Nand<C, S1 & Bit> extends infer S2
      ? [Nand<S2 & Bit, S0 & Bit>, Nand<Nand<S1 & Bit, S2 & Bit>, Nand<S2 & Bit, C>>]
      : never
    : never
  : never;
  
export type FourBitAdder<
  A extends FourBitNumber, 
  B extends FourBitNumber, 
  C extends Bit = 0
> = OneBitAdder<A[3], B[3], C> extends infer S0
  ? OneBitAdder<A[2], B[2], S0[0 & keyof S0] & Bit> extends infer S1
    ? OneBitAdder<A[1], B[1], S1[0 & keyof S1] & Bit> extends infer S2
      ? OneBitAdder<A[0], B[0], S2[0 & keyof S2] & Bit> extends infer S3
        ? [S3[0 & keyof S3], S3[1 & keyof S3], S2[1 & keyof S2], S1[1 & keyof S1], S0[1 & keyof S0]]
        : never
      : never
    : never
  : never;

export type FourBitALU<
  A extends FourBitNumber, 
  B extends FourBitNumber, 
  Subtract extends Bit = 0
> = FourBitAdder<A, [Xor<B[0], Subtract>, Xor<B[1], Subtract>, Xor<B[2], Subtract>, Xor<B[3], Subtract>], Subtract>;

export type EightBitAdder<
  A extends EightBitNumber, 
  B extends EightBitNumber, 
  C extends Bit = 0
> = OneBitAdder<A[7], B[7], C> extends infer S0
  ? OneBitAdder<A[6], B[6], S0[0 & keyof S0] & Bit> extends infer S1
    ? OneBitAdder<A[5], B[5], S1[0 & keyof S1] & Bit> extends infer S2 
      ? OneBitAdder<A[4], B[4], S2[0 & keyof S2] & Bit> extends infer S3 
        ? OneBitAdder<A[3], B[3], S3[0 & keyof S3] & Bit> extends infer S4
          ? OneBitAdder<A[2], B[2], S4[0 & keyof S4] & Bit> extends infer S5
            ? OneBitAdder<A[1], B[1], S5[0 & keyof S5] & Bit> extends infer S6
              ? OneBitAdder<A[0], B[0], S6[0 & keyof S6] & Bit> extends infer S7
                ? [S7[0 & keyof S7], S7[1 & keyof S7], S6[1 & keyof S6], S5[1 & keyof S5], S4[1 & keyof S4], S3[1 & keyof S3], S2[1 & keyof S2], S1[1 & keyof S1], S0[1 & keyof S0]]
                : never
              : never
            : never
          : never 
        : never 
      : never 
    : never
  : never;

export type EightBitALU<
  A extends EightBitNumber, 
  B extends EightBitNumber, 
  Subtract extends Bit = 0
> = EightBitAdder<A, [
  Xor<B[0], Subtract>, Xor<B[1], Subtract>, Xor<B[2], Subtract>, Xor<B[3], Subtract>, 
  Xor<B[4], Subtract>, Xor<B[5], Subtract>, Xor<B[6], Subtract>, Xor<B[7], Subtract>,
], Subtract>;