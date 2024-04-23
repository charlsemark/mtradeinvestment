import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema(
  {
    walletName: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Wallet =
  mongoose.models['Wallet'] || mongoose.model('Wallet', WalletSchema);

export default Wallet;
