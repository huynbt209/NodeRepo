const UserService = require('../services/userService');

const getUserCreateRequest = async(req, res) => {
    const userService = new UserService();
    await userService.GetUserIdSession(req);
    res.render('user/user-createRequest');
}

const userCreateRequest = async(req, res) => {
    const userService = new UserService();
    const request = req.body;
    try {
        await userService.CreateNewRequest(request, req);
        await userService.sendAdminMessage(`${request.full_name} request ${request.request_type}`);
        res.status(200).json({TRAVE: true, request: request})
    } catch (error) {
        res.status(500).json({ 
            TRAVE: true, error: error
        });
    }
}

const getViewHistory = async (req, res) => {
    try {
        if (req.session.role == 'Admin') {
            res.status(400).json({ TRAVE: false, message: "Wrong user"});
        }
        const userService = new UserService();
        const data = req.body;
        const db = await userService.getAllRequest(data, req);
        res.render('user/view-history', {
            rq: db
        });
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const ViewHistoryByYear = async (req, res) => {
    try {
        if (req.session.role == 'Admin') {
            res.status(400).json({ TRAVE: false, message: "Wrong user"});
        }
        const userService = new UserService();
        const data = req.body;
        const db = await userService.getRequestByYear(data, req);
        res.send({rq:db});
        } catch (error) {
            res.status(500).json({ TRAVE: true, message: error });
        }
}

const getUserDetail = async (req, res) => {
    try {
        if (req.session.role == null) {
            res.status(400).json({ TRAVE: false, message: "Wrong user"});
        }
        const userService = new UserService();
        const userInDb = await userService.GetUserIdSession(req);
        res.render('user/user-details', {
            user: userInDb
        });
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}


module.exports = {
    getUserCreateRequest,
    userCreateRequest,
    getViewHistory,
    ViewHistoryByYear,
    getUserDetail
}