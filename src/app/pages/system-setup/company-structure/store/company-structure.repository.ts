import { Injectable, Inject } from "@angular/core";
import { TreeNode } from "primeng/api";
import { CompanyStructureStore, COMPANY_STRUCTURE_STORE } from "./company-structure.store";

@Injectable({
    providedIn: 'root',
})
export class CompanyStructureRepository {
    constructor(
        @Inject(COMPANY_STRUCTURE_STORE) private companyStructureStore: CompanyStructureStore,
    ) { }

    updateTreeNode(treeNode: TreeNode[]): void {
        this.companyStructureStore.update((state) => ({
            ...state,
            treeNode: treeNode
        }));
    }
}