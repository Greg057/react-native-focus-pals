import PETS from "./petsData";

const PETS_RARITY = {}

Object.keys(PETS).forEach(petName => {
  const rarity = PETS[petName].rarity;
  if (!PETS_RARITY[rarity]) {
    PETS_RARITY[rarity] = [];
  }

  PETS_RARITY[rarity].push(petName);
})

export default PETS_RARITY