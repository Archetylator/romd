import PouchDB from './database'
import { COUCHDB_URL } from '../constants'
import { getCookie } from '../utils/cookies'
const dictionaryDB = new PouchDB('dictionary')
const dictionaryRemoteDB = new PouchDB(COUCHDB_URL + '/dictionary')

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
      resolve(foundWords.docs)
    }) 
  });
}

async function logIn(username, password) {
  return await dictionaryRemoteDB.logIn(username, password)
};

async function logOut() {
  return await dictionaryRemoteDB.logOut()
}

async function getWord(id) {
  return await dictionaryDB.get(id)
}

export { dictionaryDB, loadOptionsForSearchSelect, getWord, logIn, logOut }