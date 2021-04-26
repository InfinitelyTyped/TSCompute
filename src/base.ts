export type Bit = 0 | 1;

export type FourBitNumber = [Bit, Bit, Bit, Bit];
export type EightBitNumber = [...FourBitNumber, ...FourBitNumber];
export type SixteenBitNumber = [...EightBitNumber, ...EightBitNumber];

export type FourBitZero = [0, 0, 0, 0];
export type EightBitZero = [...FourBitZero, ...FourBitZero];
export type SixteenBitZero = [...EightBitZero, ...EightBitZero];

export type UpcastToEightBits<N extends FourBitNumber> = [...FourBitZero, ...N];
export type UpcastToSixteenBits<N extends FourBitNumber | EightBitNumber> = N extends FourBitNumber ? [...EightBitZero, ...FourBitZero, ...N] : [...EightBitZero, ...N];

export type And<A extends Bit, B extends Bit> = A extends 1 ? (B extends 1 ? 1 : 0) : 0;
export type Or<A extends Bit, B extends Bit> = A extends 1 ? 1 : B extends 1 ? 1 : 0;
export type Not<A extends Bit> = A extends 1 ? 0 : 1;
export type Xor<A extends Bit, B extends Bit> = A extends 1 ? (B extends 1 ? 0 : 1) : B extends 1 ? 1 : 0;
export type Nand<A extends Bit, B extends Bit> = Not<And<A, B>>;
export type Nor<A extends Bit, B extends Bit> = Not<Or<A, B>>;
export type Xnor<A extends Bit, B extends Bit> = Not<Xor<A, B>>;
