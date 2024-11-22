import { Champion } from '@/types/gameplay/champion';
const randomIndicesInArray = (arraySize: number, count: number): number[] => {
  const numberSet = new Set<number>();
  while (numberSet.size < count) {
    const randomNum = Math.floor(Math.random() * arraySize);
    numberSet.add(randomNum);
  }

  return Array.from(numberSet);
};

export const randomChampions = (
  champions: Champion[],
  count: number
): Champion[] => {
  const randomIndices = randomIndicesInArray(champions.length, count);
  const randomTeam = randomIndices
    .map((index) => champions[index])
    .sort((a, b) => a.tier - b.tier);
  return randomTeam;
};
