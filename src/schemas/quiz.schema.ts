import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: "quizzes" })
export class QuizModel extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, default: false })
    status: boolean;

    @Prop({ required: true, default: 0 })
    noOfQuestion: number;

    @Prop({ required: true, default: 0 })
    noOfAttempts: number;

    @Prop({ required: true, default: true })
    isPublic: boolean;

    @Prop({ required: true, default: false })
    isPeriodRunning: boolean;

    @Prop({ required: true, default: "" })
    publicAccessKey: string;

    @Prop({ required: true, type: Date, default: Date.now })
    startTime: Date;

    @Prop({ type: Date })
    endTime: Date;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: "users" })
    createdBy: MongooseSchema.Types.ObjectId;
}

export const QuizSchema = SchemaFactory.createForClass(QuizModel);

export interface IQuiz {
    name: string;
    isPublic?: boolean;
    isPeriodRunning?: boolean;
    publicAccessKey?: string;
    startTime?: Date;
    endTime?: Date;
    createdBy: string;
} 