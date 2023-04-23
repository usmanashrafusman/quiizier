import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: "quizzes" })
export class QuizModel extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, default: false })
    status: boolean;

    @Prop({ required: true, type: Number, default: 0 })
    noOfQuestion: Number;

    @Prop({ required: true, type: Number, default: 0 })
    noOfAttempts: Number;

    @Prop({ required: true, default: true })
    isPublic: boolean;

    @Prop({ required: true, default: false })
    runningPeriod: boolean;

    @Prop({ required: true })
    publicAccessKey: string;

    @Prop({ required: true, type: Date, default: Date.now })
    startTime: Date;

    @Prop({ type: Date })
    endTime: Date;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: "users" })
    createdBy: MongooseSchema.Types.ObjectId;
}

export const QuizSchema = SchemaFactory.createForClass(QuizModel);