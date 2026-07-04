// Safe client-side Storage helper that wraps localStorage with memory fallback
const getStorageItem = (key, defaultValue) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    console.warn("Storage read blocked, using tab-session fallback", e);
    if (!window.local_fallback) window.local_fallback = {};
    return window.local_fallback[key] || defaultValue;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Storage write blocked, using tab-session fallback", e);
    if (!window.local_fallback) window.local_fallback = {};
    window.local_fallback[key] = value;
  }
};

// Initialize empty collections by default
function initDatabase() {
  if (getStorageItem("pm_projects", null) === null) {
    setStorageItem("pm_projects", []);
  }
  if (getStorageItem("pm_tasks", null) === null) {
    setStorageItem("pm_tasks", []);
  }
  if (getStorageItem("pm_activities", null) === null) {
    setStorageItem("pm_activities", []);
  }
  if (getStorageItem("pm_members", null) === null) {
    setStorageItem("pm_members", []);
  }
}

initDatabase();

// DB Operations wrapper
window.PM_DB = {
  clearDatabase: () => {
    setStorageItem("pm_projects", []);
    setStorageItem("pm_tasks", []);
    setStorageItem("pm_activities", []);
    setStorageItem("pm_members", []);
  },
  getProjects: () => {
    return getStorageItem("pm_projects", []);
  },
  getProjectById: (id) => {
    return window.PM_DB.getProjects().find(p => p.id === id);
  },
  saveProject: (project) => {
    const projects = window.PM_DB.getProjects();
    if (project.id) {
      const idx = projects.findIndex(p => p.id === project.id);
      if (idx !== -1) projects[idx] = { ...projects[idx], ...project };
    } else {
      project.id = "proj-" + Date.now();
      project.progress = isNaN(parseInt(project.progress)) ? 0 : parseInt(project.progress);
      project.team = project.team || [];
      projects.unshift(project);
    }
    setStorageItem("pm_projects", projects);
    return project;
  },
  deleteProject: (id) => {
    let projects = window.PM_DB.getProjects();
    projects = projects.filter(p => p.id !== id);
    setStorageItem("pm_projects", projects);
    
    let tasks = window.PM_DB.getTasks();
    tasks = tasks.filter(t => t.projectId !== id);
    setStorageItem("pm_tasks", tasks);
  },
  getTasks: () => {
    return getStorageItem("pm_tasks", []);
  },
  getTaskById: (id) => {
    return window.PM_DB.getTasks().find(t => t.id === id);
  },
  saveTask: (task) => {
    const tasks = window.PM_DB.getTasks();
    if (task.id) {
      const idx = tasks.findIndex(t => t.id === task.id);
      if (idx !== -1) {
        tasks[idx] = { ...tasks[idx], ...task };
      }
    } else {
      task.id = "task-" + Date.now();
      task.progress = isNaN(parseInt(task.progress)) ? 0 : parseInt(task.progress);
      task.checklist = task.checklist || [];
      task.comments = task.comments || [];
      tasks.unshift(task);
    }
    setStorageItem("pm_tasks", tasks);
    return task;
  },
  deleteTask: (id) => {
    let tasks = window.PM_DB.getTasks();
    tasks = tasks.filter(t => t.id !== id);
    setStorageItem("pm_tasks", tasks);
  },
  getActivities: () => {
    return getStorageItem("pm_activities", []);
  },
  addActivity: (activityText, details = "") => {
    const activities = window.PM_DB.getActivities();
    const newAct = {
      id: "act-" + Date.now(),
      user: "User",
      avatar: "U",
      color: "bg-blue-600",
      action: activityText,
      details: details,
      time: "Just now"
    };
    activities.unshift(newAct);
    setStorageItem("pm_activities", activities.slice(0, 15));
    return newAct;
  },
  getMembers: () => {
    return getStorageItem("pm_members", []);
  },
  getMemberByName: (name) => {
    return window.PM_DB.getMembers().find(m => m.name === name);
  },
  saveMember: (member) => {
    const members = window.PM_DB.getMembers();
    const existingIdx = members.findIndex(m => m.name.toLowerCase() === member.name.toLowerCase());
    
    if (existingIdx === -1) {
      const colors = ["bg-blue-600", "bg-green-600", "bg-indigo-600", "bg-purple-600", "bg-rose-600", "bg-amber-600"];
      member.color = colors[members.length % colors.length];
      member.initials = member.name.split(" ").map(n => n[0]).join("").toUpperCase();
      members.push(member);
    } else {
      members[existingIdx] = { ...members[existingIdx], ...member };
    }
    
    setStorageItem("pm_members", members);
    return member;
  },
  deleteMember: (name) => {
    let members = window.PM_DB.getMembers();
    members = members.filter(m => m.name !== name);
    setStorageItem("pm_members", members);
  },
  getStats: () => {
    const projects = window.PM_DB.getProjects();
    const tasks = window.PM_DB.getTasks();
    
    const activeProjects = projects.filter(p => p.status !== "Completed").length;
    let highPriority = projects.filter(p => p.priority === "High").length;
    let medPriority = projects.filter(p => p.priority === "Medium").length;
    const myTasksCount = tasks.length;

    // Dynamically calculate the list of unique team members entered across all projects
    const uniqueTeamInitials = new Set();
    projects.forEach(p => {
      if (p.team) {
        p.team.forEach(t => uniqueTeamInitials.add(t.initials));
      }
    });
    const totalMembers = uniqueTeamInitials.size;

    return {
      activeProjects,
      highPriority,
      medPriority,
      myTasksCount,
      onlineMembers: totalMembers, // matches what is entered manually
      totalMembers
    };
  }
};
