import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState,
  sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface ChatModel {
  data: any[];
}

const store = createStore(
  {
    name: 'chat-store',
  },
  withProps<ChatModel>({
    data: null,
  })
);

persistState(store, {
  storage: sessionStorageStrategy,
});

export const data$ = store.pipe(select(({ data }) => data));

export type ChatStore = typeof store;
export const CHAT_STORE = new InjectionToken<ReturnType<typeof createStore>>(
  'Injection Token For Chat Store',
  {
    providedIn: 'root',
    factory: (): ChatStore => store,
  }
);
