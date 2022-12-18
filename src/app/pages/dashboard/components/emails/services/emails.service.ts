import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EmailItem } from "../models/email-item.model";
import { EmailsRepository } from "../store/emails.repository";

@Injectable({ providedIn: 'root' })
export class EmailsService {
    private baseUrl = `${environment.customerServer}/api/Email`;

    constructor(
        private httpClient: HttpClient,
        private emailsRepository: EmailsRepository
    ) { }

    getEmails(pageIndex: number, pageSize: number, backendUrl?: string): void {
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
        this.httpClient.get<EmailItem[]>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                if (data.length === 0)
                    data = [
                        {
                            key: "2022-12-02T00:00:00",
                            value: [
                                {
                                    id: "AAMkAGMzZmI2NzJkLTRkNDAtNGRmYS04Y2YwLTZkYjIxZGU1YmQwMgBGAAAAAACbMaMIxduMTaRM6Ij7hWGXBwAJhAw6jQVgT7LZGv2nSh9nAAAAAAEMAAAJhAw6jQVgT7LZGv2nSh9nAAA7_6SqAAA=",
                                    from: "Azure DevOps",
                                    fromEmail: "azuredevops@microsoft.com",
                                    subject: "You have been invited to a Azure DevOps Project!",
                                    body: "<html>...HTML BODY...</html>",
                                    dateCreated: "2022-12-02T07:35:57",
                                    profilePictureUrl: "https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160__340.png"
                                },
                                {
                                    id: "AAMkAGMzZmI2NzJkLTRkNDAtNGRmYS04Y2YwLTZkYjIxZGU1YmQwMgBGAAAAAACbMaMIxduMTaRM6Ij7hWGXBwAJhAw6jQVgT7LZGv2nSh9nAAAAAAEMAAAJhAw6jQVgT7LZGv2nSh9nAAA7_6SqAAA=",
                                    from: "Azure DevOps",
                                    fromEmail: "azuredevops@microsoft.com",
                                    subject: "You have been invited to a Azure DevOps Project!",
                                    body: "<html>...HTML BODY...</html>",
                                    dateCreated: "2022-12-02T07:35:57",
                                    profilePictureUrl: "https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160__340.png"
                                }
                            ]
                        },
                        {
                            key: "2022-12-02T00:00:00",
                            value: [
                                {
                                    id: "AAMkAGMzZmI2NzJkLTRkNDAtNGRmYS04Y2YwLTZkYjIxZGU1YmQwMgBGAAAAAACbMaMIxduMTaRM6Ij7hWGXBwAJhAw6jQVgT7LZGv2nSh9nAAAAAAEMAAAJhAw6jQVgT7LZGv2nSh9nAAA7_6SqAAA=",
                                    from: "Azure DevOps",
                                    fromEmail: "azuredevops@microsoft.com",
                                    subject: "You have been invited to a Azure DevOps Project!",
                                    body: "<html>...HTML BODY...</html>",
                                    dateCreated: "2022-12-02T07:35:57",
                                    profilePictureUrl: ""
                                },
                                {
                                    id: "AAMkAGMzZmI2NzJkLTRkNDAtNGRmYS04Y2YwLTZkYjIxZGU1YmQwMgBGAAAAAACbMaMIxduMTaRM6Ij7hWGXBwAJhAw6jQVgT7LZGv2nSh9nAAAAAAEMAAAJhAw6jQVgT7LZGv2nSh9nAAA7_6SqAAA=",
                                    from: "Azure DevOps",
                                    fromEmail: "azuredevops@microsoft.com",
                                    subject: "You have been invited to a Azure DevOps Project!",
                                    body: "<html>...HTML BODY...</html>",
                                    dateCreated: "2022-12-02T07:35:57",
                                    profilePictureUrl: "https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160__340.png"
                                },
                                {
                                    id: "AAMkAGMzZmI2NzJkLTRkNDAtNGRmYS04Y2YwLTZkYjIxZGU1YmQwMgBGAAAAAACbMaMIxduMTaRM6Ij7hWGXBwAJhAw6jQVgT7LZGv2nSh9nAAAAAAEMAAAJhAw6jQVgT7LZGv2nSh9nAAA7_6SqAAA=",
                                    from: "Azure DevOps",
                                    fromEmail: "azuredevops@microsoft.com",
                                    subject: "You have been invited to a Azure DevOps Project!",
                                    body: "<html>...HTML BODY...</html>",
                                    dateCreated: "2022-12-02T07:35:57",
                                    profilePictureUrl: "https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160__340.png"
                                }
                            ]
                        },
                        {
                            key: "2022-12-02T00:00:00",
                            value: [
                                {
                                    id: "AAMkAGMzZmI2NzJkLTRkNDAtNGRmYS04Y2YwLTZkYjIxZGU1YmQwMgBGAAAAAACbMaMIxduMTaRM6Ij7hWGXBwAJhAw6jQVgT7LZGv2nSh9nAAAAAAEMAAAJhAw6jQVgT7LZGv2nSh9nAAA7_6SqAAA=",
                                    from: "Azure DevOps",
                                    fromEmail: "azuredevops@microsoft.com",
                                    subject: "You have been invited to a Azure DevOps Project!",
                                    body: "<html>...HTML BODY...</html>",
                                    dateCreated: "2022-12-02T07:35:57",
                                    profilePictureUrl: "https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160__340.png"
                                },
                                {
                                    id: "AAMkAGMzZmI2NzJkLTRkNDAtNGRmYS04Y2YwLTZkYjIxZGU1YmQwMgBGAAAAAACbMaMIxduMTaRM6Ij7hWGXBwAJhAw6jQVgT7LZGv2nSh9nAAAAAAEMAAAJhAw6jQVgT7LZGv2nSh9nAAA7_6SqAAA=",
                                    from: "Azure DevOps",
                                    fromEmail: "azuredevops@microsoft.com",
                                    subject: "You have been invited to a Azure DevOps Project!",
                                    body: "<html>...HTML BODY...</html>",
                                    dateCreated: "2022-12-02T07:35:57",
                                    profilePictureUrl: "https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160__340.png"
                                }
                            ]
                        }
                    ];
                this.emailsRepository.updateEmails(data);
            }
        });
    }
}