//DEPENDANCIES 

//DEPENDANCIES 

//I.N.D.U.C.E.S


//Index - Get all tasks for a specific project. This also requires an ownership check on the parent project.

// All routes in this file must be nested inside its parent Projects.
    //: /api/projects/:projectId/tasks OR /api/projects/:projectId/tasks/:taskId depending on if a route needs to access a specific task within a specific project. 


//New - Generate a form for the creation of a new task.  

//Delete - Delete a single task. This requires the same complex authorization check as the update route.

//Update - Update a single task. This is the most complex authorization check. You must:

//Find the task by :taskId.
//From the task, find its parent project.
//Verify that the logged-in user owns that parent project.

//Create - Create a new task for a specific project. Before creating the task, you must verify that the logged-in user owns the project specified by :projectId.

//Edit -

//Show -