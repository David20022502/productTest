export interface RequestHandlerProps {
  baseUrl: string;
  headers?: {[key: string]: any};
}
interface MainRequestType {
  pathUrl: string;
  headers?: {[key: string]: any};
}
export interface GetRequestProps extends MainRequestType {
  pathParamas?: {[key: string]: string};
}
export interface PostRequestProps extends MainRequestType {
  body: {[key: string]: any};
}

export interface PutRequestProps extends MainRequestType {
  body: {[key: string]: any};
}
export interface DeleteRequestProps extends MainRequestType {
  keyDelete: {[key: string]: string};
}
