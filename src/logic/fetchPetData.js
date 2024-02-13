import PETS from "../constants/petsData"

export default function fetchPetData(pets) {
  let dataToReturn = []
  Object.keys(pets).map(pet => {
    const data = {
      name: pet,
      rarity: PETS[pet].rarity,
      xp: pets[pet].xp,
      level: pets[pet].level,
      stars: pets[pet].stars,
      petImage: PETS[pet].image,
      frameImage: PETS[pet].frame
    }
    dataToReturn.push(data)
  })
  return dataToReturn
}