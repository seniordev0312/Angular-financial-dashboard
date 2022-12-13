import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RoleList } from "../models/role-list.model";
import { Role } from "../models/role.model";
import { UserSecurityRepository } from "../store/user-security.repository";

@Injectable({ providedIn: 'root' })
export class UserSecurityService {
    private baseUrl = `${environment.identityServerURL}/Roles`;

    constructor(
        private httpClient: HttpClient,
        private userSecurityRepository: UserSecurityRepository
    ) { }

    getRoles(pageIndex: number, pageSize: number, backendUrl?: string): void {
        let endPointUrl = this.baseUrl;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };
        if (backendUrl) {
            endPointUrl = backendUrl;
        }
        else {
            httpOptions = {
                ...httpOptions,
                params: httpOptions.params.set('PageIndex', pageIndex.toString()).set('PageSize', pageSize.toString()),
            }
        }
        this.httpClient.get<RoleList>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.userSecurityRepository.updateRolesList(data);
            }
        });
    }

    getClaimsByRole(role: Role): void {
        const endPointUrl = `${this.baseUrl}/${role.id}/Claims`
        this.httpClient.get<any>(endPointUrl).subscribe(data => {
            if (data) {
                let updatedRole = this.userSecurityRepository.updateRoleClaims(role.id, data);
                this.userSecurityRepository.updateRole(updatedRole);
            }
        });
    }

    // addRole(role: any): void {
    //     console.log(role);
    //     this.httpClient.post<any>(this.baseUrl, document).subscribe(data => {
    //         if (!data) {
    //             this.userSecurityRepository.addDocument(data);
    //         }
    //     });
    // }

    // editRole(role: any): void {
    //     console.log(role);
    //     this.httpClient.put<any>(this.baseUrl, document).subscribe(data => {
    //         if (!data) {
    //             this.userSecurityRepository.updateDocument(data);
    //         }
    //     });
    // }

    // deleteRole(roleId: string): void {
    //     const endPointUrl = `${this.baseUrl}/${roleId}`
    //     this.httpClient.delete<void>(endPointUrl).subscribe(() => {
    //         this.userSecurityRepository.deleteDocument(roleId);
    //     });
    // }
}
