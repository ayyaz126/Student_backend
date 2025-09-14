export const getUsers = async (req, res, next) => {
    try {
      // yahan code jo fail ho sakta hai
      res.json(users);
    } catch (error) {
      next(error); // error ko express middleware me bhej do
    }
  };



  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  });
  
  