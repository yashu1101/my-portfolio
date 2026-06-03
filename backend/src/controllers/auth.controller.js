// ************Login************
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email !== process.env.EMAIL || password !== process.env.PASSWORD)
            return res.status(401).json({ message: "Invalid email or password!" })

        req.session.isAuthenticated = true
        console.log("Login successful.")
        return res.redirect('/')

    } catch (error) {
        res.status(500).json({ message: "Internal server problem!" })
    }
}


// *************Login page************

export const getLoginPage = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        res.status(500).json({ message: "Internal server problem!" })
    }
}


// *************Logout************
export const Logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: err.message });
            }
            res.redirect('/api/auth/login');
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
