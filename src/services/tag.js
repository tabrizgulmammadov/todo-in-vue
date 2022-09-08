export function fetchAllTags() {
  return new Promise(function (resolve, reject) {
    try {
      var tags = JSON.parse(localStorage.getItem("tags"));
      resolve(!tags ? [] : tags);
    } catch (error) {
      reject(error);
    }
  });
}

export function insertTags(data) {
  return new Promise(function (resolve, reject) {
    try {
      var tags = JSON.parse(localStorage.getItem("tags"));

      if (!tags) {
        tags = [];
      }

      data.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });

      localStorage.setItem("tags", JSON.stringify(tags));

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
