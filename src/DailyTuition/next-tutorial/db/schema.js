import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String
});

const UserModel = mongoose.model('Users') || mongoose.model('Users', UserSchema);

export default UserModel;