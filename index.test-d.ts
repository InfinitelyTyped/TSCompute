import {
  Bit,
  EightBitAdder,
  EightBitNumber,
  FourBitAdder,
  FourBitNumber,
  OneBitAdder,
} from ".";
import { expectType } from "tsd";

/** ============ One Bit Adder ============ */
declare function oneBitAdd<A extends Bit, B extends Bit, C extends Bit = 0>(
  a: A,
  b: B,
  c: C
): OneBitAdder<A, B, C>;

expectType<[0, 0]>(oneBitAdd(0, 0, 0));
expectType<[0, 1]>(oneBitAdd(0, 0, 1));
expectType<[0, 1]>(oneBitAdd(0, 1, 0));
expectType<[1, 0]>(oneBitAdd(0, 1, 1));
expectType<[0, 1]>(oneBitAdd(1, 0, 0));
expectType<[1, 0]>(oneBitAdd(1, 0, 1));
expectType<[1, 0]>(oneBitAdd(1, 1, 0));
expectType<[1, 1]>(oneBitAdd(1, 1, 1));

/** ============ Four Bit Adder ============ */
declare function fourBitAdd<
  A extends FourBitNumber,
  B extends FourBitNumber,
  C extends Bit = 0
>(a: A, b: B, c: C): FourBitAdder<A, B, C>;

expectType<[0, 0, 0, 0, 0]>(fourBitAdd([0, 0, 0, 0], [0, 0, 0, 0], 0));
expectType<[1, 0, 0, 0, 0]>(fourBitAdd([1, 0, 0, 1], [0, 1, 1, 1], 0));
expectType<[1, 0, 0, 0, 0]>(fourBitAdd([1, 1, 1, 1], [0, 0, 0, 0], 1));
expectType<[1, 1, 1, 1, 1]>(fourBitAdd([1, 1, 1, 1], [1, 1, 1, 1], 1));

/** ============ Eight Bit Adder ============ */
declare function eightBitAdd<
  A extends EightBitNumber,
  B extends EightBitNumber,
  C extends Bit = 0
>(a: A, b: B, c: C): EightBitAdder<A, B, C>;

expectType<[0, 0, 0, 0, 0, 0, 0, 0, 0]>(
  eightBitAdd([0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], 0)
);
expectType<[1, 0, 0, 0, 0, 0, 0, 0, 0]>(
  eightBitAdd([1, 0, 0, 0, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 1, 1], 0)
);
expectType<[1, 0, 0, 0, 0, 0, 0, 0, 0]>(
  eightBitAdd([1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0], 1)
);
expectType<[1, 1, 1, 1, 1, 1, 1, 1, 1]>(
  eightBitAdd([1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], 1)
);
