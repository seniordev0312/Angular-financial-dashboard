import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AddBranch } from "../models/add-branch.model";
import { AddDepartment } from "../models/add-department";
import { AddGroup } from "../models/add-group.model";

@Injectable({ providedIn: 'root' })
export class CompanyStructureService {

    addBranchSubject = new BehaviorSubject<AddBranch>(null);
    addBranch$ = this.addBranchSubject.asObservable();

    addDepartmentSubject = new BehaviorSubject<AddDepartment>(null);
    addDepartment$ = this.addDepartmentSubject.asObservable();

    addGroupSubject = new BehaviorSubject<AddGroup>(null);
    addGroup$ = this.addGroupSubject.asObservable();

    constructor() {

    }

    addGroup() {

    }
    addDepartment(addDepartment: AddDepartment) {
        this.addDepartmentSubject.next(addDepartment);
    }
    addBranch(addBranch: AddBranch) {
        this.addBranchSubject.next(addBranch);
    }
}