// middleware/isAdmin.js
export default function isAdmin(req, res, next) {
  try {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "User role missing" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error in isAdmin" });
  }
}
