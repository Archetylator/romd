import PouchDB from './database'
import { COUCHDB_URL } from '../constants'

const dictionaryDB = new PouchDB('dictionary')
const dictionaryRemoteDB = new PouchDB(COUCHDB_URL + '/dictionary')
// dictionary.replicate.from(dictionaryRemoteDB)

dictionaryRemoteDB.logIn('admin', 'password')
dictionaryDB.sync(dictionaryRemoteDB)

function loadOptionsForSearchSelect(filterText) {
  filterText = filterText ? filterText.replace(' ','_') : '';

  return new Promise((resolve, reject) => {
    return dictionaryDB.find({
      selector: {
        "$or": [
          { singular: { "$regex": `^${filterText}` } },
          { plural: { "$regex": `^${filterText}` } }
        ]
      },
      fields: ['_id', 'singular']
    }).then((foundWords) => {
      let words = []

      foundWords.docs.forEach((word) => {
        words.push({ value: word._id, label: word.singular })
      })

      resolve(words)
    }) 
  });
}

export { dictionaryDB, loadOptionsForSearchSelect }