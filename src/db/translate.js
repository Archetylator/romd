import PouchDB from './database'
import { COUCHDB_URL } from '../constants'

let translateDB = new PouchDB('translate')
let translateRemoteDB = new PouchDB(COUCHDB_URL + '/translate')
translateDB.sync(translateRemoteDB)

export { translateDB }