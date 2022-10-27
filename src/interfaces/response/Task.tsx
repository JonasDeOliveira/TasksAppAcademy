export interface TaskRequest {
    desc: string;
    estimateAt: Date;
}

export interface TaskResponse {
    id: number;
    desc: string;
    estimateAt: string;
    doneAt: string;
    userId: number;
}