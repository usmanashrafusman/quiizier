import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: "sessions" })
export class SessionsModel extends Document {
    @Prop({ required: true })
    token: string;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: "users" })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true, default: true })
    status: boolean;
}

export const SessionsSchema = SchemaFactory.createForClass(SessionsModel);