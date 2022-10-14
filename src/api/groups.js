import { base } from "./common";

export const fetchGroup = id => {
  return fetch(`${base}/group/${id}`).then(res => res.json())
}

export const fetchGroupsForUser = key => {
  return fetch(`${base}/group/user/${key}`).then(res => res.json())
}

export const createGroup = user_key => {
  return fetch(`${base}/group`, {
    method: 'POST',
    body: JSON.stringify({
      user_key
    })
  }).then(res => res.json())
}
