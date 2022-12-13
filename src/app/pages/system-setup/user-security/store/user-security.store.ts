import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { RoleList } from '../models/role-list.model';

export interface UserSecurityModel {
    roleList: RoleList;
}

const store = createStore(
    {
        name: 'user-security-store',
    },
    withProps<UserSecurityModel>({
        roleList: null,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const roleList$ = store.pipe(select(({ roleList }) => roleList));

export type UserSecurityDocumentsStore = typeof store;
export const USER_SECURITY_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For User Security List Store', {
    providedIn: 'root',
    factory: (): UserSecurityDocumentsStore => store,
});
