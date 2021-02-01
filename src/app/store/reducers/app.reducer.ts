import { createReducer, on, combineReducers } from "@ngrx/store";
import { setUserData, setDescription, setEventData, setTitle, IAppStore } from "../actions/app.action";
import { IPCUser } from "../../shared/ipc/user.ipc";
import { IPCEvent } from "../../shared/ipc/event.ipc";
import { state } from "@angular/animations";

const userInitialState: IPCUser.IUser = {};

const _userReducer = createReducer(
  userInitialState,
  on(setUserData, (state: IPCUser.IUser, { user }) => (state = user))
);

const eventInitialState: IPCEvent.IEvent = {};
const _eventReducer = createReducer(
  eventInitialState,
  on(setEventData, (state: IPCEvent.IEvent, { event }) => (state=event))
);

const titleInitialState: string = "";
const _titleReducer = createReducer(
  titleInitialState,
  on(setTitle, (state: string, { title }) => (state = title))
);

const descInitialState: string = "";
const _descriptionReducer = createReducer(
  descInitialState,
  on(setDescription, (state: string, { description }) => (state = description))
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}

export function eventReducer(state, action) {
  return _eventReducer(state, action);
}

export function titleReducer(state, action) {
  return _titleReducer(state, action);
}

export function descriptionReducer(state, action) {
  return _descriptionReducer(state, action);
}

