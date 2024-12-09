import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "user isn't authenticated",
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.secret_accesstoken); // Ensure the correct env variable is used
        if (!decode) {
            return res.status(401).json({
                message: "invalid token",
                success: false
            });
        }
        req.id = decode.id; // Ensure the correct property is used

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};

export default isAuthenticated;
