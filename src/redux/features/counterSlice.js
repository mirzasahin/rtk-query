import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const fetchPokemonByName = createAsyncThunk(
  "pokemon/fetchByName",
  async (name, { rejectWithValue }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPokemonByName.pending, (state, action) => {
      state.statusByName[action.meta.arg] = "pending";
    });
    builder.addCase(fetchPokemonByName.fulfilled, (state, action) => {
      console.log(state, action);
    });
    builder.addCase(fetchPokemonByName.rejected, (state, action) => {
      console.log(state, action);
    });
  },
});

export const { decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
