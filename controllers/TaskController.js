const { Task, User } = require('../models');

class TaskController {
    static addTask (req, res, next) {
        let data = {
            detail: req.body.detail,
            category: req.body.category,
            UserId: req.currentUser.id
        }
        Task.create(data)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static getTasks (req, res, next) {
        Task.findAll({
            include: User
        })
        .then(data => {
            let result = [];
            data.forEach(datas => {
                result.push({
                    id: datas.id,
                    detail: datas.detail,
                    category: datas.category,
                    UserId: datas.UserId,
                    User: {
                        id: datas.User.id,
                        email: datas.User.email
                    }
                })
            });
            res.status(200).json(result);
        })
        .catch(err => {
            next(err);
        })
    }

    static getOneTask (req, res, next) {
        let id = +req.params.id
        Task.findByPk(id)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static editTask (req, res, next) {
        let id = +req.params.id;
        let updatedTask = {
            detail: req.body.detail,
            category: req.body.category
        };
        Task.update(updatedTask, {
            where: {
                id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json(data[1]);
        })
        .catch(err => {
            next(err);
        })
    }

    static deleteTask (req, res, next) {
        let id = +req.params.id;
        Task.destroy({where: {id}})
            .then(data => {
                res.status(200).json({ message: 'Task has been successfully deleted.' });
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = TaskController; 