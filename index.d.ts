export type Bit = 0 | 1;

type FourBitNumber = [Bit, Bit, Bit, Bit];
type EightBitNumber = [...FourBitNumber, ...FourBitNumber];
type SixteenBitNumber = [...EightBitNumber, ...EightBitNumber];

type Upcast<N extends FourBitNumber> = [0, 0, 0, 0, ...N];

type And<A extends Bit, B extends Bit> = A extends 1 ? B extends 1 ? 1 : 0 : 0;
type Or<A extends Bit, B extends Bit> = A extends 1 ? 1 : B extends 1 ? 1 : 0;
type Not<A extends Bit> = A extends 1 ? 0 : 1;
type Xor<A extends Bit, B extends Bit> = A extends 1 ? B extends 1 ? 0 : 1 : B extends 1 ? 1 : 0;
type Nand<A extends Bit, B extends Bit> = Not<And<A, B>>;
type Nor<A extends Bit, B extends Bit> = Not<Or<A, B>>;
type Xnor<A extends Bit, B extends Bit> = Not<Xor<A, B>>;

type _OneBitAdderLookup = {
  0: {
    0: {
      0: [0, 0],
      1: [0, 1],
    },
    1: {
      0: [0, 1],
      1: [1, 0],
    }
  },
  1: {
    0: {
      0: [0, 1],
      1: [1, 0],
    },
    1: {
      0: [1, 0],
      1: [1, 1],
    }
  }
}

export type OneBitAdder<A extends Bit, B extends Bit, C extends Bit = 0> = _OneBitAdderLookup[A][B][C];

export type FourBitAdder<A extends FourBitNumber, B extends FourBitNumber, C extends Bit = 0> =
  OneBitAdder<A[3], B[3], C> extends [infer Hi1, infer Lo1]
    ? OneBitAdder<A[2], B[2], Hi1 & Bit> extends [infer Hi2, infer Lo2]
      ? OneBitAdder<A[1], B[1], Hi2 & Bit> extends [infer Hi3, infer Lo3]
        ? OneBitAdder<A[0], B[0], Hi3 & Bit> extends [infer Hi4, infer Lo4]
          ? [Hi4, Lo4, Lo3, Lo2, Lo1]
          : never
        : never
      : never
    : never;

export type FourBitALU<
  A extends FourBitNumber, 
  B extends FourBitNumber, 
  Subtract extends Bit = 0
> = FourBitAdder<A, [Xor<B[0], Subtract>, Xor<B[1], Subtract>, Xor<B[2], Subtract>, Xor<B[3], Subtract>], Subtract>;

type _HiNibble<A extends EightBitNumber> =
    [A[0], A[1], A[2], A[3]];
type _LoNibble<A extends EightBitNumber> =
    [A[4], A[5], A[6], A[7]];

export type EightBitAdder<
  A extends EightBitNumber, 
  B extends EightBitNumber, 
  C extends Bit = 0
> =
  FourBitAdder<_LoNibble<A>, _LoNibble<B>, C> extends [infer Hi1, ...infer Lo1]
      ? [...FourBitAdder<_HiNibble<A>, _HiNibble<B>, Hi1 & Bit>, ...Lo1]
      : never;

export type EightBitALU<
  A extends EightBitNumber, 
  B extends EightBitNumber, 
  Subtract extends Bit = 0
> = EightBitAdder<A, [
  Xor<B[0], Subtract>, Xor<B[1], Subtract>, Xor<B[2], Subtract>, Xor<B[3], Subtract>, 
  Xor<B[4], Subtract>, Xor<B[5], Subtract>, Xor<B[6], Subtract>, Xor<B[7], Subtract>,
], Subtract>;

type _HiByte<A extends SixteenBitNumber> =
    [A[0], A[1], A[2], A[3], A[4], A[5], A[6], A[7]];
type _LoByte<A extends SixteenBitNumber> =
    [A[8], A[9], A[10], A[11], A[12], A[13], A[14], A[15]];

export type SixteenBitAdder<
  A extends SixteenBitNumber, 
  B extends SixteenBitNumber,
  C extends Bit = 0
> =
  EightBitAdder<_LoByte<A>, _LoByte<B>, C> extends [infer Hi1, ...infer Lo1]
      ? [...EightBitAdder<_HiByte<A>, _HiByte<B>, Hi1 & Bit>, ...Lo1]
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

type Reverse<T extends unknown[]> = T extends [infer Head, ...infer Tail] ? [...Reverse<Tail>, Head] : [];

export type BitsToDecimal<T extends Bit[]> = CheckNegative<T>;

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
