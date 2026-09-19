import jwt from "jsonwebtoken";


export const login = async (req, res, next) => {
  try {
    const { employeeId, password } = req.body;


    // Validation

    if (!employeeId || !password) {
      return res.status(400).json({
        success: false,
        message: "Employee ID and password are required.",
      });
    }


    // Check credentials

    if (
      employeeId !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Employee ID or password.",
      });
    }


    // Generate JWT

    const token = jwt.sign(
      {
        username: employeeId,
      },
      process.env.JWT_SECRET
    );


    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });

  } catch (error) {
    next(error);
  }
};