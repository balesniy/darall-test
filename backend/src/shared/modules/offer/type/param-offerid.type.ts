import { ParamsDictionary } from 'express-serve-static-core';

export type ParamOfferId = {
  offerId: number;
} | ParamsDictionary;
