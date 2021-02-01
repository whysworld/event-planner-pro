import { Injectable } from "@angular/core";
import { ElectronService } from "../../core/services";
import { IPCUser } from "../../shared/ipc/user.ipc";
@Injectable({
  providedIn: "root",
})
export class UserIPCService {
  constructor(private _electronService: ElectronService) {}
  public async executeQuery(query: IPCUser.IRequest): Promise<IPCUser.IResponse> {
    const req: IPCUser.Request = new IPCUser.Request(query);
    const rawRes: any = await this._electronService.ipcBetterRenderer.invoke(
      IPCUser.CHANNEL,
      req.toJsonValue()
    );
    return new IPCUser.Response(rawRes).toMessage();
  }
}
