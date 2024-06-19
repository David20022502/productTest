import axios from 'axios';
import {
  DeleteRequestProps,
  GetRequestProps,
  PostRequestProps,
  PutRequestProps,
  RequestHandlerProps,
} from './RequestHandler.d';
export class RequestHandler {
  private appClient;
  constructor(props: RequestHandlerProps) {
    this.appClient = axios.create({
      baseURL: props.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        ...props.headers,
      },
    });
    this.appClient.defaults.timeout = props.timeout || 3000;
  }
  async post(props: PostRequestProps) {
    return await this.appClient.post(`${props.pathUrl}`, props.body, {
      headers: props.headers,
    });
  }
  async put(props: PutRequestProps) {
    return await this.appClient.put(`${props.pathUrl}`, props.body, {
      headers: props.headers,
    });
  }
  async get(props: GetRequestProps) {
    return await this.appClient.get(
      `${props.pathUrl}${
        props.pathParamas
          ? `?${Object.keys(props.pathParamas)
              .map(key => {
                return `${key}=${props.pathParamas && props.pathParamas[key]}`;
              })
              .join('&')}`
          : ''
      }`,
      {
        headers: props.headers,
      },
    );
  }
  async delete(props: DeleteRequestProps) {
    return await this.appClient.delete(
      `${props.pathUrl}?${Object.keys(props.keyDelete)
        .map(key => `${key}=${props.keyDelete[key]}`)
        .join('&')}`,
      {
        headers: props.headers,
      },
    );
  }
}
