
const get = (options: { data: { [x: string]: any }; url: string; headers: HeadersInit | undefined }) => {
  let str = '',
    path = ''
  if (options.data) {
    for (let key in options.data) {
      str += `&${key}=${options.data[key]}`
    }
  }
  path = options.url + '?' + str.slice(1)
  console.log('******get*****',options.data,path);
  return fetch(path, {
    headers: {
      ...options.headers,
      'content-type': 'application-json'
    },
    credentials: 'include'
  }).then((res) => res.json())
}

const post = (options: { url: RequestInfo; headers: HeadersInit | undefined; data: any }) => {
  console.log('******post*****',options.data);
  return fetch(options.url, {
    method: 'post',
    mode:"cors",
    headers: {
      // 'Content-type': 'application/json;charset=utf-8',
      ...options.headers,
    },
    credentials: 'include',
    body: (options.headers as any)['Content-type'] =='application/json'?JSON.stringify(options.data):options.data
    // body:JSON.stringify(options.data)
  }).then((res) => res.json())
}

const DELETE = (options: { url: RequestInfo; headers: HeadersInit | undefined; data: any }) => {
  console.log('******DELETE*****',options.data);
  return fetch(options.url, {
    method: 'delete',
    mode:"cors",
    headers: {
      'Content-type': 'application/json;charset=utf-8',
      ...options.headers,
    },
    credentials: 'include',
    body: JSON.stringify(options.data)
  }).then((res) => res.json())
}

export  {
  get,
  post,
  DELETE
}