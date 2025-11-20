require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

// GET API Documentation
app.get("/", (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const html = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Express + MongoDB CRUD API Documentation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
            background: #ecf0f1;
            padding: 10px;
            border-radius: 5px;
        }
        h3 {
            color: #2980b9;
            margin-top: 25px;
        }
        .endpoint {
            background: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #3498db;
            margin: 20px 0;
            border-radius: 5px;
        }
        .method {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px;
            font-weight: bold;
            color: white;
            font-size: 12px;
            margin-right: 10px;
        }
        .get { background: #27ae60; }
        .post { background: #3498db; }
        .put { background: #f39c12; }
        .delete { background: #e74c3c; }
        .url {
            font-family: 'Courier New', monospace;
            font-weight: bold;
            color: #2c3e50;
        }
        pre {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            position: relative;
        }
        pre code {
            display: block;
        }
        .copy-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background: #3498db;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        }
        .copy-btn:hover {
            background: #2980b9;
        }
        .response {
            background: #fff;
            border: 1px solid #ddd;
        }
        .table-container {
            overflow-x: auto;
            margin: 20px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background: #3498db;
            color: white;
        }
        tr:nth-child(even) {
            background: #f2f2f2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Express + MongoDB CRUD API Documentation</h1>
        <p><strong>Base URL:</strong> <code>${baseUrl}</code></p>
        <p>Dokumentasi ini berisi semua endpoint CRUD (Create, Read, Update, Delete) beserta contoh <code>curl</code> untuk masing-masing.</p>

        <h2>📋 Daftar Endpoint</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Endpoint</th>
                        <th>Deskripsi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span class="method get">GET</span></td>
                        <td><code>/users</code></td>
                        <td>Mendapatkan semua users</td>
                    </tr>
                    <tr>
                        <td><span class="method get">GET</span></td>
                        <td><code>/users/:id</code></td>
                        <td>Mendapatkan user berdasarkan ID</td>
                    </tr>
                    <tr>
                        <td><span class="method post">POST</span></td>
                        <td><code>/users</code></td>
                        <td>Membuat user baru</td>
                    </tr>
                    <tr>
                        <td><span class="method put">PUT</span></td>
                        <td><code>/users/:id</code></td>
                        <td>Update data user</td>
                    </tr>
                    <tr>
                        <td><span class="method delete">DELETE</span></td>
                        <td><code>/users/:id</code></td>
                        <td>Menghapus user</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <hr>

        <h2>🔵 1. CREATE User</h2>
        <div class="endpoint">
            <h3><span class="method post">POST</span> <span class="url">/users</span></h3>

            <h4>Request Body (JSON):</h4>
            <pre><code>{
  "name": "Andi",
  "email": "andi@example.com"
}</code></pre>

            <h4>Curl Example:</h4>
            <pre><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button><code>curl -X POST ${baseUrl}/users \\
-H "Content-Type: application/json" \\
-d '{"name":"Andi","email":"andi@example.com"}'</code></pre>

            <h4>Response Example:</h4>
            <pre class="response"><code>{
  "_id": "6543abcd1234ef567890",
  "name": "Andi",
  "email": "andi@example.com",
  "__v": 0
}</code></pre>
        </div>

        <h2>🟢 2. READ All Users</h2>
        <div class="endpoint">
            <h3><span class="method get">GET</span> <span class="url">/users</span></h3>

            <h4>Curl Example:</h4>
            <pre><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button><code>curl ${baseUrl}/users</code></pre>

            <h4>Response Example:</h4>
            <pre class="response"><code>[
  {
    "_id": "6543abcd1234ef567890",
    "name": "Andi",
    "email": "andi@example.com",
    "__v": 0
  },
  {
    "_id": "6543abcd1234ef567891",
    "name": "Budi",
    "email": "budi@example.com",
    "__v": 0
  }
]</code></pre>
        </div>

        <h2>🟢 3. READ User by ID</h2>
        <div class="endpoint">
            <h3><span class="method get">GET</span> <span class="url">/users/:id</span></h3>

            <h4>Curl Example:</h4>
            <pre><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button><code>curl ${baseUrl}/users/6543abcd1234ef567890</code></pre>

            <h4>Response Example:</h4>
            <pre class="response"><code>{
  "_id": "6543abcd1234ef567890",
  "name": "Andi",
  "email": "andi@example.com",
  "__v": 0
}</code></pre>

            <h4>If ID not found:</h4>
            <pre class="response"><code>{ "message": "User not found" }</code></pre>
        </div>

        <h2>🟡 4. UPDATE User</h2>
        <div class="endpoint">
            <h3><span class="method put">PUT</span> <span class="url">/users/:id</span></h3>

            <h4>Request Body (JSON):</h4>
            <pre><code>{
  "name": "Andi Updated",
  "email": "andi_updated@example.com"
}</code></pre>

            <h4>Curl Example:</h4>
            <pre><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button><code>curl -X PUT ${baseUrl}/users/6543abcd1234ef567890 \\
-H "Content-Type: application/json" \\
-d '{"name":"Andi Updated","email":"andi_updated@example.com"}'</code></pre>

            <h4>Response Example:</h4>
            <pre class="response"><code>{
  "_id": "6543abcd1234ef567890",
  "name": "Andi Updated",
  "email": "andi_updated@example.com",
  "__v": 0
}</code></pre>

            <h4>If ID invalid or not found:</h4>
            <pre class="response"><code>{ "message": "User not found" }</code></pre>
        </div>

        <h2>🔴 5. DELETE User</h2>
        <div class="endpoint">
            <h3><span class="method delete">DELETE</span> <span class="url">/users/:id</span></h3>

            <h4>Curl Example:</h4>
            <pre><button class="copy-btn" onclick="copyToClipboard(this)">Copy</button><code>curl -X DELETE ${baseUrl}/users/6543abcd1234ef567890</code></pre>

            <h4>Response Example:</h4>
            <pre class="response"><code>{ "message": "User deleted" }</code></pre>

            <h4>If ID invalid or not found:</h4>
            <pre class="response"><code>{ "message": "User not found" }</code></pre>
        </div>

        <hr>
        <footer style="margin-top: 40px; text-align: center; color: #7f8c8d;">
            <p>&copy; 2025 Express MongoDB CRUD API</p>
        </footer>
    </div>

    <script>
        function copyToClipboard(button) {
            const codeBlock = button.nextElementSibling;
            const text = codeBlock.textContent;

            navigator.clipboard.writeText(text).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.background = '#27ae60';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '#3498db';
                }, 2000);
            });
        }
    </script>
</body>
</html>`;
  res.send(html);
});

// GET all users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// CREATE user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  await user.save();
  res.status(201).json(user);
});

// UPDATE user
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// DELETE user
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
