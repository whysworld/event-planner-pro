import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { ElectronService } from "../core/services";
import { IPCEvent } from "../shared/ipc/event.ipc";
import { IPCUser } from "../shared/ipc/user.ipc";
import { Store } from "@ngrx/store";
@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {
  userInfo: IPCUser.IUser;
  title: string;
  description: string;
  eventInfo: IPCEvent.IEvent;
  isPrinting: boolean = false;
  constructor(
    private store: Store<{
      user: IPCUser.IUser;
      event: IPCEvent.IEvent;
      title: string;
      description: string;
    }>,
    private electronService: ElectronService,
    private cd: ChangeDetectorRef
  ) {
    this.store.select("user").subscribe((res) => {
      this.userInfo = res;
    });
    this.store.select("event").subscribe((res) => {
      this.eventInfo = res;
    });
    this.store.select("title").subscribe((res) => {
      this.title = res;
    });
    this.store.select("description").subscribe((res) => {
      this.description = res;
    });
  }

  ngOnInit(): void {}
  print() {
    this.isPrinting = true;
    this.electronService.ipcRenderer.send("print-to-pdf");
    const self = this;
    setTimeout(() => {
      self.isPrinting = false;
      this.cd.detectChanges();
    }, 3500);
    this.electronService.ipcRenderer.on("wrote-pdf", (event, path, err) => {
      console.log("converted to pdf");
    });
  }
}
