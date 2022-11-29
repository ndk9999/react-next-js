export function attemptsNumber(result) {
    return result.filter(r => r !== undefined).length;
}

export function earnedPointsNumber(answers, userAnswers, pointRate) {
    return userAnswers
        .map((ua, i) => answers[i] === ua)
        .filter(val => val)
        .map(val => pointRate)
        .reduce((prev, curr) => prev + curr, 0);
}

export function getFinalResult(totalPoints, earnedPoints) {
    return (totalPoints * 0.5) < earnedPoints;
}