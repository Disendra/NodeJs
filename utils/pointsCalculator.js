const POINTS_RULES = {
    batting: {
      run: 1,
      boundaryBonus: 1,
      sixBonus: 2,
      thirtyRunBonus: 4,
      halfCenturyBonus: 8,
      centuryBonus: 16,
      dismissalForDuck: -2,
    },
    bowling: {
      wicket: 25,
      bonus: 8,
      threeWicketBonus: 4,
      fourWicketBonus: 8,
      fiveWicketBonus: 16,
      maidenOver: 12,
    },
    fielding: {
      catch: 8,
      threeCatchBonus: 4,
      stumping: 12,
      runOut: 6,
    },
  };
  
  function calculateBattingPoints(stats) {
    let points = 0;
  
    points += stats.run * POINTS_RULES.batting.run;
    points += stats.boundaryBonus * POINTS_RULES.batting.boundaryBonus;
    points += stats.sixBonus * POINTS_RULES.batting.sixBonus;
    points += stats.thirtyRunBonus * POINTS_RULES.batting.thirtyRunBonus;
    points += stats.halfCenturyBonus * POINTS_RULES.batting.halfCenturyBonus;
    points += stats.centuryBonus * POINTS_RULES.batting.centuryBonus;
    points += stats.dismissalForDuck * POINTS_RULES.batting.dismissalForDuck;
  
    return points;
  }
  
  function calculateBowlingPoints(stats) {
    let points = 0;
  
    points += stats.wicket * POINTS_RULES.bowling.wicket;
    points += stats.bonus * POINTS_RULES.bowling.bonus;
    points += stats.threeWicketBonus * POINTS_RULES.bowling.threeWicketBonus;
    points += stats.fourWicketBonus * POINTS_RULES.bowling.fourWicketBonus;
    points += stats.fiveWicketBonus * POINTS_RULES.bowling.fiveWicketBonus;
    points += stats.maidenOver * POINTS_RULES.bowling.maidenOver;
  
    return points;
  }
  
  function calculateFieldingPoints(stats) {
    let points = 0;
  
    points += stats.catch * POINTS_RULES.fielding.catch;
    points += stats.threeCatchBonus * POINTS_RULES.fielding.threeCatchBonus;
    points += stats.stumping * POINTS_RULES.fielding.stumping;
    points += stats.runOut * POINTS_RULES.fielding.runOut;
  
    return points;
  }
  
  function calculatePoints(playerStats) {
    let totalPoints = 0;
  
    totalPoints += calculateBattingPoints(playerStats.batting);
    totalPoints += calculateBowlingPoints(playerStats.bowling);
    totalPoints += calculateFieldingPoints(playerStats.fielding);
  
    return totalPoints;
  }
  
  module.exports = {
    calculatePoints,
  };
  