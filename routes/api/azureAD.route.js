const express = require("express");
const azureADService = require("../../services/azureAD.service");
const azureADConfig = require("../../configs/azureAD.config");

const router = express.Router();
router.use(express.json());

const APP_STATES = {
    LOGIN: "login",
    CALL_API: "call_api",
};

// Route to initiate sign-in flow
router.get("/signin", async (req, res) => {
    try {
        const authCodeUrl = await azureADService.getAuthCodeUrl(
            azureADConfig.authorityUrl, APP_STATES.LOGIN);
        
        // res.redirect(authCodeUrl);  If you want to redirect to the authentication page

        res.json({"auth_redirect_url": authCodeUrl})
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to handle sign-out
router.get('/signout', (req, res) => {
    res.redirect(azureADConfig.redirectLogoutUrl);
});

// Route to exchange authorization code for tokens
router.post('/getAToken', async (req, res) => {
    try {
        const code = req.body.code;
        const response = await azureADService.exchangeCodeForTokens(code);
        res.json(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
