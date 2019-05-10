import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
// Reducers
import settingsReducer from './reducers/settingsReducer'

const firebaseConfig = {
  apiKey: 'AIzaSyAcrp9PHFvjVQ6XtCP75v4zQ_PpE7qnX0k',
  authDomain: 'reactclientpanel-fef3c.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-fef3c.firebaseio.com',
  projectId: 'reactclientpanel-fef3c',
  storageBucket: 'reactclientpanel-fef3c.appspot.com',
  messagingSenderId: '529410638642'
}
// init firebase instance
firebase.initializeApp(firebaseConfig)

// init firestore
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase), // <- needed if using firestore
  reactReduxFirebase(firebase, rrfConfig) // firebase instance as first argument
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  settings: settingsReducer
})

if (localStorage.getItem('settings') === null) {
  const defaultsettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }
  localStorage.setItem('settings', JSON.stringify(defaultsettings))
}

// create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) }

// create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : x => x
)

export default store
