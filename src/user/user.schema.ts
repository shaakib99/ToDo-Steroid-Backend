import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

/**
 * ! TODO: Add Google Sign in Token
 */
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  profilePic: string;

  @Prop()
  passwordResetToken: string;

  @Prop({ default: Date.now() })
  passwordResetTokenGeneratedAt: number;

  @Prop()
  devices: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: Date.now() })
  cAt: number;

  @Prop({ default: Date.now() })
  uAt: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  uBy: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
