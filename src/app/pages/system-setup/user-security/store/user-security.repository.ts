import { Inject, Injectable } from '@angular/core';
import { ClaimList } from '../models/claim-list.model';
import { RoleList } from '../models/role-list.model';
import { Role } from '../models/role.model';
import { USER_SECURITY_STORE, UserSecurityDocumentsStore } from './user-security.store';

@Injectable({
    providedIn: 'root',
})
export class UserSecurityRepository {
    constructor(
        @Inject(USER_SECURITY_STORE) private userSecurityDocumentsStore: UserSecurityDocumentsStore,
    ) { }


    updateRolesList(RoleList: RoleList): void {
        this.userSecurityDocumentsStore.update((state) => ({
            ...state,
            roleList: RoleList
        }));
    }
    updateClaims(claims: any): void {
        this.userSecurityDocumentsStore.update((state) => ({
            ...state,
            claims: claims
        }));
    }

    updateRoleClaims(roleId: string, claims: ClaimList[]) {
        const newList = [...this.userSecurityDocumentsStore.value.roleList.roles];
        const index = newList.findIndex((e) => e.id === roleId);
        if (index !== -1) {
            newList[index] = { id: newList[index].id, name: newList[index].name, claimList: claims };
        }
        return newList[index];
    }

    addRole(addedRole: Role) {
        this.userSecurityDocumentsStore.update((state) => ({
            ...state,
            roleList: {
                roles: [...this.userSecurityDocumentsStore.value.roleList.roles, addedRole],
                pageSize: this.userSecurityDocumentsStore.value.roleList.pageSize,
                totalCount: this.userSecurityDocumentsStore.value.roleList.totalCount
            }
        }));
    }

    deleteRole(roleId: string) {
        const roles = this.userSecurityDocumentsStore.value.roleList.roles;
        this.userSecurityDocumentsStore.update((state) => ({
            ...state,
            roleList: {
                roles: [...roles.filter(element => element.id !== roleId)],
                pageSize: this.userSecurityDocumentsStore.value.roleList.pageSize,
                totalCount: this.userSecurityDocumentsStore.value.roleList.totalCount
            }
        }));
    }

    updateRole(role: Role) {
        this.userSecurityDocumentsStore.update((state) => ({
            ...state,
            roleList:
            {
                roles: this.getUpdatedRoleList(role),
                pageSize: this.userSecurityDocumentsStore.value.roleList.pageSize,
                totalCount: this.userSecurityDocumentsStore.value.roleList.totalCount
            }
        }));
    }

    getUpdatedRoleList(role: Role): Role[] {
        const newList = [...this.userSecurityDocumentsStore.value.roleList.roles];
        const index = newList.findIndex((e) => e.id === role.id);
        if (index !== -1) {
            newList[index] = role;
        }
        return newList;
    }

    saveUserPolices(data: any) {
        this.userSecurityDocumentsStore.update((state) => ({
            ...state,
            userPolicies: data
        }));
    }
    getUserPolices() {
        this.userSecurityDocumentsStore.value.userPolicies;
    }
}
