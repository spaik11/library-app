const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const faker = require('faker');

module.exports = {
    getLogin: (req, res) => {
        return res.render('auth/login', { errors: req.flash('errors') });
    },

    getRegister: (req, res, next) => {
        return res.render('auth/register', { title: 'Register Home', errors: req.flash('errors') });
    },

    getProfile: (req, res, next) => {
        if (req.isAuthenticated()) return res.render('auth/profile');
        return res.redirect('/');
    },

    getUpdateProfile: (req, res, next) => {
        if (req.isAuthenticated()) return res.render('auth/update-profile', { errors: req.flash('errors') });
        return res.redirect('/');
    },

    updateProfile: (params, id) => {
        const { name, email, address } = params;

        return new Promise((resolve, reject) => {
            User.findById(id)
                .then((user) => {
                    if (name) user.profile.name = name;
                    if (email) user.email = email;
                    if (address) user.address = address;
                    return user;
                })
                .then((user) => {
                    user.save()
                        .then((user) => resolve(user))
                        .catch((err) => reject(err));
                })
                .catch((err) => reject(err));
        })      
    },

    updatePassword: (req, res, next) => {
        User.findById({ _id: req.user._id })
            .then((user) => {
                const { oldPassword, newPassword, repeatNewPassword } = req.body;

                if (!oldPassword && !newPassword && !repeatNewPassword) return res.render('auth/update-profile', { errors: 'Please fill in all inputs' });
                if (newPassword !== repeatNewPassword) return res.render('auth/update-profile', { errors: 'Repeat password does not match' });

                bcrypt.compare(oldPassword, user.password)
                    .then((result) => {
                        if (!result) return res.render('auth/update-profile', { errors: 'The old password does not match' });
                        user.password = newPassword;

                        user.save().then((user) => res.redirect('/api/users/profile'))
                            .catch((err) => next(err));
                    })
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    },

    register: async (req, res, next) => {
        const errors = validationResult(req);
        const { name, email, password, admin } = req.body;

        if (!errors.isEmpty()) return res.render('auth/register', { errors: errors.array() })

        let user = await User.findOne({ email });

        try {
            if (user) {
                res.send('User Exists');
                return req.flash('errors', 'User Already Exists');
            } else {
                user = await User.create({
                    ['profile.name']: name,
                    ['profile.picture']: faker.image.avatar(),
                    email,
                    password,
                    admin
                });
    
                user.save()
                    .then((user) => {
                        req.login(user, (err) => {
                            if (err) {
                                return res.status(400).json({ confirmation: false, message: err});
                            } else {
                                return res.redirect('/');
                            }
                        })
                    })
                    .catch((err) => next(err));
            };
        } catch (error) {
            return next(error);
        };
    },

    login: passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/api/users/login',
        failureFlash: true
    }),

    logout: (req, res) => {
        req.logout();
        return res.redirect('/');
    }
}
