import mongoose, { Schema } from 'mongoose';
import slug from 'slug';


const ProfileSchema = new Schema(
  {
    education: [
      {
        school: {
          type: String,
          required:[true,'School is required']
        },
        degree: {
          type: String,
          required:[true,'Degree is required']
        },
        fieldOfStudy:{
          type:String,
          required:[true,'Field of study is required']
        },
        from : {
          type: Date,
          required:[true,'from is required']
        },
        to: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description:{
          type: String
        }
      }
      
      ],
    experience:{
      title:{
        type: String,
        required:[true,'title is required']
      },
      company:{
        type: String,
        required:[true,'Company is required']
      },
      location:{
        type: String,
        required:[true,'location is required']
      },
      from:{
        type: Date,
        required:[true,'from is required']
      },
      to:{
        type: Date
      },
      current:{
        type: Boolean,
        default: false
      },
      description:{
        type: String
      }
    },
    social:{
      twitter: String,
      youtube: String,
      instagram: String,
      github: String,
      linkedin: String
    },
    about:{
      type: String
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
