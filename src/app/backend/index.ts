import { EventsIPC } from "./ipc/event.ipc";
import { UserIPC } from "./ipc/user.ipc";

export class BackendMain {
  private eventsIPC: EventsIPC;
  private userIPC: UserIPC;

  constructor() {
    this.eventsIPC = new EventsIPC();
    this.userIPC = new UserIPC();
  }

  public listen(): void {
    this.eventsIPC.listen();
    this.userIPC.listen();
  }
}
