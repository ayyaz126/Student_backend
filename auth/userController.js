
let users = [
    { id: 1, name: "Ali" },
    { id: 2, name: "Ayesha" }
  ];
  
  // Get all users
   export const getUsers = (req, res) => {
     res.json(users);
  };
  
  // Get single user by ID
    export const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
    };

    export const  getUsersByID = (req , res) =>{
    const id = Number(req.params.id);
    const user = users.find(u=> u.id === id)
    if(!users){
        return res.stutus(404).json({massage: "User not found"})
    }
    res.json (user)
    }
 
  //Create a new user
  export const createUser = (req, res) => {
    const { name } = req.body;
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.status(201).json(newUser);
  };

  // Update existing user
  export const updateUser = (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    const userIndex = users.findIndex(u => u.id === id);
  
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
  
    users[userIndex].name = name;
    res.json(users[userIndex]);
  };

  // Delete user
  export const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
  
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const deletedUser = users[userIndex]; 
    users.splice(userIndex, 1);
  
    res.status(200).json({
      message: "User deleted successfully",
      deletedUser 
    });
  };
  
  