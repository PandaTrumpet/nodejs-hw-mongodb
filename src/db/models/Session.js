import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);
// моя версия

// const sessionSchema = new Schema(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       ref: 'user',
//     },
//     accessToken: {
//       type: String,
//       required: true,
//     },
//     refreshToken: { type: String, required: true },
//     accessTokenValidUntil: {
//       type: Date,
//       required: true,
//     },
//     refreshTokenValidUntil: {
//       type: Date,
//       required: true,
//     },
//   },
//   { versionKey: false, timestamps: true },
// );

export const SessionCollection = model('session', sessionSchema);

// схема для session
