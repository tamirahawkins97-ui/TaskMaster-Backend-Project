//DEPENDANCIES 
const express = reuquire('express');
const router = express.Router();

//I.N.D.U.C.E.S
const {
createProject,
 getProjects, 
 getProjectById,
 updateProject,
 deleteProject} = require('../controllers/projectControllers');

// Authentication Middleware
const { verifyToken } = require('../middleware/auth-middleware');

//Index - All routes in this file must be protected by my authentication middleware. 
router.use(verifyToken);

// --- Endpoints ---
router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

  // Get all projects owned by the currently logged-in user.

   //Get a single project by its ID. This must be protected by an ownership check—a user can only get a project they own.

//New - Generate a form for the creation of a new Product.  

//Delete - Delete a project. Also protected by an ownership check.

//Update - Update a project. Also protected by an ownership check.

//Create - Create a new project. The owner’s ID must be taken from the req.user object (provided by the auth middleware) and saved with the new project.
router.post('/projects', async (req,res) =>{
    try{
        const createdProject = await Project.create(req.body);
        console.log("Project has been successfully created!")

        console.log(req.body)

        if(req.is("application.json")){
            return res.redirect('/projects')
        }
    } catch (error) {
        console.error("Error creating the project. ", error)
        res.status(400).send("unable to create project.");
    }
});
//Edit -

//Show -