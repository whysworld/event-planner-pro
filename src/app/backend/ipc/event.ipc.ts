import { ipcMain } from "electron-better-ipc";
import { JsonValue } from "type-fest";
import db from "../../shared/database";
import { IPCEvent } from "../../shared/ipc/event.ipc";
import * as _ from "lodash";
export class EventsIPC {
  public listen() {
    ipcMain.handle(IPCEvent.CHANNEL, async (event, req: IPCEvent.IRequest) =>
      this.processRequest(req)
    );
  }
  public async processRequest(req: IPCEvent.IRequest): Promise<JsonValue> {
    switch (req.action) {
      case "read":
        return Promise.resolve(this.readEventData(req));
        break;
      case "create":
        return Promise.resolve(this.createEventData(req));
        break;
      case "delete":
        break;
      case "update":
        return Promise.resolve(this.updateEventData(req));
        break;

      default:
        break;
    }

    // return Promise.resolve(result.toJsonValue());
  }

  public async readEventData(req: IPCEvent.IRequest) {
    const resultFromDB = await db.Event.findAll({
      where: req.payload,
    });
    let result: IPCEvent.Response = null;
    if (_.isEmpty(resultFromDB)) {
      result = new IPCEvent.Response({
        valid: false,
        error: "no results",
        data: null,
        count: 0,
      });
    } else {
      result = new IPCEvent.Response({
        valid: true,
        error: "",
        data: resultFromDB[0].dataValues,
        count: 1,
      });
    }
    return result.toJsonValue();
  }
  public async updateEventData(req: IPCEvent.IRequest) {
    const payload = _.pickBy(req.payload);
    const resultFromDB = await db.Event.update(payload, {
      where: {
        id: payload.id,
      },
    });
    let result: IPCEvent.Response = null;
    if (_.isEmpty(resultFromDB)) {
      result = new IPCEvent.Response({
        valid: false,
        error: "no results",
        data: null,
        count: 0,
      });
    } else {
      result = new IPCEvent.Response({
        valid: resultFromDB[0] === 1 ? true : false,
        error: "",
        data: null,
        count: 0,
      });
    }
    return result.toJsonValue();
  }
  public async createEventData(req: IPCEvent.IRequest) {
    const payload = _.pickBy(req.payload);
    const resultFromDB = await db.Event.create(payload);
    let result: IPCEvent.Response = null;
    if (_.isEmpty(resultFromDB)) {
      result = new IPCEvent.Response({
        valid: false,
        error: "no results",
        data: null,
        count: 0,
      });
    } else {
      result = new IPCEvent.Response({
        valid: resultFromDB[0] === 1 ? true : false,
        error: "",
        data: null,
        count: 0,
      });
    }
    return result.toJsonValue();
  }
}
