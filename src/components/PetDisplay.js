import { FlatList } from "react-native"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { FIREBASE_DB } from "../../firebaseConfig"
import { getAuth } from "firebase/auth"
import { useEffect, useMemo, useState } from "react"
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import PETS from "../../petsData"
import PetDisplayMain from "./PetDisplayMain"

export default function PetDisplay({petsOwned, selectPet}) {
	

 return (
    <FlatList showsVerticalScrollIndicator={false} numColumns={3}
				data={petsOwned} renderItem={({item}) => <PetDisplayMain pet={item} selectPet={selectPet} />} keyExtractor={() => uuidv4()}/>
  )
}


