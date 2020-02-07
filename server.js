const app = require("./app");
const path = require("path");
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "src", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "build", "index.html"));
});

app.listen(PORT, function() {
    console.log("Server is running on Port:", PORT);
});
