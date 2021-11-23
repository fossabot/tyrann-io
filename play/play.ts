import {
  any,
  boolean,
  nullType,
  number,
  object,
  string,
  undefinedType,
} from '../src/types/BasicTypes';
import { InputOf, OutputOf } from '../src/types/infer';
import { struct } from '../src/types/StructType';
import { inspect } from 'util'

const multi = struct({
  nested: struct({
    nested1: struct({
      age: number(),
    }),
    nested2: struct({
      age: number(),
      name: string(),
    }),
  }),
});

console.log(inspect(
  multi.resolve({
    nested: {
      nested1: {
        age: '1123',
      },
      nested2: {
        age: '12321',
        name: 123213,
      },
    },
  }),
  false,
  999
));
