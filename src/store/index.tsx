import { makeAutoObservable } from "mobx";
import React from "react";
import { observer } from "mobx-react-lite";

interface IBook {
  id: number;
  title: string;
  description: string;
}

class RootStore {
  todoList: IBook[];
  counter: number;

  constructor() {
    makeAutoObservable(this);

    this.todoList = [];
    this.counter = 0;
  }

  todoRecord(newTodo: IBook) {
    newTodo.id = this.counter;
    this.todoList.push(newTodo);
    this.counter++;
  }
}

const Store = new RootStore();
export const StoreContext = React.createContext<RootStore>({} as RootStore);

export const StoreProvider: React.FC<React.PropsWithChildren<unknown>> =
  observer(({ children }) => {
    const store = Store;

    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
  });
export function useStore() {
  return React.useContext(StoreContext);
}
export default RootStore;
