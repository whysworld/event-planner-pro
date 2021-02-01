import { IPCBaseMessage } from "./base.ipc";

export namespace IPCEvent {
  export type Time = 'Morning' | 'Afternoon' | 'Evening';
  export interface IEvent {
    id?: number | null;
    user_id?: number | null;
    time?: string | null;
    title?: string | null;
    date?: string | null;
    exact?: 0 | 1 | null;
    guest?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
  }
  export interface IRequest {
    payload: IEvent;
    action: "read" | "create" | "update" | "delete";
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
  export const CHANNEL: string = "channel_events";
}
