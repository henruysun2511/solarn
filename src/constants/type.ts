export enum GenderType {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNKNOWN = 'UNKNOWN'
};


export enum StatusType {
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    PENDING = 'PENDING'
}

export enum ResourceType {
    DOCUMENT = 'DOCUMENT',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO'
}

export enum RoleType {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT'
}

export enum CourseLevel {
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2'
}

export enum EnrollmentStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    DROPPED = 'DROPPED',
    DEFERRED = 'DEFERRED',
}

export enum ClassSessionStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    ENDED = 'ENDED',
}

export enum AttendanceStatus {
    PRESENT = 'PRESENT',
    ABSENT = 'ABSENT',
    LATE = 'LATE',
}

export enum InvoiceStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    CANCELLED = 'CANCELLED',
}

export enum RequestType {
    SCHEDULE_CHANGE = 'SCHEDULE_CHANGE',
    SALARY_COMPLAINT = 'SALARY_COMPLAINT',
    LEAVE_REQUEST = 'LEAVE_REQUEST',
    TRANSFER_REQUEST = 'TRANSFER_REQUEST',
}

export enum RequestStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED',
    RESOLVED = 'RESOLVED',
}

export enum LeaveStatus {
    ACTIVE = 'ACTIVE',
    ON_HOLD = 'ON_HOLD',
    EXPIRED = 'EXPIRED',
    RESUMED = 'RESUMED',
}

