import { Schema, model, Document } from 'mongoose';
import { TeamDocument } from './Teams';

interface PlayerDocument extends Document {
  name: string;
  position: string;
  number: number;
  stats: {
    speed: number;
    power: number;
    technique: number;
  };
  team: TeamDocument['_id'];
}

const PlayerSchema = new Schema<PlayerDocument>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  number: { type: Number, required: true },
  stats: {
    speed: { type: Number, required: true },
    power: { type: Number, required: true },
    technique: { type: Number, required: true },
  },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true }
});

const Player = model<PlayerDocument>('Player', PlayerSchema);

export default Player;
export type { PlayerDocument };