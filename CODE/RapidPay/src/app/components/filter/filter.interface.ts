export interface IComponentFilter {
  name: string;
  type: 'select' |'datetimerange' |'radioButton' | 'matCheckbox' | 'rangeNumber' | 'inputText';
  properties?: ICommonFilter[] | IDateTimeRangeFilter;
  label?: string;
  hint?: string;
  multiple?: boolean;
  defaultValue?: any;
  columns?: boolean
  disabled?: boolean;
}

export interface ICommonFilter {
  value: string;
  description: string;
  tooltip?: string;
}


export interface IFilterModel {
  name: string;
  value: string | number | string[] | any;
  type?:  'multiple' |'datetimerange' |'radioButton' | 'matCheckbox' | 'rangeNumber' | 'inputText';
  component?: IComponentFilter;
}

export interface IDateTimeRangeFilter {
  start: {
      name: string;
      label: string;
  };
  end: {
      name: string;
      label: string;
  };
}
