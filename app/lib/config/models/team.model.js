import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
    owner: {
			type: String,
			required: true
    },
		players: {
			type: [String],
			required: true
		}
});

const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);

export default Team;