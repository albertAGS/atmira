export interface ITab {
  name: string,
  icon?: string,
  get?:  {[key: string]: string},
  url?: string,
}
