
const express = require('express');
const router = express.Router();
const db = require('../../../db');

//for user permission
router.post('/save-permissions', async (req, res) => {
    const { userId, permissions } = req.body;

    try {
        // Clear existing permissions for the user
        await db.query('DELETE FROM user_permissions WHERE user_id = ?', [userId]);

        // Insert new permissions
        for (const permission of permissions) {
            await db.query(
                'INSERT INTO user_permissions (user_id, page_name, read_permission, new_permission, modify_permission, delete_permission) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, permission.name, permission.read, permission.new, permission.modify, permission.delete]
            );
        }

        res.status(200).json({ message: 'Permissions saved successfully' });
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
});

//for collect userid
router.get('/userdata/:username', (req, res) => {
    const username = req.params.username;

    db.query('SELECT * FROM usercreation WHERE username = ?', username, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Route data not found' });
        }

        const routeData = result;
        return res.status(200).json(routeData);
    });
});

// collect data from billing database
router.get('/userdataid/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    db.query('SELECT * FROM user_permissions WHERE user_id = ?', user_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve user permissions from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User permissions not found' });
        }
        const userdetails = result;
        return res.status(200).json(userdetails);
    });
});
//collect permission database

router.get('/user-permissions/:user_id', (req, res) => {
    const { user_id } = req.params;
    // console.log(user_id)

    const query = `SELECT * FROM user_permissions WHERE user_id = ?`;

    db.query(query, [user_id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});


router.get('/user-permi/:user_id/:page_name', (req, res) => {
    const { user_id, page_name } = req.params;
    console.log(user_id)

    const query = `SELECT * FROM user_permissions WHERE user_id = ? AND page_name = ?`;

    db.query(query, [user_id, page_name], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results[0]);
            // console.log(results[0])
        }
    });
});


module.exports = router;