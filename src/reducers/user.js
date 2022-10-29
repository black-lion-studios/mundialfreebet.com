import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const url = 'https://5leb08.deta.dev';

export const subtractRubies = createAsyncThunk(
  'rubies/update',
  async (state, thunkAPI) => {
    const {email, rubies, stake} = state;

    console.log(state);

    return fetch(`${url}/rubies/${email}`, {
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
    access_token: "",
    email: "",
    rubies: 0,
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
        access_token: action.payload.access_token,
        ...action.payload.user,
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
