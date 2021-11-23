/**
 * A resolver is a pipeline that takes input I, and outputs either O or a error trace.
 */

import { Either, isRight, makeLeft, makeRight } from "./Either";
import { ErrorMessage } from "./ErrorMessage";

export interface Resolver<I, O, E extends ErrorMessage, Name extends string> {
  name: Name;
  resolve: (input: I, contexts?: ErrorContext[]) => Result<O>;
  pipe: <O2, E2 extends ErrorMessage, Name2 extends string>(resolver: Resolver<O, O2, E2, Name2>) =>
    Resolver<I, O2, E | E2, Name2>;
}

export type Result<O> = Either<ErrorContext[], O>;

export type Key = string | number;

export interface ErrorContext {
  inputPath: Key[];
  resolverPath: Key[];
  error?: ErrorMessage;
}

export const makeErrorContext = (): ErrorContext => {
  return {
    inputPath: [],
    resolverPath: [],
    error: undefined,
  };
};

export const makeResolver = <I, O, E extends ErrorMessage, Name extends string>(
  name: Name,
  validate: (input: I) => Either<E, O> = makeLeft as any,
): Resolver<I, O, E, Name> => {
  return {
    name,
    resolve(input, contexts = [makeErrorContext()]) {
      const result = validate(input);
      if (isRight(result)) {
        return result;
      } else {
        contexts[contexts.length - 1].error = result.left;
        return makeLeft(contexts);
      }
    },
    pipe<O2, E2 extends ErrorMessage, Name2 extends string>(next: Resolver<O, O2, E2, Name2>) {
      const original = this;

      return {
        ...makeResolver<I, O2, E | E2, Name2>(next.name),
        resolve(input, contexts = [makeErrorContext()]) {
          const result = original.resolve(input, contexts);

          if (isRight(result)) {
            return next.resolve(result.right, contexts);
          }
          return result;
        },
      };
    }
  }
}
