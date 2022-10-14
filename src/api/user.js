import { base } from "./common";
import { countries } from "../reducers/common";

export const fetchUser = id => {
  return fetch(base + '/user/' + id).then(res => res.json())
}

export const createUser = body => {
  return fetch(base + '/user', {
    method: 'POST',
    body: JSON.stringify(body)
  }).then(res => res.json())
  .then(res => {
    const { predictions } = res;

    if (predictions === undefined || predictions.length === 0) {
      return {
        ...res,
        predictions: countries
      }
    } else {
      return res
    }
  })
}
