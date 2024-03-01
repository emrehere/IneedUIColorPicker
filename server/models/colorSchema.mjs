import mongoose from 'mongoose';

const myColorsSchema = new mongoose.Schema({
    colors: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});



const MyColorsInfo = mongoose.model('MyColorsInfo', myColorsSchema);

export default MyColorsInfo;