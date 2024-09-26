
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

        const token = jwt.sign(
            {
              _id: user._id,
            },
            SECRET_KEY
          );
          res.cookie("token", token, {       
            maxAge: 3 * 60 * 1000,
          });
        const { password: omittedPassword, ...userWithoutPassword } = user.get({ plain: true });
        res.status(201).json(userWithoutPassword,token);
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
        const token = jwt.sign(
            {
              _id: user._id,
            },
            SECRET_KEY
          );
          res.cookie("token", token, {       
            maxAge: 3 * 60 * 1000,
          });
        const { password: omittedPassword, ...userWithoutPassword } = user.get({ plain: true });
        res.status(200).json({ message:"Logged in successfully",userWithoutPassword,token});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};










exports.forgotPasswordHandler = async (req, res) => {
    const { email } = req.body;

    try {
        
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

       
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        const token = jwt.sign(
            { id: user.id },
            SECRET_KEY,
            {
                expiresIn: '1h',
                audience: 'user',
                issuer: 'raybit-auth-service'
            }
        );

        
        const resetUrl = `http://localhost:4000/reset-password?token=${token}`;

        
        await sendEmail(
            user.email,
            'Password Reset',
            `You requested a password reset. Please reset your password by clicking the link: ${resetUrl}`
        );

      
        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        
        console.error('Error sending password reset email:', error);

      
        res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
};














exports.resetPasswordHandler = async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;
    console.log(req.body);
    console.log(req.query);

    try {
       
        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and new password are required' });
        }

      
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, SECRET_KEY, { audience: 'user', issuer: 'raybit-auth-service' });
        } catch (err) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        
        const user = await User.findOne({ where: { id: decodedToken.id } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

      
        
        const isMatch = await user.comparePassword(newPassword);
       

        if (isMatch) {
            return res.status(400).json({ error: 'New password cannot be the same as the old password' });
        }
        user.password = newPassword;
        await user.save();

     

     
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        
        console.error('Error resetting password:', error);

      
        res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
};
