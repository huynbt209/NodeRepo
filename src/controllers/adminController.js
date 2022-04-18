const AdminService = require('../services/adminService')
const RequestService = require('../services/requestService')

const getCreateUser = async(req, res) => {
    res.render('admin/admin-createUser');
}

const createUser = async(req, res) => {
    const adminService = new AdminService();
    const user = req.body;
    try {
        await adminService.createNewUser(user);
        res.redirect('/admin/user-list');
        
    } catch(err) {
        res.render('admin/admin-createUser', {
            error: err.message
        });
    }
    
}

const getUserList = async (req, res) => {
    try {
        if (req.session.role != 'Admin') {
            res.status(400).json({ TRAVE: false, message: "user is not admin"});
        }
        const adminService = new AdminService();
        const data = req.body;
        const db = await adminService.getAllUser(data);
        res.render('admin/admin-userlist', {
        users: db
        })
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const userDetail = async (req, res) => {
    const adminService = new AdminService();
    const id = req.params.user_id;
    const data = await adminService.getUserDetail(id);
    res.render('admin/user-detail', {
        users: data
    });
}

const lockOrUnlockUser = async (req, res) => {
    try {
        if (req.session.role != 'Admin') {
            res.status(400).json({ TRAVE: false, message: "user is not admin"});
        }
        const data =req.body;
        const adminService = new AdminService();
        const user = await adminService.lockOrUnlockUser(data);
        if (user) {
            res.status(200).json({ TRAVE: true, message: "Lock/Unlock user successfully"});
        }
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const getEditUser = async (req, res) => {
    try {
        if (req.session.role != 'Admin') {
            res.status(400).json({ TRAVE: false, message: "user is not admin"});
        }
        const adminService = new AdminService();
        const data = req.query;
        const db = await adminService.getUserById(data?.id);
        res.render('admin/admin-edit-user', {
            user: db
        })
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const EditUser = async (req, res) => {
    try {
        if (req.session.role != 'Admin') {
            res.status(400).json({ TRAVE: false, message: "user is not admin"});
        }
        const adminService = new AdminService();
        const data = req.body;
        data.user_id = parseInt(data.user_id);
        await adminService.updateUser(data);
        res.send();
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}

const getAllRequest = async (req, res) => {
    const requestService = new RequestService();
    const request = req.body;
    const requestInDB = await requestService.getAllRequest(request);
    res.render('admin/admin-requests', {
    requests: requestInDB
    });
}

const reviewRequest = async(req, res) => {
    try {
        const requestService = new RequestService();
        const request = req.body;
        request.request_id = parseInt(request.request_id);
        await requestService.adminReviewRequest(request);
        const adminService = new AdminService();
        await adminService.sendGeneralMessage(`Admin ${request.status} ${request.full_name}' request`);
        res.send();
    } catch (error) {
        res.status(500).json({ TRAVE: true, message: error });
    }
}
  
module.exports = {
    createUser,
    getCreateUser,
    getUserList,
    userDetail,
    lockOrUnlockUser,
    getEditUser,
    EditUser,
    getAllRequest,
    reviewRequest,
}
