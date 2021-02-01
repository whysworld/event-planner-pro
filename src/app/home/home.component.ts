import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { format, parse } from "date-fns";
import { Store } from '@ngrx/store';
// import { jsPDF } from "jspdf";
import { EventIPCService } from "../services/ipc/event.ipc.service";
import { UserIPCService } from "../services/ipc/user.ipc.service";
import { IPCEvent } from "../shared/ipc/event.ipc";
import { IPCUser } from "../shared/ipc/user.ipc";
import { ElectronService } from "../core/services";
import { setUserData, setEventData, setTitle, setDescription } from "../store/actions/app.action";

const createUserFormGroup = (
  _fb: FormBuilder,
  user: IPCUser.IUser
): FormGroup => {
  return _fb.group({
    id: [user.id],
    name: [user.name],
    email: [user.email, [Validators.required, Validators.email]],
    phone: [user.phone],
    address: [user.address],
    city: [user.city],
    state: [user.state],
    zip_code: [user.zip_code],
    instagram: [user.instagram],
    knot: [user.knot],
  });
};
const createEventFormGroup = (
  _fb: FormBuilder,
  event: IPCEvent.IEvent
): FormGroup => {
  return _fb.group({
    id: [event.id],
    title: [event.title],
    date: [parse(event.date, "yyyy-MM-dd", new Date())],
    time: [event.time],
    exact: [event.exact],
    guest: [event.guest],
    user_id: [event.user_id],
  });
};

namespace DBAction {
  export type Action = "read" | "create" | "update" | "delete";
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild("pdfElement", { static: true }) pdfElement: ElementRef;
  title: string = "Event Planner Pro";
  description: string =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
    tempor incididunt ut labore et dolore magna aliqua. Sapien faucibus et \
    molestie ac feugiat sed lectus. Fermentum posuere urna nec tincidunt \
    praesent semper. Vestibulum sed arcu non odio. Neque gravida in \
    fermentum et sollicitudin ac.";
  aboutYou: FormGroup;
  aboutEvent: FormGroup;
  user: IPCUser.IUser;
  event: IPCEvent.IEvent;
  timeList: IPCEvent.Time[] = ["Morning", "Afternoon", "Evening"];
  previousEventDate: Date;
  eventAction: DBAction.Action;
  userAction: DBAction.Action;
  isPrinting: boolean = false;
  constructor(
    private _router: Router,
    private eventIPCService: EventIPCService,
    private userIPCService: UserIPCService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _changeDetectorRef: ChangeDetectorRef,
    private electronService: ElectronService,
    private store: Store<{ user: IPCUser.IUser }>
  ) {
    const now = new Date();
    this.previousEventDate = new Date();
    this.resetUserData();
    this.resetEventData();

    this.aboutYou = createUserFormGroup(this._fb, this.user);
    this.aboutEvent = createEventFormGroup(this._fb, this.event);
  }

  async ngOnInit() {
    //load user data
    this.loadUserData();
    //load event data
    this.loadEventData();
    this.store.dispatch(setTitle({title: this.title}));
    this.store.dispatch(setDescription({description: this.description}));
  }

  resetUserData() {
    this.userAction = "create";
    this.user = {
      id: -1,
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      instagram: "",
      knot: "",
    };
  }
  resetEventData() {
    this.eventAction = "create";
    this.event = {
      id: null,
      title: null,
      date: format(this.previousEventDate, "yyyy-MM-dd"),
      time: null,
      exact: null,
      guest: null,
      user_id: 1,
    };
  }
  async save() {
    if (!this.aboutYou.pristine) this.saveUserData();
    if (!this.aboutEvent.pristine) this.saveEventData();
    this._snackBar.open("Saved successfully!", "", {
      duration: 2000,
      panelClass: "center",
    });
  }
  async saveUserData() {
    const req: IPCUser.IRequest = {
      payload: this.aboutYou.value as IPCUser.IUser,
      action: this.userAction,
    };
    await this.userIPCService.executeQuery(req);
    this.loadUserData();
  }
  async saveEventData() {
    const req: IPCEvent.IRequest = {
      payload: {
        ...(this.aboutEvent.value as IPCEvent.IEvent),
        date: format(this.aboutEvent.value.date, "yyyy-MM-dd"),
      },
      action: this.eventAction,
    };
    await this.eventIPCService.executeQuery(req);
    this.loadEventData();
  }
  async loadUserData() {
    let req: IPCUser.IRequest = {
      payload: {
        id: 1,
      },
      action: "read",
    };
    const resultFromUserDB = await this.userIPCService.executeQuery(req);
    if (resultFromUserDB.valid) {
      this.user = resultFromUserDB.data as IPCUser.IUser;
      this.userAction = "update";
    } else {
      this.resetUserData();
    }
    this.aboutYou = createUserFormGroup(this._fb, this.user);
    this.store.dispatch(setUserData({user: this.user}));
  }
  async loadEventData() {
    let req: IPCEvent.IRequest = {
      payload: {
        user_id: 1,
        date: format(this.previousEventDate, "yyyy-MM-dd"),
      },
      action: "read",
    };
    const resultFromEventDB = await this.eventIPCService.executeQuery(req);
    if (resultFromEventDB.valid) {
      this.event = resultFromEventDB.data as IPCEvent.IEvent;
      this.eventAction = "update";
    } else {
      this.resetEventData();
    }
    this.aboutEvent = createEventFormGroup(this._fb, this.event);
    this.store.dispatch(setEventData({event: this.event}));
  }
  async preview() {
    this._router.navigate(['/detail']);
  }
  findEvent() {
    this.loadEventData();
  }

  openPDF(): void {

  }
}
