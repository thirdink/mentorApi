import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

const ProfileSchema = new Schema(
  {
    school: {
      type: String,
      trim: false,
      required: [true, 'School is required'],
      minLength: [3, 'School needs to be longer'],
      unique: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

ProfileSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      school: this.school,
      user: this.user,
    };
  },
};

ProfileSchema.statics = {
  createProfile(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
  list({ skip = 0, limit = 5 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user');
  },
};

export default mongoose.model('Profile', ProfileSchema);
