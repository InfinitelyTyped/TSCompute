import { Bit, OneBitAdder } from ".";
import { expectType } from "tsd";

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
