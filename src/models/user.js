import mongoose from 'mongoose';

// const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    accountUpgrade: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
    bonus: {
      type: Number,
      default: 0,
    },
    profit: {
      type: Number,
      default: 0,
    },
    profilePicture: String,
    wallet: {
      bitcoin: String,
      ethereum: String,
      usdt: String,
      litecoin: String,
    },
    transactions: [
      {
        amount: Number,
        receipt: String,
        walletName: String,
        walletAddress: String,
        transactionType: String,
        note: String,
        created: Date,
        status: {
          isPending: {
            type: Boolean,
            default: true,
          },
          isApproved: {
            type: Boolean,
            default: false,
          },
          isRejected: {
            type: Boolean,
            default: false,
          },
        },
      },
    ],
    plans: [
      {
        amount: Number,
        planId: {
          type: mongoose.Schema.Types.ObjectId,
          // ref: 'Plan',
        },
        returnInvestment: Number,
        elapseTime: Date,
        status: {
          isActive: {
            type: Boolean,
            default: true,
          },
          isCompleted: {
            type: Boolean,
            default: false,
          },
        },
      },
    ],
    role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'admin',
    },
  },
  { timestamps: true }
);

// userSchema.methods.remove = async function () {
//   return this.remove();
// };

const User = mongoose.models['User'] || mongoose.model('User', UserSchema);

export default User;
