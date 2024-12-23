import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Async thunks
export const forgetPassword = createAsyncThunk("forgetPassword", async (email) => {
  console.log("email resu", email)
  const data = {
    email: email
  }
    // if (!email) {
    //     return;
    // }
    try {
       
        const response = await axios.post("https://shazam-backend.onrender.com/api/user/forgetpassword",  data);
        console.log(response.data, " reducer forgetpassword");
        return response.data; // Return the response data
    } catch (error) {
        console.error(error); // Log any errors
        throw error; // Rethrow the error to handle it in extraReducers
    }
});

export const verfiyOtp = createAsyncThunk("verifyOtp", async ( otp, password) => {
  const data = {
    password: password
  }
    if (!otp || !password) {
        return;
    }
    try {
        sessionStorage.setItem("otp", otp)
        const response = await axios.post(`https://shazam-backend.onrender.com/api/user/reset-password/${otp}`, data );
        console.log(response.data, " reducer");
        return response.data; // Return the response data
    } catch (error) {
        console.error(error); // Log any errors
        throw error; // Rethrow the error to handle it in extraReducers
    }
});

export const registerUser = createAsyncThunk("registerUser", async (data) => {
    if (!data) {
        return;
    }
    try {
        const response = await axios.post('https://shazam-backend.onrender.com/api/user/signup', data);
        console.log(response.data, " reducer");
        return response.data; // Return the response data
    } catch (error) {
        console.error(error); // Log any errors
        throw error; // Rethrow the error to handle it in extraReducers
    }
});

export const loginUserDatabase = createAsyncThunk("loginUserDatabase", async (data) => {
    if (!data) {
        return;
    }
    try {
        const response = await axios.post('https://shazam-backend.onrender.com/api/user/login', data);
        console.log(response.data, " reducer");
        return response.data; // Return the response data
    } catch (error) {
        console.error(error); // Log any errors
        throw error; // Rethrow the error to handle it in extraReducers
    }
});

// Initial state
const initialState = {
    loggedUserDetails: {},
    newUserData: null,
    isLoading: false,
    forgetStatus: 0,
};

// Slice
const loginSlice = createSlice({
    name: "loginSlice",
    initialState,
    extraReducers: (builder) => {
        // Forget Password
        builder
            .addCase(forgetPassword.pending, (state) => {
                state.isLoading = true;
                state.forgetStatus = 0;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.forgetStatus = action.payload.status;
                
            })
            .addCase(forgetPassword.rejected, (state) => {
                state.isLoading = false;
                state.forgetStatus = -1; // Or any other error status
            });

        // Verify OTP
        builder
            .addCase(verfiyOtp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verfiyOtp.fulfilled, (state, action) => {
                state.isLoading = false;
              // Handle successful OTP verification
                console.log('OTP verification successful:', action.payload.status);
            })
            .addCase(verfiyOtp.rejected, (state) => {
                state.isLoading = false;
                // Handle OTP verification error
                console.error('OTP verification failed');
            });

        // Register User
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newUserData = action.payload;
                // Additional actions on successful registration if needed
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                // Handle registration error
                console.error('Registration failed');
            });

        // Login User
        builder
            .addCase(loginUserDatabase.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUserDatabase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loggedUserDetails = action.payload;
                localStorage.setItem("name", action.payload.name);
            Cookies.set("token", action.payload.token, { expires: 30 });
                // Additional actions on successful login if needed
            })
            .addCase(loginUserDatabase.rejected, (state) => {
                state.isLoading = false;
                // Handle login error
                console.error('Login failed');
            });
    },
});

// Export actions and reducer
export const { signupUser, loginUser } = loginSlice.actions;
export default loginSlice.reducer;
