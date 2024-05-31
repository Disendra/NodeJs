const MatchResult = require('../models/MatchResult');
const Team = require('../models/Team');
const pointsCalculator = require('../utils/pointsCalculator');

exports.processResult = async (req, res) => {
  try {
    const matchResultData = require('../data/match.json');
    
    matchResultData.forEach(async (result) => {
      const { player, points } = result;
      const team = await Team.findOne({ players: { $in: [player] } });
      if (team) {
        const calculatedPoints = pointsCalculator.calculatePoints(points);
        team.totalPoints += calculatedPoints;
        await team.save();
      }
    });

    res.status(200).json({ message: 'Match result processed successfully' });
  } catch (error) {
    console.error('Error processing match result:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
