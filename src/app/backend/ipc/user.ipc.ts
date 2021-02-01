import { ipcMain } from "electron-better-ipc";
import { JsonValue } from "type-fest";
import db from "../../shared/database";
import { IPCUser } from "../../shared/ipc/user.ipc";
import * as _ from "lodash";
export class UserIPC {
  public listen() {
    ipcMain.handle(IPCUser.CHANNEL, async (event, req: IPCUser.IRequest) =>
      this.processRequest(req)
    );
  }
  public async processRequest(req: IPCUser.IRequest): Promise<JsonValue> {
    switch (req.action) {
      case "read":
        return Promise.resolve(this.readUserData(req));
        break;
      case "create":
        break;
      case "delete":
        break;
      case "update":
        return Promise.resolve(this.updateUserData(req));
        break;

      default:
        break;
    }
  }
  public async readUserData(req: IPCUser.IRequest) {
    const resultFromDB = await db.User.findAll({
      where: req.payload,
    });
    let result: IPCUser.Response = null;
    if (_.isEmpty(resultFromDB)) {
      result = new IPCUser.Response({
        valid: false,
        error: "no results",
        data: null,
        count: 0,
      });
    } else {
      result = new IPCUser.Response({
        valid: true,
        error: "",
        data: resultFromDB[0].dataValues,
        count: 1,
      });
    }
    return result.toJsonValue();
  }

  public async updateUserData(req: IPCUser.IRequest) {
    const payload = _.pickBy(req.payload);
    const resultFromDB = await db.User.update(payload, {
      where: {
        id: payload.id,
      },
    });
    let result: IPCUser.Response = null;
    if (_.isEmpty(resultFromDB)) {
      result = new IPCUser.Response({
        valid: false,
        error: "no results",
        data: null,
        count: 0,
      });
    } else {
      result = new IPCUser.Response({
        valid: resultFromDB[0] === 1 ? true : false,
        error: "",
        data: null,
        count: 0,
      });
    }
    return result.toJsonValue();
  }
}
