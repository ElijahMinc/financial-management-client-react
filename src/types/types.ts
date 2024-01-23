export type Nullable<T> = T | null;

export enum ITransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
} 

export interface IUser {
  id: IResponseUser['id'];
  email: IUserData['email'];
  token: IResponseUserData['token'];
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IResponseUser extends Omit<IUserData, 'password'> {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IResponseUserData extends IUserData {
  token: string;
  user: IResponseUser;
}

export interface ITransactions{
  id: number
  title: string
  type: ITransactionType
  amount: number
  category: ICategory
  createdAt: string;
  updatedAt: string;
  
}

export interface ICategory {
  title: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  transactions: ITransactions[];
}

export interface IResponseTransactionLoader {
  categories: ICategory[]
  transactions: ITransactions[]
  totalExpense: number
  totalIncome: number
}