import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
    res.render('login')
});

router.get("/register", (req, res) => {
    res.render('register')
});

// Cuando ya tenemos una session activa con los datos del user, renderizamos la vista profile
router.get("/", (req, res) => {
    res.render('profile')
});

export default router;