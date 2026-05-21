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

export const ScheduleTemplateSortBy = {
    TEMPLATE_NAME: 'templateName',
    SHIFT_CODE: 'shiftCode',
} as const;

export type ScheduleTemplateSortBy = (typeof ScheduleTemplateSortBy)[keyof typeof ScheduleTemplateSortBy];

export const RoomSortBy = {
    ROOM_CODE: 'roomCode',
    CAPACITY: 'capacity'
} as const;

export type RoomSortBy = (typeof RoomSortBy)[keyof typeof RoomSortBy];

export const AccountSortBy = {
    USERNAME: 'username',
    CREATED_AT: 'createdAt',
    STATUS: 'status'
} as const;

export type AccountSortBy = (typeof AccountSortBy)[keyof typeof AccountSortBy];

export const CourseSortBy = {
    COURSE_NAME: 'courseName',
    TUITION_FEE: 'tuitionFee',
    LEVEL: 'level',
} as const;

export type CourseSortBy = (typeof CourseSortBy)[keyof typeof CourseSortBy];

export const ClassSortBy = {
    CLASS_ID: 'classId',
    START_DATE: 'startDate'
} as const;

export type ClassSortBy = (typeof ClassSortBy)[keyof typeof ClassSortBy];

export const ScheduleSessionSortBy = {
    STUDY_DATE: 'studyDate',
    STATUS: 'status'
} as const;

export type ScheduleSessionSortBy = (typeof ScheduleSessionSortBy)[keyof typeof ScheduleSessionSortBy];

export const StudentSortBy = {
    NAME: 'name',
} as const;

export type StudentSortBy = (typeof StudentSortBy)[keyof typeof StudentSortBy];

export const RequestClassSortBy = {
    CREATED_AT: 'createdAt',
    STATUS: 'status'
} as const;

export type RequestClassSortBy = (typeof RequestClassSortBy)[keyof typeof RequestClassSortBy];

export const FeedbackClassSortBy = {
    CREATED_AT: 'createdAt'
} as const;

export type FeedbackSortBy = (typeof FeedbackClassSortBy)[keyof typeof FeedbackClassSortBy];
