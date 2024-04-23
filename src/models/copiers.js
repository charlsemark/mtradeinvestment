import mongoose from 'mongoose';

const CopierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    bonus: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
},
    { timestamps: true }

)

const Copier = mongoose.models['Copier'] || mongoose.model('Copier', CopierSchema);

export default Copier;