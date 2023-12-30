export enum FormActionType {
  setTitle,
  setDescription,
  setImage,
  setImageStatus,
  setCategories,
  setPrice,
  setEmail,
  setPassword,
}

export type FormAction = {
  type: FormActionType;
  payload: boolean | string | number | string[] | File | null | undefined;
};
