import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  profilePic: string;

  @Prop({ select: false })
  passwordResetToken: string;

  @Prop({ default: Date.now(), select: false })
  passwordResetTokenGeneratedAt: number;

  @Prop({ select: false })
  devices: string[];

  @Prop({ default: true, select: false })
  isActive: boolean;

  @Prop({ default: false, select: false })
  isDeleted: boolean;

  @Prop({ default: false, select: false })
  isAdmin: boolean;

  @Prop({ default: Date.now(), select: false })
  cAt: number;

  @Prop({ default: Date.now(), select: false })
  uAt: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', select: false })
  uBy: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret, options) {
    return {
      _id: ret._id,
      email: ret.email,
      name: ret.name,
    };
  },
});
