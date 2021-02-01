import { Injectable } from "@angular/core";
import { ElectronService } from "../../core/services";
import { IPCEvent } from "../../shared/ipc/event.ipc";
@Injectable({
  providedIn: "root",
})
export class EventIPCService {
  constructor(private _electronService: ElectronService) {}
  public async executeQuery(query: IPCEvent.IRequest): Promise<IPCEvent.IResponse> {
    const req: IPCEvent.Request = new IPCEvent.Request(query);
    const rawRes: any = await this._electronService.ipcBetterRenderer.invoke(
      IPCEvent.CHANNEL,
      req.toJsonValue()
    );
    return new IPCEvent.Response(rawRes).toMessage();
  }
}
