import { Schema, model, Document } from 'mongoose';
import { PlayerDocument } from './Player';
import { UserDocument } from './User';

interface TeamDocument extends Document {
  name: string;
  formation: string;
  overallRating: number;
  stats: {
    attack: number;
    defense: number;
    teamwork: number;
  };
  user: UserDocument['_id'];
  players: PlayerDocument['_id'][];
}

const TeamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  formation: { type: String, required: true },
  overallRating: { type: Number, required: true },
  stats: {
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    teamwork: { type: Number, required: true },
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }]
});

const Team = model<TeamDocument>('Team', TeamSchema);

export default Team;
export type { TeamDocument };