db.collection("ShowDataCollection").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        if (comparisonFilmObject.imdb === doc.data().imdb) {
            dupInDatabase = true;
        }
    })
})
