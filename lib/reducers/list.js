import holidaysV1 from './holidaysV1';

export default function(yearA, yearB) {
  // Use V1 as default, any upgrades/ changes for V2 MUST be done here
  return holidaysV1(yearA, yearB);
}
