



const jwt = require('jsonwebtoken');
const { sendEmail } = require('../../utils/Nodemail');
const User = require('../../models/mymodel');
const SECRET_KEY = process.env.secret_key;
exports.UsersHandler = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log(req.body);

       
        const user = await User.create({
            username,
            email,
            password
        });

        
        const { password: omittedPassword, ...userWithoutPassword } = user.get({ plain: true });
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        const errorMessage = error.errors ? error.errors.map(err => err.message) : error.message;
        res.status(400).json({ error: errorMessage });
    }
};








exports.LoginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        const user = await User.findOne({ where: { email } });

      
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

      
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }   
        const { password: omittedPassword, ...userWithoutPassword } = user.get({ plain: true });
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};









exports.ForgotPasswordHandler = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
      
      
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        const resetUrl = "https://raybit-tasks.onrender.com/get"; 
      
        await sendEmail(user.email, 'Password Reset', `Reset your password by clicking the link: ${resetUrl}`);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
