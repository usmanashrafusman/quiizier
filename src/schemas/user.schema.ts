import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: "users" })
export class UserModel extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true, index: "text" })
    email: string;

    @Prop({ required: true, default: false })
    status: boolean;

    @Prop({ required: true })
    verificationToken: string;

    @Prop({ required: true })
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(UserModel);
export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    status?: string;
}