export type Arbitrary = any;

export type AList = Arbitrary[];

export interface AProps {
  [propName: string]: Arbitrary;
}
