import axios from 'axios';
import React from 'react'

const Instance = axios.create({
  withCredentials: true,   // ✅ REQUIRED for cookies
});

const apiconector = (method, url, bodyData, headers, params) => {
  return Instance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
    });
}

export default apiconector
