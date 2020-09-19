export interface StringFunc {
  [index: string]: Function;
}

export interface StringAny {
  [index: string]: any;
}

export interface SrouceConfig {
  method: string;
  url: string;
  value: any;
  params?: Function;
  data?: Function;
  dataType?: string;
  dataResolver?: string | Function;
  saveDataWhenResolved?: boolean;
  appendData?: boolean;
  ignoreErrorHandler?: boolean;
  fass?: Function;
}

export interface OperateConfig {
  name: string;
  type: string;
  action: SrouceConfig;
  field: StringAny;
}

export interface CellConfig {
  spaceName?: string;
  name: string;
  model: any;
  children: CellConfig[];
  sourceType: string;
  source: any;
  operate: OperateConfig;
}
