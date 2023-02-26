export interface IUser extends Document {
  name: string;
  profilePic: string;
  devices: string[];
  isActive: boolean;
  isDeleted: boolean;
  cAt: number;
  uAt: number;
  uBy: IUser;
}
