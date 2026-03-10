const User = require('../database/User');
const AdditionalInfo = require('../database/AdditionalInfo');
const profileInfo = require('../database/PortfolioInfo');
const bcrypt = require('bcryptjs');
const jwtToken = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
require('dotenv').config();
const supabase = require('../config/supaBase');



// signup
exports.signUp = async (req, res) => {
    try {
        // fetch data from user
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            supabaseId,
        } = req.body;

        // validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !supabaseId) {
            return res.status(400).json({
                success: false,
                message: "All field are required",
            });
        }

        // check password
        if (password !== confirmPassword) {
            return res.status(404).json({
                success: false,
                message: "Password donot match",
            });
        }

        // check user is exit or not 
        const exitsUser = await User.findOne({
            email,
        });
        // if user not exist then create user
        if (exitsUser) {
            return res.status(400).json({
                success: false,
                message: "User already exits",
            });
        }

        // check email verificayion
        // const verifyEmail = await Otp.findOne({
        //     email,
        //     isVerified: true,
        // });


        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profile: null,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
            isVerified: true,
            supabaseId,
        });

        // clean up otp 
        // await Otp.deleteMany({ email });

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: newUser,
        });

    } catch (error) {
        console.error("Signup Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to signup",
        });
    }
}

// login
exports.login = async (req, res) => {
    try {
        // fetch data
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password requried",
            });
        }

        // find user exit or not
        const existUser = await User.findOne({ email }).populate("profile");

        // not found user
        if (!existUser) {
            return res.status(404).json({
                success: false,
                message: "user is not exist , Please sign up first",
            });
        }

        // compare password
        const isPasswordValid = await bcrypt.compare(password, existUser.password);

        // if not success
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password , try again",
            });
        }

        const payload = {
            id: existUser.id,
            email: existUser.email,
        };

        const token = jwtToken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        };

        existUser.password = undefined;

        return res
            .cookie("token", token, cookieOptions)
            .status(200)
            .json({
                success: true,
                message: "Login successful",
                token,
                existUser,
            });

    } catch (error) {
        console.error("login error", error);
        return res.status(500).json({
            success: false,
            message: "login failed",
        })
    }
}

// getUserWithProfile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('-password').populate('profile');


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully get data - ",
            user
        });


    } catch (error) {
        console.log("Get profile error", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile."
        })
    }
}

// logout
exports.logout = async () => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });

        return res.status(200).json({
            success: true,
            message: "logout successfully",
        });
    } catch (error) {
        console.log("Logout Error", error);
        return res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
}
// change password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Both old and new password required",
            });
        }

        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "old password incorrect",
            });
        }

        if (await bcrypt.compare(newPassword, user.password)) {
            return res.status(400).json({
                success: false,
                message: "new password can't be same with old password",
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        await mailSender(
            user.email,
            'password changed successfully',
            `<p>Your password has been update.</p>`
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        console.log("Change password error : ", error);
        return res.status(500).json({
            success: false,
            message: "Failed to changed password",
        });
    }
}

// send verification link
// exports.sendVerificationEmail = async (req, res) => {
//     try {
//         const { email } = req.body;

//         const { data, error } = await supabase.auth.signInWithOtp({
//             email,
//             options: {
//                 emailRedirectTo: "https://portfolio-builder-3h77.vercel.app/"
//             }
//         });

//         if (error) {
//             return res.status(400).json({
//                 success: false,
//                 message: error.message
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Verification link sent to email"
//         });

//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };

// verify token
// exports.verifySupabaseToken = async (req, res) => {
//     try {
//         const { token } = req.body;

//         const { data, error } = await supabase.auth.getUser(token);

//         if (error) {
//             return res.status(400).json({
//                 success: false,
//                 message: error.message,
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             supabaseId: data.user.id,
//             email: data.user.email,
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Verification failed",
//         });
//     }
// };


const registerUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // 1. Basic Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required." 
            });
        }

        // 2. Supabase Sign Up Call
        // Is call ke sath hi Supabase email verification bhej deta hai
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                // Verification ke baad user kahan land karega (Frontend URL)
                emailRedirectTo: 'https://portfolio-builder-3h77.vercel.app/auth/callback',
                // User ke extra attributes jo 'auth.users' metadata mein save honge
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    full_name: `${firstName} ${lastName}`
                }
            }
        });

        // 3. Check for Supabase Errors
        if (error) {
            return res.status(400).json({ 
                success: false, 
                message: error.message 
            });
        }

        // 4. Response handle karna
        // Agar user register ho gaya par email verify hona baaki hai
        if (data.user && data.session === null) {
            return res.status(201).json({
                success: true,
                message: "Registration successful! Please check your email to verify your account.",
                user: data.user
            });
        }

        // Agar email verification disabled hai (direct login)
        return res.status(200).json({
            success: true,
            message: "User registered and logged in successfully.",
            session: data.session
        });

    } catch (err) {
        console.error("SERVER ERROR:", err);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};

module.exports = { registerUser };