import { createAction, props } from '@ngrx/store';
import { IPCUser } from "../../shared/ipc/user.ipc";
import { IPCEvent } from "../../shared/ipc/event.ipc";
export interface IAppStore{
    user?: IPCUser.IUser,
    event?: IPCEvent.IEvent,
    title?: string,
    description?: string
}
export const setUserData = createAction('[User List] Add User', props<{ user: IPCUser.IUser }>());
export const setEventData = createAction('[Event Object] Add Event', props<{ event: IPCEvent.IEvent }>());
export const setTitle = createAction('[Title String] Add', props<{ title: string }>());
export const setDescription = createAction('[Description String] Add', props<{ description: string }>());