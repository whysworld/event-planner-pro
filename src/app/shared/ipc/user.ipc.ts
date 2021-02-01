import { IPCBaseMessage } from "./base.ipc";

export namespace IPCUser {
  export interface IUser {
    id?: number,
    name?: string,
    email?: string,
    phone?: string,
    address?: string,
    city?: string,
    state?: string,
    zip_code?: string,
    instagram?: string,
    knot?: string,
    createdAt?: Date,
    updatedAt?: Date
  }
  export interface IRequest{
      payload: IUser,
      action: 'read' | 'create' | 'delete' | 'update'
  }
  export interface IResponse {
    valid: boolean;
    error?: string;
    data?: {
      [key: string]: any;
    }[];
    count?: number;
  }
  export class Request extends IPCBaseMessage<IRequest> {}
  export class Response extends IPCBaseMessage<IResponse> {}
  export const CHANNEL: string = "channel_user";
}
