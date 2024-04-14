import { QueryDocumentSnapshot, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { app, auth, db } from "./firebase";
import { getAuth, initializeAuth, onAuthStateChanged } from "firebase/auth";


export async function createIssue(title: string, description: string) {

    try{
        if(auth.currentUser){
            await setDoc(doc(db, "users", auth.currentUser.uid, "issues", "TE-1"), {
                title: title,
                description: description
            })
        }
        else{
            console.log("You aren't signed in.");
        }
    }
    catch (err){
        console.log(auth.currentUser?.uid + "; " + auth)

        console.log(err);
    }

}

export async function getAllIssues(){
    try {
        if(auth.currentUser) {
            const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "issues"))
            
            const issues: QueryDocumentSnapshot[] = [];

            querySnapshot.forEach((doc) => {
                console.log(doc.data().title)
                issues.push(doc);
            })

            return issues;
            
        }else{
            console.log("You aren't signed in.");
            return null;
        }

    }

    catch(err) {
        console.log(err)
        return null;
    }


}
