import { Schema } from 'mongoose';

export interface QuizResponse {
    _id: Schema.Types.ObjectId;
    name: string;
    status: boolean;
    noOfQuestion: number;
    noOfAttempts: number;
    isPublic: boolean;
    isPeriodRunning: boolean;
    publicAccessKey: string;
    startTime: Date;
    endTime: Date;
    createdBy: Schema.Types.ObjectId;
}