export function fetchTasks({ name, tag, offset, limit }) {
  return new Promise(function (resolve, reject) {
    try {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      var result = {
        totalCount: 0,
        items: [],
      };

      if (!tasks) {
        resolve(result);
        return;
      }

      if (!offset) {
        offset = 0;
      } else {
        offset -= 1;
      }

      if (!limit) {
        limit = 10;
      }

      tasks = tasks.filter(
        (task) =>
          (!name || task.name.includes(name)) &&
          (!tag || task.tags.includes(tag))
      );

      result.totalCount = tasks.length;
      result.items = tasks.slice(offset, limit);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export function getTaskById(id) {
  return new Promise(function (resolve, reject) {
    try {
      var tasks = JSON.parse(localStorage.getItem("tasks"));

      if (!tasks) {
        reject(new Error(this.$t("defaults.alert.could-not-fetch")));
        return;
      }

      const taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex === -1) {
        reject(new Error(this.$t("defaults.alert.could-not-fetch")));
        return;
      }

      resolve(tasks[taskIndex]);
    } catch (error) {
      reject(error);
    }
  });
}

export function insertTask(data) {
  return new Promise((resolve, reject) => {
    try {
      var tasks = JSON.parse(localStorage.getItem("tasks"));

      if (!tasks) {
        tasks = [];
      }

      data.id = Date.now();
      data.isCompleted = false;
      tasks.push(data);

      if (data.tags) {
        window.API.insertTags(data.tags);
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function editTask(id, data) {
  return new Promise(function (resolve, reject) {
    try {
      var tasks = JSON.parse(localStorage.getItem("tasks"));

      if (!tasks) {
        reject(new Error(this.$t("defaults.alert.could-not-fetch")));
        return;
      }

      const taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex === -1) {
        reject(new Error(this.$t("defaults.alert.could-not-fetch")));
        return;
      }

      tasks[taskIndex] = {
        id,
        ...data,
      };

      if (data.tags) {
        window.API.insertTags(data.tags);
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function deleteTask(id) {
  return new Promise(function (resolve, reject) {
    try {
      var tasks = JSON.parse(localStorage.getItem("tasks"));

      if (!tasks) return;

      const taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex === -1) return;

      tasks.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
