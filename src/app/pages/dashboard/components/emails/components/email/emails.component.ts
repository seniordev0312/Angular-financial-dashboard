import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { LayoutService } from '@root/shared/services/layout.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailsComponent implements OnInit {
  accessCalenderPermission = Permission.CanAccessCalander;

  emails: any[] = [
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

  constructor(
    private layoutService: LayoutService
  ) { }
  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({});
  }
}
