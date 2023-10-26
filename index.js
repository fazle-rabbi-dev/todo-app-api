const app = require("./app");
const PORT = 5000;

app.listen(PORT, err => {
    if (!err) {
        console.log("✓ Server started at: http://localhost:" + PORT);
    }
});