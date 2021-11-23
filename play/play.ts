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

import { stringField } from '../src/fields/stringField';

import { numberField } from '../src/fields/numberField';

console.log(inspect(
  numberField({ message: 'sda' }).integer('i').resolve(0.0001)
));
