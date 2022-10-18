import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { url } from "../App";

export const subtractRubies = createAsyncThunk(
  'rubies/update',
  async (state, thunkAPI) => {
    const {key, rubies, stake} = state;

    return fetch(`${url}/rubies/${key}`, {
      method: 'PUT',
      body: JSON.stringify({
        count: rubies - stake
      })
    }).then(res => res.json())
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    rubies: 0,
    userId: "",
    stake: 1,
  },
  reducers: {
    setRubies: (state, action) => {
      return {
        ...state,
        rubies: action.payload,
      }
    },
    setSession: (state, action) => {
      return {
        ...state,
        userId: action.payload.userId,
      }
    },
    setStake: (state, action) => {
      return {
        ...state,
        stake: action.payload,
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(subtractRubies.fulfilled, (state, action) => {
      return {...state, rubies: action.payload.count}
    });
  }
});

export const { setRubies, setSession, setStake } = userSlice.actions;
export default userSlice.reducer;
