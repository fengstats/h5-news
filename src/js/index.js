import './imports';

// console.log("index");

import API from '../api';

async function getNewsList() {
  const data = await API.getNewsList('top', 10);
  console.log(data);
}

getNewsList();