import {IHair} from "./IHair.ts";
import {IAddress} from "./IAddress.ts";
import {IBank} from "./IBank.ts";
import {ICompany} from "./ICompany.ts";

export interface IUser{
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: IHair[];
  ip: string;
  address: IAddress[];
  macAddress: string;
  university: string;
  bank:IBank[];
  company: ICompany[];
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}