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

export const StudyShiftSortBy = {
    SHIFT_CODE: 'shiftCode',
    SHIFT_NAME: 'shiftName',
    TIME_RANGE: 'timeRange'
} as const;

export type StudyShiftSortBy = (typeof StudyShiftSortBy)[keyof typeof StudyShiftSortBy];