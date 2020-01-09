import PouchDB from './database'
import { COUCHDB_URL } from '../constants'

let languageDB = new PouchDB('language')
let languageRemoteDB = new PouchDB(COUCHDB_URL + '/language')
languageDB.replicate.from(languageRemoteDB)

// export async function getLanguages() {
//   let languages = []
  
//   let fetched = await languageDB.allDocs({
//     include_docs: true
//   })

//   fetched.rows.forEach((lang) => {
//     languages[lang.doc._id] = lang.doc.name
//   })

//   return languages
// }

export { languageDB }