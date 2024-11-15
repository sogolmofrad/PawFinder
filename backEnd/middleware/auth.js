import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Access denied. No token provided." 
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.clearCookie('token');
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token. Please log in again." 
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error during authentication." 
        });
    }
};

export default auth;