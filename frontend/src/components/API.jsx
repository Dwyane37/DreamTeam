export const apiPost = async (path, content) => {
  // return new Promise((resolve, reject) => {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(content),
  };
  const res = await fetch(`http://127.0.0.1:5500/${path}`, init);
  await console.log(res);
  const body = await res.json();
  if (body.errortype == 200) {
    return (body)
  } else {
    throw new Error(body.errormessage)
  }
};

function objToQueryString (obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

export const apiGet = async (path, paramDic) => {
  // return new Promise((resolve, reject) => {
  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const params = objToQueryString(paramDic);
  const res = await fetch(`http://127.0.0.1:5500/${path}?${params}`, init);
  // await console.log(res);
  const body = await res.json();
  await console.log(body);
  if (body.errortype == 200) {
    return (body)
  } else {
    throw new Error(body.errormessage)
  }
};

export const apiCall = async (path, paramDic) => {
  const params = objToQueryString(paramDic);
  const res = await fetch(`http://127.0.0.1:5500/${path}?${params}`);
  // await console.log(res);
  const body = await res.json();
  await console.log(body);
  if (body.errortype == 200) {
    return (body)
  } else {
    throw new Error(body.errormessage)
  }
};
