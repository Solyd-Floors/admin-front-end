import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';
import { API_ENDPOINT } from './configs';

window.__API_ENDPOINT__ = API_ENDPOINT

window.get_token = () => localStorage.getItem("solyd_floors:token")
window.objectToFormData = (obj, rootName, ignoreList) => {
  var formData = new FormData();

  function appendFormData(data, root) {
      if (!ignore(root)) {
          root = root || '';
          if (data instanceof File) {
              formData.append(root, data);
          } else if (Array.isArray(data)) {
              for (var i = 0; i < data.length; i++) {
                  appendFormData(data[i], root + '[' + i + ']');
              }
          } else if (typeof data === 'object' && data) {
              for (var key in data) {
                  if (data.hasOwnProperty(key)) {
                      if (root === '') {
                          appendFormData(data[key], key);
                      } else {
                          appendFormData(data[key], root + '.' + key);
                      }
                  }
              }
          } else {
              if (data !== null && typeof data !== 'undefined') {
                  formData.append(root, data);
              }
          }
      }
  }

  function ignore(root) {
      return Array.isArray(ignoreList)
          && ignoreList.some(function (x) { return x === root; });
  }

  appendFormData(obj, rootName);

  return formData;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//     <App />,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// reportWebVitals();
