import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
});

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this._id = this.username; // set _id to username before saving
  }
  next();
});

// Export the model, or use an existing one if it already exists (for hot reloading in development)
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
