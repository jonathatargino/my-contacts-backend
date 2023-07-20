export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  category_id: string;
  category_name: string;
}

export type IContactPostOrPutResponse = Omit<IContact, "category_name">
