import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Exclude } from 'class-transformer';

/**
 * ! TODO: Add Google Sign in Token
 */
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  profilePic: string;

  @Prop()
  @Exclude()
  passwordResetToken: string;

  @Prop({ default: Date.now() })
  @Exclude()
  passwordResetTokenGeneratedAt: number;

  @Prop()
  @Exclude()
  devices: string[];

  @Prop({ default: true })
  @Exclude()
  isActive: boolean;

  @Prop({ default: false })
  @Exclude()
  isDeleted: boolean;

  @Prop({ default: false })
  @Exclude()
  isAdmin: boolean;

  @Prop({ default: Date.now() })
  @Exclude()
  cAt: number;

  @Prop({ default: Date.now() })
  @Exclude()
  uAt: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Exclude()
  uBy: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
