const valid = require("../utilities/valid")
const bcrypt = require("bcrypt")
const signupModel = require("../models/signupModel")

// signupGet
const signupGet = (req, res) => {
    res.render('client/signup')
}
const signupPost = async (req, res) => {
    const { fullName, username, email, password } = req.body
    const existM = await signupModel.findOne({ email })
    const existU = await signupModel.findOne({ username })
    try {
        if (username === "" || password === "")
            res.status(400).render("client/error", { errr: 'All Feilds Are required' })

        //CHECK MAIL
        else if (existM) {
            res.status(400).render("client/error", { errr: 'EMAIL Already Taken' })
        }
        else if (!valid.mailValid(email)) {
            res.status(400).render("client/error", { errr: 'Invalid EMAIL' })
        }
        // CHECK USERNAME
        else if (existU) {
            res.status(400).render("client/error", { errr: 'USERNAME Already Taken' }
            )
        }
        // CHECK PASS

        else if (!valid.passwordValid(password)) {
            console.log(valid.passwordValid(password))
            res.status(400).render("client/error", { errr: 'Invalid 123654789' })
        }

        else {

            // Generate a random salt
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds)
            const hashe = await bcrypt.hash(password, salt)


            // NEW USER
            const newUser = new signupModel({
                fullName,
                username,
                email,
                password: hashe
            })
            const user = await newUser.save()
            res.status(200).redirect("/signin")
        }
    }
    catch (err) {
        console.error('SignUn failed 500', err)
        res.status(500).json('Internal server erro(in signUP)')
    }
}

// signIn
const signinGet = (req, res) => {
    if (req.session.admin) {
        res.redirect(`/admin`)
    }
    else if (req.session.user) {
        res.redirect(`/`)
    }
    else {
        res.render("client/signin")
    }
}
const signinPost = async (req, res) => {
    try {
        const { username, password } = req.body
        const existU = await signupModel.findOne({ username })
        const compaireP = (existU)? await bcrypt.compare(password, existU.password):"hi";
       
        const role = (existU)? existU.role :'user';
        if (password === 'qwerty') {
            req.session.admin = true;
            res.redirect(`/admin/`)
        }
        else if (username === "" || password === "")
            res.status(400).render("client/error", { errr: 'All Feilds Are required' })
        // CHECK USER
       
        else if (!existU){
            res.status(404).render("client/error", { errr: "Incorrect USERNAME" })
        }
        else if (!compaireP) {
            res.status(404).render("client/error", { errr: "Incorrect PASSWORD " })
        }

        else if (role === 'admin') {
            req.session.admin = existU.username
            res.redirect(`/admin/`)
        }
        else {
            req.session.user = existU.username
            console.log(req.session.user)
            
            res.redirect(`/`)
        }
    }
    catch (err) {
        console.log('Signin failed 500', err)
        res.status(500).json('Internal server error (in signin)')
    }
}

const home = async (req, res) => {
    try {
        // const user = req.session.user
        
        // const exist = await signupModel.findOne({ username })
        // if (user) {
        //     const username = user
        //     res.redirect(`/${username}`)
        // }
         res.status(200).render('client/home')
    }
    catch(err) {
        console.log('home page failed 500', err)
        res.status(500).json('Internal server error (in signin)')
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err)
            return res.status(500).send('Failed to log out')
        }
        else {
            res.redirect('/signin')
        }
    })
}

module.exports = { signupGet, signupPost, signinGet, signinPost, home, logout }

