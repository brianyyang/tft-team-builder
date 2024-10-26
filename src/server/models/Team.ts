import mongoose, { Schema, Document, Types, Model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  championIds: string[];
  user: Types.ObjectId;
}

const TeamSchema = new Schema({
  name: { type: String, required: true },
  championIds: [{ type: String, required: true }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// compound index on 'name' and 'user' to enforce unique team names for each user
TeamSchema.index({ name: 1, user: 1 }, { unique: true });

// export the Team model
const Team: Model<ITeam> =
  mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);

export default Team;
