const express = require('express');
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')


const JWT_SECRET_KEY = 'Krishisagoodb$oy'

//ROUTE 1:Creat a user and authenticate user using token  : POST "/api/auth/createuser, No login require " 
router.post('/createuser', [
    body('name', 'Name is too short ').isLength({ min: 3 }),
    body('email', 'Enter a valid Email ').isEmail(),
    body('password', 'Password is too short must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {

        const errors = validationResult(req);

        // if there are errors from validation,return bad request and array of errors which dosent match the validation
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        try {

            // check weather the user with the email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "sorry a user with this email already exists" })
            }

            // creating salt and hash of the password to store a secure password
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt);

            //creat a new user and save if there is no duplicate entry
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })

            //Alternative creating new user and save data:
            // const newUser=User({name: req.body.name, email: req.body.email, password: req.body.password,})   
            // newUser.save()  


            //creating a payload to sent as the response,in this example id of the user to verifywhich will be embedded in the token
            const data = {
                user: {
                    id: user.id
                }
            }
            // creat token to authenticate user 
            const authToken = jwt.sign(data, JWT_SECRET_KEY);

            res.json({ authToken })


        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error occured");

        }
    })



//ROUTE 2: Login a user and authenticate user using token: POST "/api/auth/login, No login require " 
router.post('/login', [
    body('email', 'Enter a valid Email ').isEmail(),
    body('password', 'Password is too short must be atleast 5 characters').isLength({ min: 5 }),
    body('password', 'Password cannot be blank ').exists(),], async (req, res) => {

        const errors = validationResult(req);

        // if there are errors from validation,return bad request and the array of errors which dosent match the validation
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        //using destructuring getting the values of email and password
        const { email, password } = req.body
        try {
            //finding the user with correct email and password 
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "please try to login with correct credentials" })
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "please try to login with correct credentials" })
            }
            //creating a payload to sent as the response,in this example id of the user to verifywhich will be embedded in the token
            const data = {
                user: {
                    id: user.id
                }
            }
            // creat token to authenticate user 
            const authToken = jwt.sign(data, JWT_SECRET_KEY);
            //sending the authentication token
            res.json({ authToken })

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error occured");
        }

    })

//ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser,login require " 

router.post('/getuser', fetchuser,async (req, res) => {

        try {
            //Get the user id from the middleware fethuser response
            let userId = req.user.id
            //fetch all the data of the user except the password of the user and send the user detail
            const user = await User.findById(userId).select("-password")
            res.send(user)



        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error occured");
        }

    })





module.exports = router

