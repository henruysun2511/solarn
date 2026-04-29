export enum SortOrder {
    DESC = 'desc',
    ASC = 'asc'
}

export const BranchSortBy = {
    BRANCH_CODE: 'branchCode',
    BRANCH_NAME: 'branchName',
    CREATED_AT: 'createdAt'
} as const;

export type BranchSortBy = (typeof BranchSortBy)[keyof typeof BranchSortBy];