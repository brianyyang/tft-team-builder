import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
});

// Export the model, or use an existing one if it already exists (for hot reloading in development)
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
