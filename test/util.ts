import { Either, isLeft, isRight } from "../src/types/Either";

export const expectLeft = (t: Either<any, any>) => {
  return expect(isLeft(t)).toBe(true);
}

export const expectRight = (t: Either<any, any>) => {
  return expect(isRight(t)).toBe(true);
}