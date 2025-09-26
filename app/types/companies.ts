import { GhgEmission } from "./emission";

export type Company = {
  id: string;
  name: string;
  country: string; // Country.code
  emissions: GhgEmission[];
};
