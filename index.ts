type Bit = 0 | 1;

type FourBitNumber = [Bit, Bit, Bit, Bit];
type EightBitNumber = [...FourBitNumber, ...FourBitNumber];
type SixteenBitNumber = [...EightBitNumber, ...EightBitNumber];

type Upcast<N extends FourBitNumber> = [0, 0, 0, 0, ...N];

type AND<A extends Bit, B extends Bit> = A extends 1 ? B extends 1 ? 1 : 0 : 0;
type OR<A extends Bit, B extends Bit> = A extends 1 ? 1 : B extends 1 ? 1 : 0;
type NOT<A extends Bit> = A extends 1 ? 0 : 1;
type XOR<A extends Bit, B extends Bit> = A extends 1 ? B extends 1 ? 0 : 1 : B extends 1 ? 1 : 0;
type NAND<A extends Bit, B extends Bit> = NOT<AND<A, B>>;
type NOR<A extends Bit, B extends Bit> = NOT<OR<A, B>>;
type XNOR<A extends Bit, B extends Bit> = NOT<XOR<A, B>>;

type OneBitAdder<A extends Bit, B extends Bit, C extends Bit = 0> = NAND<A, B> extends infer S0
  ? NAND<NAND<A, S0 & Bit>, NAND<B, S0 & Bit>> extends infer S1
    ? NAND<C, S1 & Bit> extends infer S2
      ? [NAND<S2 & Bit, S0 & Bit>, NAND<NAND<S1 & Bit, S2 & Bit>, NAND<S2 & Bit, C>>, NAND<S2 & Bit, S0 & Bit>]
      : never
    : never
  : never;

type FourBitAdder<
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

type EightBitAdder<
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

type SixteenBitAdder<
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

type Reverse<T extends unknown[]> = T extends [infer Head, ...infer Tail] ? [...Reverse<Tail>, Head] : [];

type BitsToDecimal<T extends Bit[]> = CheckNegative<T>;

type CheckNegative<T> = T extends [infer Head, ...infer Tail] 
  ? Head extends 1 
    ? `-${BitsToDecimalSpreaderSigned<Reverse<Tail>, [number]>["length"]}`
    : `${BitsToDecimalSpreader<Reverse<Tail>, [number]>["length"]}`
  : '0';

type BitsToDecimalSpreader<T, Bits extends number[]> = T extends [infer A, ...infer Tail] 
  ? [...BitsOrNone<A & Bit, Bits>, ...BitsToDecimalSpreader<Tail, [...Bits, ...Bits]>] : [];

type BitsToDecimalSpreaderSigned<T, Bits extends number[]> = T extends [infer A, ...infer Tail]
  ? [...BitsOrNoneSigned<A & Bit, Bits>, ...BitsToDecimalSpreaderSigned<Tail, [...Bits, ...Bits]>] : [number];

type BitsOrNone<A extends Bit, Bits extends number[]> = A extends 1 ? Bits : [];

type BitsOrNoneSigned<A extends Bit, Bits extends number[]> = A extends 0 ? Bits : [];