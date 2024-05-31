const Team = require('../models/Team');
const Player = require('../models/Player');

exports.addTeam = async (req, res) => {
  try {
    const { teamName, players, captain, viceCaptain } = req.body;

    if (!teamName || !players || !captain || !viceCaptain) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const playersExist = await Player.find({ name: { $in: players } });
    if (playersExist.length !== players.length) {
      return res.status(400).json({ message: 'Invalid player(s) selected' });
    }
    const captainExist = playersExist.find(player => player.name === captain);
    const viceCaptainExist = playersExist.find(player => player.name === viceCaptain);
    if (!captainExist || !viceCaptainExist) {
      return res.status(400).json({ message: 'Invalid captain or vice-captain selected' });
    }

    if (!players.includes(captain) || !players.includes(viceCaptain)) {
      return res.status(400).json({ message: 'Captain and vice-captain must be from selected players' });
    }
    if (players.length !== 11) {
      return res.status(400).json({ message: 'Team must have 11 players' });
    }
    const playersByTeam = playersExist.reduce((acc, player) => {
      acc[player.team] = (acc[player.team] || 0) + 1;
      return acc;
    }, {});
    const teamCounts = Object.values(playersByTeam);
    const maxCount = Math.max(...teamCounts);
    if (maxCount > 10) {
      return res.status(400).json({ message: 'Maximum 10 players can be selected from the same team' });
    }

    const team = new Team({
      teamName,
      players: playersExist.map(player => player._id),
      captain: captainExist._id,
      viceCaptain: viceCaptainExist._id,
    });
    await team.save();

    res.status(201).json({ message: 'Team entry added successfully' });
  } catch (error) {
    console.error('Error adding team entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
