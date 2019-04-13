import firedb from "../../config/firebase";

export function saveTransaction(transaction = {}) {
  firedb
    .collection("transactions")
    .add(transaction)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

export function getData() {
  firedb
    .collection("transactions")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
}
