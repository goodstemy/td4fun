export const randomBetween = (a, b) => Math.floor(Math.random() * b) + a;

export const lenOfVec = (targetX, unitX, targetY, unitY) => {
  return Math.sqrt(Math.pow(targetX - unitX, 2) + Math.pow(targetY - unitY, 2));
};