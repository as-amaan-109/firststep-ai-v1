import { setDoc,doc,Timestamp } from "firebase/firestore"
import { db } from "../config"

export const createUser = async({uid,user})=>{
    await setDoc(doc(db,`users/${uid}`),{
       user:{ ...user},
        createdAt:Timestamp.now(),
    },{
        merge:true
    })
}