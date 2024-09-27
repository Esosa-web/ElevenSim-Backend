import mongoose, { Schema, Document } from 'mongoose';

interface IMatch extends Document {
  date: Date;
  teams: {
    team: mongoose.Types.ObjectId;
    score: number;
  }[];
  players: mongoose.Types.ObjectId[];
  result: {
    winner: mongoose.Types.ObjectId;
    loser: mongoose.Types.ObjectId;
  };
}

const MatchSchema: Schema = new Schema({
  date: { type: Date, required: true },
  teams: [{
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    score: { type: Number, required: true }
  }],
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  result: {
    winner: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    loser: { type: Schema.Types.ObjectId, ref: 'Team', required: true }
  }
});

export default mongoose.model<IMatch>('Match', MatchSchema);