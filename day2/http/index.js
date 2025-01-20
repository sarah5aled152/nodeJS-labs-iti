import http from "http";

let users = [
  { name: "ali", id: 1, email: "ali@gmail.com" },
  { name: "camelia", id: 2, email: "sara@gmail.com" },
  { name: "basma", id: 3, email: "esraa@gmail.com" },
  { name: "heba", id: 4, email: "heba@gmail.com" },
];

//  generate the next ID for new users
const getNextId = () => {
  if (users.length === 0) return 1;
  const maxId = Math.max(...users.map((user) => user.id));
  return maxId + 1;
};

//  send responses
const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

//  parse the request body
const parseRequestBody = (req) => {
  let data = "";
  return new Promise((resolve) => {
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data ? JSON.parse(data) : {}));
  });
};
// find a user by ID
const findUser = (id) => users.find((user) => user.id === parseInt(id));

// all users
const handleGetAllUsers = (req, res) => {
  sendResponse(res, 200, users);
};

//users sorted
const handleGetSortedUsers = (req, res) => {
  const sortedUsers = [...users].sort((user1, user2) => {
    const textA = user1.name.toUpperCase();
    const textB = user2.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  sendResponse(res, 200, sortedUsers);
};

// add user
const handleAddUser = async (req, res) => {
  const data = await parseRequestBody(req);
  if (!data) {
    return sendResponse(res, 400, { error: "Invalid request body" });
  }

  const { name, email } = data;
  if (!name || !email) {
    return sendResponse(res, 400, { error: "Missing required fields" });
  }

  const newUser = {
    name,
    email,
    id: getNextId(),
  };

  users.push(newUser);
  sendResponse(res, 201, newUser);
};

// update
const handleUpdateUser = async (req, res, id) => {
  const data = await parseRequestBody(req);
  if (!data) {
    return sendResponse(res, 400, { error: "Invalid request body" });
  }

  const { name, email } = data;
  const user = findUser(id);

  if (!user) {
    return sendResponse(res, 404, { error: "User not found" });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  sendResponse(res, 200, user);
};

// DELETE
const handleDeleteUser = (req, res, id) => {
  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index < 0) {
    return sendResponse(res, 404, { error: "User not found" });
  }

  const deletedUser = users.splice(index, 1)[0];
  sendResponse(res, 200, deletedUser);
};

// gget user by id
const handleGetUserById = (req, res, id) => {
  const user = findUser(id);

  if (!user) {
    return sendResponse(res, 404, { error: "User not found" });
  }

  sendResponse(res, 200, user);
};

//  parse the request URL
const parseUrl = (reqUrl) => {
  const parsedUrl = new URL(reqUrl, "http://localhost");
  const path = parsedUrl.pathname;
  const id = path.split("/").pop();
  return { path, id };
};

/**
 * URL {
  href: 'http://localhost/users/8',
  origin: 'http://localhost',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost',
  hostname: 'localhost',
  port: '',
  pathname: '/users/8',
  search: '',
  searchParams: URLSearchParams {},
  hash: ''
}
/users/8
 */

// Server creation
http
  .createServer(async (req, res) => {
    const { path, id } = parseUrl(req.url);
    const { method } = req;

    try {
      if (path.match(/^\/users\/\d+$/)) {
        switch (method) {
          case "GET":
            return handleGetUserById(req, res, id);
          case "PUT":
            return handleUpdateUser(req, res, id);
          case "DELETE":
            return handleDeleteUser(req, res, id);
        }
      }
      switch (path) {
        case "/users":
          if (method === "GET") return handleGetAllUsers(req, res);
          if (method === "POST") return handleAddUser(req, res);
          break;
        case "/users/sorted":
          if (method === "GET") return handleGetSortedUsers(req, res);
          break;
        case "/":
          if (method === "GET") return handleGetAllUsers(req, res);
      }
      sendResponse(res, 404, { error: "Route not found" });
    } catch (error) {
      sendResponse(res, 500, { error: "Internal server error" });
    }
  })
  .listen(3000, () => {
    console.log("Server is running on port 3000...");
  });
