import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

// import { applyMiddleware} from "redux"
// import { configureStore } from '@reduxjs/toolkit'
// import {composeWhitDevTools} from "redux-devtools-extension"
// import thunk from "redux-thunk"
// import rootReducer from "../reducer"

// const store = configureStore({
//     reducer:rootReducer,

//   })

// export default store

// import { configureStore } from '@reduxjs/toolkit'

// import exampleSliceReducer from './exampleSlice'

// const store = configureStore({
//   reducer: exampleSliceReducer,
//   // This replaces the original default middleware with the customized versions
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       immutableCheck: {
//         ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
//       },
//     }),
// })
