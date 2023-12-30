export type Auth = {
  email: string,
  password: string,
}

export type Signup = {
  email: string,
  password: string,
}

export type User = {
  id?: string,
  email: string,
  password?: string,
  token?: string,
}
