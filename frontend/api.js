const API_URL = "http://localhost:5000/api";


async function apiRequest(endpoint, options = {}) {

    const token = localStorage.getItem("token");

    const response = await fetch(API_URL + endpoint, {

        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },

        ...options
    });


    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || "API Error");
    }


    return data;
}



// AUTH
async function getProfile(){

    return await apiRequest("/auth/profile");

}


// PROJECTS

async function getProjects(){

    return await apiRequest("/projects");

}


async function createProject(project){

    return await apiRequest("/projects",{

        method:"POST",

        body:JSON.stringify(project)

    });

}



async function deleteProject(id){

    return await apiRequest("/projects/"+id,{

        method:"DELETE"

    });

}



// TASKS

async function getTasks(){

    return await apiRequest("/tasks");

}



async function createTask(task){

    return await apiRequest("/tasks",{

        method:"POST",

        body:JSON.stringify(task)

    });

}



async function updateTask(id,data){

    return await apiRequest("/tasks/"+id,{

        method:"PUT",

        body:JSON.stringify(data)

    });

}



async function deleteTask(id){

    return await apiRequest("/tasks/"+id,{

        method:"DELETE"

    });

}