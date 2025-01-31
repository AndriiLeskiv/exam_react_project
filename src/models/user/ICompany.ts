import {IAddress} from "./IAddress.ts";

export interface ICompany {
    department: string;
    name: string;
    title: string;
    address: IAddress[];
}