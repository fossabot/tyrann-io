import { string, struct } from 'tyrann-io';

const signUpForm = struct({
  username: string(),
  password: string(),
})