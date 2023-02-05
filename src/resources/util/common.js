export const filterToQuery = q => {
  if (q !== "") {
    return {
      "name@like": `%${q}%`,
    }
  } else {
    return {}
  }
}
