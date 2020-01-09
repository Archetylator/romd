import PouchDB from 'pouchdb'

import PouchAuth from 'pouchdb-authentication'
import PouchFind from 'pouchdb-find'

PouchDB.plugin(PouchAuth)
PouchDB.plugin(PouchFind)

export default PouchDB 