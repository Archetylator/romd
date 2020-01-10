import PouchDB from './database'
import { COUCHDB_URL } from '../constants'

let languageDB = new PouchDB('language')
let languageRemoteDB = new PouchDB(COUCHDB_URL + '/language')
languageDB.replicate.from(languageRemoteDB)

async function getLanguages() {
  let fetched = await languageDB.allDocs({
    include_docs: true
  })

  return fetched.rows
}

export { languageDB, getLanguages }