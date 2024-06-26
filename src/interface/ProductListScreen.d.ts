import {string} from 'yup';

export interface FinancialProductType {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}
