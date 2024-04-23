import mongoose from "mongoose";

// const configOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,

// }

// const connectToDB = async() => {
//     const dbURI = 'mongodb+srv://egookiemute:edupad@cluster0.jwnv0nw.mongodb.net/';

//     mongoose
//        .connect(dbURI)
//        .then(() => console.log("Edupad database connected successfully"))
//        .catch((err) => 
//            console.log(`Getting an error connecting ${err.message}`)
//         );

// };

// export default connectToDB;

export function connectToDB() {
    if(mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise()
    } else {
        const uri = 'mongodb+srv://charlsemark100:mX3Lcg9ddgtsOomZ@cluster0.6yah4ot.mongodb.net/'
        return mongoose.connect(uri);
    }
}