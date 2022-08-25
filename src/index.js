import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClientProvider, QueryClient, QueryCache } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './index.css'
// import reportWebVitals from './reportWebVitals'

const client = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.log(`Something went wrong: ${error.message}`),
  }),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
