import { IFilterModel } from "../filter/filter.interface";
import { ITab } from "../tabs/tab.interface";

export interface ITable {
  tableInfo: {[key: string]: string};
  getData: {[key: string]: string};
  expanded: string[];
  header: string[];
  searchRef?: boolean;
  buttons?: ITab[];
  csv?: string
  popUp?: boolean;
}

export interface IDataTable {
  Inicio?: string;
  Fin?: string;
  Total?: string;
  Filtros?: IFilterModel[];
  Id?: string;
}
