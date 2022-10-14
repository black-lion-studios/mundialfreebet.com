import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { base, countries } from "./common";

export const createGroup = createAsyncThunk(
  'groups/create',
  async (user_key, thunkAPI) => {
    return fetch(`${base}/group`, {
      method: 'POST',
      body: JSON.stringify({
        user_key
      })
    }).then(res => res.json())
  }
)

export const joinGroup = createAsyncThunk(
  'groups/join',
  async ({ user_key, group_key }, thunkAPI) => {
    return fetch(`${base}/group/${group_key}`, {
      method: 'POST',
      body: JSON.stringify({
        user_key
      })
    }).then(res => res.json())
  }
)

export const savePredictions = createAsyncThunk(
  'user/savePredictions',
  async ({ key, items }, thunkAPI) => {
    return fetch(`${base}/vote/${key}`, {
      method: 'POST',
      body: JSON.stringify({ items })
    }).then(res => res.json())
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: "",
    isAuthenticated: false,
    predictions: countries,
    country_codes: countries.map(d => d.country_code),
    groups: [],
    ready: false,
    results: [],
    users: [],
  },
  reducers: {
    setUser: (state, action) => {
      const { predictions } = action.payload;
      const { country_codes } = state;
      const ids = predictions.map(d => d.country_code);
      const missing = countries.filter(d => !ids.includes(d.country_code))

      return {
        ...state,
        ...action.payload,
        results: countries,
        predictions: [...predictions, ...missing].filter(d => country_codes.includes(d.country_code)),
        ready: true,
      }
    },
    updatePredictions: (state, action) => ({
      ...state,
      predictions: action.payload,
    }),
    newGroup: (state, action) => ({
      ...state,
      groups: [...state.groups, action.payload],
    }),
    setGroups: (state, action) => ({
      ...state,
      groups: action.payload,
    })
  },
  extraReducers: (builder) => {
    builder.addCase(savePredictions.fulfilled, (state, action) => {
      return {...state, predictions: action.payload.items }
    })

    builder.addCase(createGroup.fulfilled, (state, action) => {
      return {...state, groups: [...state.groups, action.payload]}
    })

    builder.addCase(joinGroup.fulfilled, (state, action) => {
      const { key } = action.payload;
      return {...state, groups: [...state.groups.filter(d => d.key !== key), action.payload]}
    })
  }
});

export const { setUser, updatePredictions, newGroup, setGroups } = userSlice.actions;
export default userSlice.reducer;
