import type { OneBitAdder } from ".";
import type { Bit, SixteenBitNumber, Xor } from "./base";

export type SixteenBitAdder<
  A extends SixteenBitNumber, 
  B extends SixteenBitNumber,
  C extends Bit = 0
> = OneBitAdder<A[15], B[15], C> extends infer S00
  ? OneBitAdder<A[14], B[14], S00[0 & keyof S00] & Bit> extends infer S01
    ? OneBitAdder<A[13], B[13], S01[0 & keyof S01] & Bit> extends infer S02
      ? OneBitAdder<A[12], B[12], S02[0 & keyof S02] & Bit> extends infer S03
        ? OneBitAdder<A[11], B[11], S03[0 & keyof S03] & Bit> extends infer S04
          ? OneBitAdder<A[10], B[10], S04[0 & keyof S04] & Bit> extends infer S05
            ? OneBitAdder<A[ 9], B[ 9], S05[0 & keyof S05] & Bit> extends infer S06
              ? OneBitAdder<A[ 8], B[ 8], S06[0 & keyof S06] & Bit> extends infer S07
                ? OneBitAdder<A[ 7], B[ 7], S07[0 & keyof S07] & Bit> extends infer S08
                  ? OneBitAdder<A[ 6], B[ 6], S08[0 & keyof S08] & Bit> extends infer S09
                    ? OneBitAdder<A[ 5], B[ 5], S09[0 & keyof S09] & Bit> extends infer S10 
                      ? OneBitAdder<A[ 4], B[ 4], S10[0 & keyof S10] & Bit> extends infer S11 
                        ? OneBitAdder<A[ 3], B[ 3], S11[0 & keyof S11] & Bit> extends infer S12
                          ? OneBitAdder<A[ 2], B[ 2], S12[0 & keyof S12] & Bit> extends infer S13
                            ? OneBitAdder<A[ 1], B[ 1], S13[0 & keyof S13] & Bit> extends infer S14
                              ? OneBitAdder<A[ 0], B[ 0], S14[0 & keyof S14] & Bit> extends infer S15
                                ? [
                                    S15[0 & keyof S15], 
                                    S15[1 & keyof S15], S14[1 & keyof S14], S13[1 & keyof S13], S12[1 & keyof S12], 
                                    S11[1 & keyof S11], S10[1 & keyof S10], S09[1 & keyof S09], S08[1 & keyof S08],
                                    S07[1 & keyof S07], S06[1 & keyof S06], S05[1 & keyof S05], S04[1 & keyof S04],
                                    S03[1 & keyof S03], S02[1 & keyof S02], S01[1 & keyof S01], S00[1 & keyof S00],
                                  ]
                                : never
                              : never
                            : never
                          : never 
                        : never 
                      : never 
                    : never
                  : never 
                : never 
              : never 
            : never 
          : never 
        : never 
      : never 
    : never 
  : never;

export type SixteenBitALU<
  A extends SixteenBitNumber, 
  B extends SixteenBitNumber, 
  Subtract extends Bit = 0
> = SixteenBitAdder<A, [
  Xor<B[ 0], Subtract>, Xor<B[ 1], Subtract>, Xor<B[ 2], Subtract>, Xor<B[ 3], Subtract>, 
  Xor<B[ 4], Subtract>, Xor<B[ 5], Subtract>, Xor<B[ 6], Subtract>, Xor<B[ 7], Subtract>, 
  Xor<B[ 8], Subtract>, Xor<B[ 9], Subtract>, Xor<B[10], Subtract>, Xor<B[11], Subtract>,
  Xor<B[12], Subtract>, Xor<B[13], Subtract>, Xor<B[14], Subtract>, Xor<B[15], Subtract>,
], Subtract>;