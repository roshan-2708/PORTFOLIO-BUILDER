const User = require('../database/User');
const Otp = require('../database/Otp');
const AdditionalInfo = require('../database/AdditionalInfo');
const profileInfo = require('../database/PortfolioInfo');
const bcrypt = require('bcryptjs');
const jwtToken = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
require('dotenv').config();
const otpGenerator = require('otp-generator');


// send otp
exports.sendOtp = async (req, res) => {
    try {
        // get email
        const { email } = req.body;

        // check user email in db 
        const userExits = await User.findOne({
            email: email,
        });

        if (userExits) {
            return res.status(400).json({
                sucess: false,
                message: "User already found",
            });
        }

        // generate otp
        let otpCode = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // ensure otp is unique
        let exists = await Otp.findOne({
            otp: otpCode,
        });

        // if otp not exits continuosly generate otp until unique
        while (exists) {
            otpCode = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            exists = await Otp.findOne({ otp: otpCode });
        }

        // save otp in db
        await Otp.create({
            email: email,
            otp: otpCode,
            createdAt: Date.now(),
        });

        // send mail 
        await mailSender(
            email,
            "Your OTP Code",
            `<p>Your OTP code is : <b>${otpCode}</b></p>
   <p>Your otp is valid for 5 minutes</p>`
        );


        // return success response
        return res.status(200).json({
            success: true,
            message: "otp sent successfully",
        });

    } catch (error) {
        console.error("SEND OTP ERROR 👉", error);

        return res.status(500).json({
            success: false,
            message: "failed to send otp",
        });
    }
}

// verify otp
exports.verifyOtp = async (req, res) => {
    try {
        // fecth email and otp from request bodys
        const { email, otp } = req.body;

        // check otp in db
        const otpRecord = await Otp.findOne({
            email: email,
            otp: otp,
        });

        // check otp record
        if (!otpRecord) {
            return res.status(400).json({
                sucess: false,
                message: "Invalid otp",
            });
        }
        // verify
        otpRecord.isVerified = true;
        // save in db
        await otpRecord.save();

        return res.status(200).json({
            success: true,
            message: "Email verified is successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "otp verification failed",
        });
    }
}

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
        } = req.body;

        // validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
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
        const verifyEmail = await Otp.findOne({
            email,
            isVerified: true,
        });

        // verified or not
        if (!verifyEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is not verified",
            });
        }

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
        });

        // clean up otp 
        await Otp.deleteMany({ email });

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: newUser,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to signup"
        })
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
        const existuser = await User.findOne({ email }).populate("profile");

        // not found user
        if (!existuser) {
            return res.status(404).json({
                success: false,
                message: "user is not exist , Please sign up first",
            });
        }

        // compare password
        const isPasswordValid = await bcrypt.compare(password, existuser.password);

        // if not success
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password , try again",
            });
        }

        const payload = {
            id: existuser.id,
            email: existuser.email,
        };

        const token = jwtToken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "12h",
        });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
            sameSite: "None",       // REQUIRED for cross-domain
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        };

        existuser.password = undefined;

        return res
            .cookie("token", token, cookieOptions)
            .status(200)
            .json({
                success: true,
                message: "Login successful",
                token,
                existuser,
            });

    } catch (error) {
        console.error("login error", error);
        return res.status(500).json({
            success: false,
            message: "login failed",
        })
    }
}