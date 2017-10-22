const express = require('express');
const AuthController = require('../controllers/admin/AuthController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const ProjectController = require('../controllers/admin/ProjectController');
const ExperienceController = require('../controllers/admin/ExperienceController');
const AdminFormValidtions = require('../middlewares/adminFormValidations');

const router = express.Router();

const routeBuilder = (path = '/admin') => {
	router.get(`${path}/login`, AuthController.login);
	router.post(`${path}/login`, AuthController.loginPost);
	router.get(`${path}/logout`, isAuthenticated, AuthController.logout);
	router.get(`${path}/`, isAuthenticated, ProjectController.index);
	/**
	 * Projects Admin Routs
	 */
	router.get(`${path}/projects`, isAuthenticated, ProjectController.index);
	router.get(`${path}/projects/new`, isAuthenticated, ProjectController.new);
	router.post(`${path}/projects/`, isAuthenticated, AdminFormValidtions.newProject, ProjectController.save);
	router.get(`${path}/projects/:slug`, isAuthenticated, ProjectController.edit);
	router.put(`${path}/projects/:slug`, isAuthenticated, ProjectController.save);
	router.delete(`${path}/projects/:slug`, isAuthenticated, ProjectController.delete);
	/**
	 * Experiences Admin Routes
	 */
	router.get(`${path}/experiences`, isAuthenticated, ExperienceController.index);
	router.get(`${path}/experiences/new`, isAuthenticated, ExperienceController.new);
	router.post(`${path}/experiences/`, isAuthenticated, AdminFormValidtions.newExperience, ExperienceController.save);
	router.get(`${path}/experiences/:id`, isAuthenticated, ExperienceController.edit);
	router.put(`${path}/experiences/:id`, isAuthenticated, ExperienceController.save);
	router.delete(`${path}/experiences/:id`, isAuthenticated, ExperienceController.delete);
	return router;
};

module.exports = routeBuilder;
