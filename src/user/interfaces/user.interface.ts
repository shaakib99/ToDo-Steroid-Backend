export interface IUser extends Document {
  readonly name: string;
  readonly password: string;
  readonly email: string;
  readonly profilePic: string;
  readonly devices: string[];
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly cAt: number;
  readonly uAt: number;
  readonly uBy: IUser;
}
