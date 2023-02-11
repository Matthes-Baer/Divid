import { Hint } from "../utils/interfaces-and-types";

export const HINTS_STATIC = (number: number) => {
  let data: Array<Hint> = [
    {
      number: 3,
      dividable: number % 3 === 0 ? true : false,
      used: false,
    },
    {
      number: 4,
      dividable: number % 4 === 0 ? true : false,
      used: false,
    },
    {
      number: 5,
      dividable: number % 5 === 0 ? true : false,
      used: false,
    },
    {
      number: 6,
      dividable: number % 6 === 0 ? true : false,
      used: false,
    },
    {
      number: 7,
      dividable: number % 7 === 0 ? true : false,
      used: false,
    },
    {
      number: 8,
      dividable: number % 8 === 0 ? true : false,
      used: false,
    },
    {
      number: 9,
      dividable: number % 9 === 0 ? true : false,
      used: false,
    },
    {
      number: 10,
      dividable: number % 10 === 0 ? true : false,
      used: false,
    },
    {
      number: 11,
      dividable: number % 11 === 0 ? true : false,
      used: false,
    },
    {
      number: 12,
      dividable: number % 12 === 0 ? true : false,
      used: false,
    },
    {
      number: 13,
      dividable: number % 13 === 0 ? true : false,
      used: false,
    },
    {
      number: 14,
      dividable: number % 14 === 0 ? true : false,
      used: false,
    },
    {
      number: 15,
      dividable: number % 15 === 0 ? true : false,
      used: false,
    },
    {
      number: 16,
      dividable: number % 16 === 0 ? true : false,
      used: false,
    },
    {
      number: 17,
      dividable: number % 17 === 0 ? true : false,
      used: false,
    },
    {
      number: 18,
      dividable: number % 18 === 0 ? true : false,
      used: false,
    },
    {
      number: 19,
      dividable: number % 19 === 0 ? true : false,
      used: false,
    },
    {
      number: 20,
      dividable: number % 20 === 0 ? true : false,
      used: false,
    },
  ];

  return data;
};
