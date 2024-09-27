import { Schema, model, Document } from 'mongoose';
import { TeamDocument } from './Teams';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  teams: TeamDocument[];
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
});

const User = model<UserDocument>('User', UserSchema);

export default User;
export type { UserDocument };