### 🔄 Callbacks (💡 Foundation of Async JS)

**What is a Callback?**
> A callback is a function passed as an argument to another function, to be **called later**, often when some async task is complete.

```js
function fetchData(callback) {
  setTimeout(() => {
    callback("✅ Data received");
  }, 1000);
}

fetchData((data) => {
  console.log(data); // ✅ Data received
});
```

🧠 Callbacks are the **base mechanism** before Promises and async/await came into play.

---

### ⚠️ Callback Hell & Pyramid of Doom

When callbacks get nested inside other callbacks:

```js
getUser((user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      // 😵 deeply nested
    });
  });
});
```

✅ Better: Use **Promises or async/await** to flatten this.

---

### ✨ Promises vs Callback Functions

| Feature         | Callback                    | Promise                        |
|-----------------|-----------------------------|--------------------------------|
| Chaining        | Messy                       | Clean with `.then()`          |
| Error Handling  | Manual `try/catch` in each  | Centralized with `.catch()`   |
| Readability     | Can get deeply nested       | Flatter, easier to read       |
| State           | No standard way             | Has built-in states            |

---

### 🔁 Asynchronous Functions

**Asynchronous functions** are those that run independently and don’t block the main thread.

Examples:
- `setTimeout`, `fetch`, DB queries, API calls

**Why use async functions?**
- JS is single-threaded. Async behavior prevents UI blocking and improves performance.

---

### 🔄 Promisified vs Non-Promisified Functions

#### 🧪 Non-Promisified (Callback-based)
```js
function loadData(callback) {
  setTimeout(() => {
    callback("Data ✅");
  }, 1000);
}
```

#### 🔁 Promisified Version
```js
function loadData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data ✅");
    }, 1000);
  });
}
```

✅ Promisifying helps make async functions compatible with `async/await`.

🧠 Node.js: Many legacy functions still use callbacks, but `util.promisify()` can convert them.

```js
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const content = await readFile('file.txt', 'utf8');
```

---

## 🔄 Revision

| Topic                        | Key Insight                                                              |
|-----------------------------|---------------------------------------------------------------------------|
| Callbacks                   | First form of async control flow                                         |
| Callback Hell               | Leads to deeply nested code – avoid it                                   |
| Promises                    | Cleaner async control flow with `.then()` and `.catch()`                 |
| Promisified Functions       | Enable use of `await` instead of callbacks                               |
| async/await                 | Syntactic sugar over Promises – looks like sync code, runs async         |
| Error Handling              | Prefer `try/catch` with `async/await`, and `.catch()` with Promises      |

---


## ✅ **Additional Key Points & Pro-Level Additions**
> **Current Week**: `Week 02 - Day 01`

---

### 🔁 Synchronous vs Asynchronous (Deep Clarity)

#### 🔹 Missing Insight: **JS Engine vs Browser APIs**
- JS itself (via the engine like V8) doesn’t have `setTimeout`, `fetch`, etc.
- **Browser (or Node)** provides those via **Web APIs**.
- Think of it like:
  ```txt
  JS Engine: I'll only run logic & promises.
  Browser: I'll handle your timers, network calls.
  ```

---

### 🧠 The Call Stack + Event Loop (Deeper View)

#### 🔹 Missing Insight: **Tasks vs Jobs**
- **Jobs = Microtasks** (Promise callbacks)
- **Tasks = Macrotasks** (setTimeout, setInterval)
- **Order of Execution:**
  ```txt
  1. Current sync code
  2. Microtasks (queueMicrotask, .then)
  3. Macrotasks (setTimeout, DOM events)
  ```

#### 🧪 Example:
```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
queueMicrotask(() => console.log("4"));
console.log("5");
```

🧾 **Output:**
```
1
5
3
4
2
```

🧠 `Promise.then()` and `queueMicrotask()` run **before** setTimeout!

---

### 🪝 Promises (Pro Insight)

#### 🔹 Missing Tip: **Promises are eager**
```js
const p = new Promise((resolve) => {
  console.log("Running promise executor");
  resolve();
});
```
📌 Output: `"Running promise executor"` — runs immediately!

#### 🔹 Missing Concept: **Error Propagation**
```js
Promise.reject("💥").catch(err => {
  console.error("Caught:", err);
});
```
✅ Always `.catch()` to prevent **UnhandledPromiseRejectionWarning`.

---

### ✨ async/await – Deeper Magic

#### 🔹 Hidden Gotcha: **await inside loops**

🚫 **Don’t do this:**
```js
for (let item of items) {
  await fetch(item); // ❌ slow, serial
}
```

✅ **Do this instead** (parallel):
```js
await Promise.all(items.map(item => fetch(item)));
```

---

### 🧪 Real-World Race Conditions Example

```js
async function getUserData() {
  const user = await fetch('/user');
  const posts = await fetch('/posts');
}
```

🧠 Better:
```js
const [user, posts] = await Promise.all([
  fetch('/user'),
  fetch('/posts')
]);
```

---

### 🧩 Promise Combinators – Use Cases

| Method | Description | When to Use |
|--------|-------------|-------------|
| `Promise.all` | All or nothing | When *all* must succeed |
| `Promise.race` | Fastest settles | Use in timeout fallback logic |
| `Promise.allSettled` | Always waits | Good for reporting status |
| `Promise.any` | First successful | Use when any success is OK |

#### 🔍 Example:
```js
const results = await Promise.allSettled([
  fetch('/a'),
  fetch('/b')
]);
results.forEach(res => {
  if (res.status === "fulfilled") console.log(res.value);
  else console.error(res.reason);
});
```

---

### 🌐 `fetch()` + Response Handling Best Practice

```js
async function getData() {
  const res = await fetch(url);
  if (!res.ok) throw new Error("❌ Network Error");
  const data = await res.json();
}
```

🧠 `res.ok` check avoids silent 404/500 errors.

---

### 🧠 Pro Tips Recap

| 🔥 Tip | Explanation |
|--------|-------------|
| `await` only blocks inside `async` | Not globally unless using top-level `await` |
| `async` always returns a Promise | Even if returning plain value |
| Don't `await` in loops | Use `Promise.all` for performance |
| Chain `.catch()` always | Prevent unhandled rejections |
| `Promise.allSettled` > `all` if you want resilience | Good for tasks where failure is OK |




# 📘 JavaScript Async Mastery – **Cheatsheet**



## 🔁 **Sync vs Async**

| 🧠 Concept | 📌 Sync | ⚡ Async |
|-----------|---------|----------|
| Thread Blocking | ✅ Yes | ❌ No |
| Runs via | Call Stack | Web APIs + Event Loop |
| Examples | `console.log()`, math ops | `setTimeout()`, `fetch()`, `Promise.then()` |

---

## 🧱 **Call Stack & Event Loop Flow**

```
1. Sync code → Call Stack
2. Async task → Web API
3. Web API → Task/Microtask Queue
4. Event Loop → Pushes to Call Stack
```

✅ **Microtasks before Macrotasks**

---

## 📊 **Microtask vs Macrotask**

| Type | Examples | Priority |
|------|----------|----------|
| 🧬 Microtask | `.then()`, `await`, `queueMicrotask()` | ⬆️ High |
| 🕒 Macrotask | `setTimeout()`, `setInterval()`, DOM events | ⬇️ Low |

🧪 Output Example:
```js
console.log("Start");
setTimeout(() => console.log("🕒 Timeout"), 0);
Promise.resolve().then(() => console.log("🧬 Microtask"));
console.log("End");
```
🧾 Result: `Start → End → Microtask → Timeout`

---

## 🪝 **Promises**

✅ **States**:
- `pending ⏳`
- `fulfilled ✅`
- `rejected ❌`

✅ **Always chain `.catch()` to handle errors**

🧪 Example:
```js
new Promise((res, rej) => res("✅"))
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## ✨ **async/await**

- `async` returns a Promise
- `await` pauses inside `async` until resolved

🧠 Can't use `await` at top-level (unless environment supports it)

✅ Example:
```js
async function getData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
  } catch (err) {
    console.error(err);
  }
}
```

---

## 🧩 **Promise Combinators**

| Method | Behavior | Use Case |
|--------|----------|----------|
| `Promise.all` | Waits for all ✅ or fails ❌ | Dependent tasks |
| `Promise.allSettled` | Waits for all regardless | Reporting, UI |
| `Promise.race` | First to settle wins 🏁 | Timeouts |
| `Promise.any` | First to succeed | Fast fallback |

🧪 `allSettled` Example:
```js
const results = await Promise.allSettled([p1, p2]);
results.forEach(r => console.log(r.status));
```

---

## 🔂 Common Async APIs

| Method | Type | Async? | Handled via |
|--------|------|--------|-------------|
| `fetch()` | Network | ✅ | Promise + Web API |
| `setTimeout()` | Timer | ✅ | Macrotask |
| `setInterval()` | Timer | ✅ | Macrotask |
| `.then()` | Promise | ✅ | Microtask |
| `addEventListener()` | Event | ✅ | Event Queue |

---

## ⚠️ Gotchas & Pro Tips

✅ **Promises are eager**  
```js
new Promise(() => console.log("🔥 Runs immediately!"));
```

⚠️ **Avoid await in loops**
```js
// ❌ Slow
for (let item of list) {
  await fetch(item);
}

// ✅ Better
await Promise.all(list.map(item => fetch(item)));
```

✅ **Check fetch status**
```js
if (!res.ok) throw new Error("❌ Network error");
```

✅ `queueMicrotask()` → for precise microtask timing

✅ `async function` always returns a Promise

---

## 🔁 Quick Recap

| Concept | Role | Notes |
|--------|------|-------|
| **Call Stack** | Executes sync | One line at a time |
| **Web API** | Runs async logic | setTimeout, fetch |
| **Task Queue** | Stores callbacks | setTimeout, etc. |
| **Microtask Queue** | Stores promises | `.then()`, `await` |
| **Event Loop** | Traffic Cop 🚦 | Moves tasks when stack is empty |

---

## 📌 Topic: **Bash and Terminal**

---

### ✅ What is a **Terminal**?


The **Terminal** is a tool that lets you talk to your computer using **text commands** instead of clicking things.

 
**Terminal** aik tool hai jiske zariye aap apne computer se **text commands** ke zariye baat karte hain, bina mouse click kiye.

💡 **Example:**

- Instead of opening a folder by double-clicking, you can type:
  ```
  cd Documents
  ```

---

### ✅ What is **Bash**?


**Bash** stands for "**Bourne Again SHell**". It is a **shell** — a program that reads your **commands** and tells the operating system what to do.

 
**Bash** aik shell program hai jo aapke diye gaye **commands** ko samajhta hai aur operating system ko batata hai ke kya karna hai.

💡 **Example:**  
When you type this in terminal:

```
ls
```

Bash helps the system understand: "Show me the files in this folder."

---

### ✅ Terminal vs Bash (Simple Table)

| Concept    | Terminal                    | Bash                              |
| ---------- | --------------------------- | --------------------------------- |
| What it is | A program to write commands | A shell that understands commands |
| Purpose    | Interface for user input    | Interpreter for command execution |
| Example    | GNOME Terminal, iTerm, etc. | Bash, Zsh, Fish, etc.             |



- Terminal aik jagah hai jahan aap likhte hain.
- Bash aik system hai jo us likhe hue ko samajhta hai.

---

## ✅ Basic Bash Commands with Examples

### 1. `pwd`

**Purpose:** Show current folder (Print Working Directory)  
**Command:**

```bash
pwd
```

📍 Output:

```
/home/user/Desktop
```

Ye command aapko batati hai ke aap kis folder (directory) ke andar hain.

---

### 2. `ls`

**Purpose:** List files in the current folder  
**Command:**

```bash
ls
```

📍 Output:

```
file1.txt  folder1  image.png
```

Ye command current folder ke andar jo files ya folders hain unko dikhata hai.

---

### 3. `cd`

**Purpose:** Change Directory (folder change karna)  
**Command:**

```bash
cd Documents
```

Ye command aapko kisi aur folder ke andar le jaati hai.

---

### 4. `mkdir`

**Purpose:** Make a new folder  
**Command:**

```bash
mkdir myFolder
```

Ye command ek naya folder banata hai jiska naam `myFolder` hoga.

---

### 5. `touch`

**Purpose:** Create a new empty file  
**Command:**

```bash
touch file.txt
```

Ye command ek nayi file banati hai (khaali file).

---

### 6. `rm`

**Purpose:** Delete file or folder  
**Command:**

```bash
rm file.txt        # File delete karein
rm -r myFolder     # Folder delete karein (with -r = recursive)
```

Ye command file ya folder delete karne ke liye use hoti hai.

---

## ✅ Summary Notes (Perfect for Revision):

📝 **Terminal**:

- Interface to write commands
- Example: GNOME Terminal, iTerm, Command Prompt (Windows)

📝 **Bash**:

- Command interpreter (Shell)
- Understands and executes commands
- Default shell on many Linux/Mac systems

📝 **Important Commands**:
| Command | Urdu Meaning | Use |
|---------|------------------------|---------------------------------|
| `pwd` | Current folder dikhana | Show current directory |
| `ls` | Files dikhana | List files in current folder |
| `cd` | Folder change karna | Change directory |
| `mkdir` | Naya folder banana | Make new directory |
| `touch` | Nayi file banana | Create empty file |
| `rm` | Delete karna | Remove file/folder |

---


### 🔀 cd into Multiple Folders in One Command
**Command:**

```bash
cd folder1/folder2/folder3
```

🧠 Ye command ek hi baar mein aapko **nested folders ke andar** le jaata hai.

**Example:**

```bash
cd Documents/Projects/JavaScript
```

---

### 📝 cat – View File Content
**Purpose:** File ke andar kya likha hai usko terminal mein dikhata hai.

**Command:**

```bash
cat file.txt
```

📍 Output: File ke andar likha hua content screen pe aayega.

🧠 **cat** ka matlab hai **concatenate**, lekin mostly use hota hai **file content dekhne ke liye**.

---

### 📄 vi – Terminal Text Editor
**Purpose:** File ke andar likhne/edit karne ke liye use hota hai (inside terminal).

**Command:**

```bash
vi file.txt
```

- Press `i` to **start writing (insert mode)**
- Press `Esc` to **exit writing mode**
- Type `:wq` to **save and quit**

🧠 vi is old-school but powerful! (Mac/Linux default)

---

### 🔁 mv – Move or Rename Files
**Purpose:** File ko **move** ya **rename** karne ke liye.

**Command:**

```bash
mv oldname.txt newname.txt  # Rename
mv file.txt Documents/      # Move to Documents
```

🧠 `mv` = **move**, but also works for renaming.

---

### 📄 cp – Copy Files or Folders
**Purpose:** File ya folder ka duplicate banata hai.

**Command:**

```bash
cp file.txt copy.txt               # File copy
cp -r folder1 folderCopy           # Folder copy (recursive)
```

---

## 💻 Installing Node.js on Your Machine

**Step 1:** Go to [https://nodejs.org](https://nodejs.org)

**Step 2:** Download **LTS version** (Long-Term Support)

**Step 3:** Install and verify:

```bash
node -v     # ✅ Version of Node
npm -v      # ✅ Version of npm
```

---

## ⚙️ node – Run JS Files in Terminal

**Command:**

```bash
node file.js
```

🧠 Node terminal ke through aap **JavaScript ka code run kar sakte ho** without needing a browser.

---

## 📦 npm – Node Package Manager

**What is npm?**
> A tool to install external libraries (e.g., lodash, express)

**Command to install a package:**

```bash
npm install package-name
```

🧠 Example:

```bash
npm install axios
```

✨ This will create a `node_modules` folder and `package.json` if not already present.

---

### 📦 npm vs node

| Command | Purpose |
|--------|---------|
| `node` | Runs JS file |
| `npm`  | Manages libraries/packages |

---




| Command | Urdu Meaning | Use |
|--------|---------------|-----|
| cat     | File ka content dikhana | View content of file |
| vi      | File edit karna         | Open terminal-based editor |
| mv      | File rename ya move karna | Move or rename file |
| cp      | Copy karna | Duplicate file or folder |
| node    | JS code run karna | Run JavaScript in terminal |
| npm     | Library install karna | Manage Node.js libraries |

---

# 📌 Topic: Bash (Advanced)

✅ **What is Advanced Bash?**  
Advanced Bash means using more powerful and complex features of the Bash shell — like loops, conditionals, scripts, variables, and more — to automate tasks and write small programs.

Bash ka advanced use matlab aise commands aur tools ka istemal jo repetitive tasks ko automate karein ya logical decisions le sakein.

---

## ✅ Bash Variables  
💡 Store and reuse data in scripts.

```bash
name="Ali"
echo "Hello, $name"
```

📍 Output:
```
Hello, Ali
```

---

## ✅ If-Else Condition (Decision Making)

```bash
if [ $age -ge 18 ]; then
  echo "You are an adult"
else
  echo "You are a minor"
fi
```

📍 Explanation: Agar age 18 ya usse zyada hai toh adult, warna minor.

---

## ✅ Loops (Repeat Commands)

### 🔁 For Loop:
```bash
for i in 1 2 3
do
  echo "Number $i"
done
```

### 🔁 While Loop:
```bash
count=1
while [ $count -le 5 ]
do
  echo "Count: $count"
  ((count++))
done
```

---

## ✅ Bash Functions

```bash
greet() {
  echo "Hello, $1!"
}

greet "Zara"
```

📍 Output: `Hello, Zara!`

---

## ✅ Script File (.sh)  
Save commands in a `.sh` file and run it.

📄 **myscript.sh**
```bash
#!/bin/bash
echo "Running a script!"
```

🔧 Make it executable:
```bash
chmod +x myscript.sh
./myscript.sh
```

---

## ✅ Summary Notes – Bash (Advanced)

| Concept        | Urdu Meaning                     | Use                               |
|----------------|----------------------------------|------------------------------------|
| Variables      | Data store karna                | Store and reuse information        |
| if-else        | Conditions lagana               | Decision making in scripts         |
| Loops          | Repeat karna                    | Repeat tasks automatically         |
| Functions      | Reusable blocks banana          | Write once, use multiple times     |
| Scripts        | Commands ko file mein likhna    | Automate tasks easily              |

---

# 📌 Topic: How to Install Node.js

✅ **What is Node.js?**  
Node.js is a JavaScript runtime that lets you run JavaScript code outside the browser — useful for building servers, tools, and backend apps.

Node.js aik tool hai jo JavaScript ko browser ke bahar bhi chalanay deta hai — jaise backend programs aur servers.

---

## ✅ Install Node.js on Windows

1. Go to: [https://nodejs.org](https://nodejs.org)
2. Download the **LTS version**
3. Run the installer (next-next-finish)
4. Check if it's installed:

```bash
node -v
npm -v
```

📍 Output:  
```
v18.17.1   ← Node version  
9.6.7      ← npm (Node Package Manager)
```

---

## ✅ Install Node.js on Ubuntu/Linux

```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

✅ Check versions:
```bash
node -v
npm -v
```

---

## ✅ Install using Node Version Manager (nvm) — Recommended for Developers

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Reload terminal:
```bash
source ~/.bashrc
```

Install Node.js:
```bash
nvm install --lts
nvm use --lts
```

---

## ✅ Summary Notes – Node.js Install

| Step                   | Urdu Meaning                           | Description                              |
|------------------------|----------------------------------------|------------------------------------------|
| node -v               | Node ka version dekhna                 | Check Node is installed                  |
| npm -v                | npm ka version dekhna                  | Check Package Manager version            |
| nvm                  | Node Version Manager                   | Easily install multiple Node versions    |
| curl ... | Node installer ko download karna | Recommended for devs on Linux/macOS |

---

### 🆕 `chmod` – Change Permissions

**Purpose:** Change file or folder permissions (like read, write, execute)

**Command:**
```bash
chmod +x myscript.sh   # Makes the script executable
chmod 755 file.txt     # Sets read-write-execute permissions
```

🧠 `chmod` ka matlab hai “change mode” (file permissions ka mode)

---

### 📢 `echo` – Print Messages

**Purpose:** Output a string or variable

**Command:**
```bash
echo "Hello World"
echo "My name is $USER"
```

🧠 Scripts mein `echo` commonly used hota hai debug ya output ke liye.

---

### 🔽 `head` & `tail` – See Beginning or End of Files

**head** – First 10 lines of file
```bash
head file.txt
```

**tail** – Last 10 lines of file
```bash
tail file.txt
```

🧠 Use with `-n` flag:
```bash
head -n 5 file.txt   # First 5 lines
tail -n 15 file.txt  # Last 15 lines
```

---

### 🔗 `|` Pipe Operator

**Purpose:** Send output of one command into another command

```bash
cat file.txt | grep "error"
```

🧠 Pipe ka use hota hai chaining ke liye: ek command ka output dusre ka input banata hai.

---

### 🔢 `wc` – Word Count

**Purpose:** Count words, lines, and characters

```bash
wc file.txt
```

🧠 Use with flags:
```bash
wc -l file.txt   # Only lines
wc -w file.txt   # Only words
wc -c file.txt   # Only bytes
```

---

### 🔍 `grep` – Pattern Search in File

**Purpose:** Search for a keyword or pattern in a file

```bash
grep "apple" fruits.txt
```

🧠 Case-insensitive search:
```bash
grep -i "apple" fruits.txt
```

🧠 With pipe:
```bash
ps aux | grep node
```

---

### 🧬 `sed` – Stream Editor

**Purpose:** Search and replace inside files (non-interactive editing)

```bash
sed 's/old/new/g' file.txt
```

🧠 Replace "apple" with "banana" in whole file.

---

### 🧬 `awk` – Pattern Scanning & Text Processing

```bash
awk '{ print $1 }' file.txt
```

🧠 `awk` ka use hota hai column-wise filtering and data extraction ke liye.

Example: Show only usernames from `passwd` file
```bash
awk -F: '{ print $1 }' /etc/passwd
```

---

### 🕘 `history` – View Command History

**Command:**
```bash
history
```

🧠 Show all recent commands you've typed.

You can re-run by number:
```bash
!55
```

---

### 📝 Bash Script Example (Recap with Extra Commands)

```bash
#!/bin/bash

echo "Creating a file..."
touch myfile.txt

echo "Writing to file..."
echo "Hello from Bash!" > myfile.txt

echo "Reading file..."
cat myfile.txt

echo "Done."
```

Run with:
```bash
chmod +x script.sh
./script.sh
```

---


### 📘 New Commands Summary Table

| Command | Urdu Meaning | Use |
|---------|--------------|-----|
| chmod   | Permission set karna | Make file executable |
| echo    | Screen pe likhna | Print message or variable |
| head    | Start dikhana | Show first lines of file |
| tail    | End dikhana | Show last lines of file |
| wc      | Count karna | Count lines/words/chars |
| grep    | Search karna | Search text in files |
| sed     | Replace/edit karna | Edit file content |
| awk     | Text filter karna | Work with file data |
| pipe `|` | Combine commands | Chain commands together |
| history | Pichle commands dekhna | Show past terminal commands |

---


# 📘 **Week 2 - Day 4: Express.js Basics**

---

## ✅ What is Express.js?

**Express.js** is a **minimal, fast, and flexible** web application framework for **Node.js** that helps in building **web servers and APIs** with ease.

- Built on top of Node.js.
- Used for server-side (backend) development.
- Makes it easy to handle **routes**, **HTTP methods**, and **middleware**.

📌 **Think of it like this:**  
**Node.js = engine**,  
**Express.js = car built on that engine.**

---

## ✅ Why Express.js?

- Reduces complexity of backend code in Node.js.
- Built-in routing and middleware system.
- Scalable and lightweight.
- Easily integrates with databases like **MongoDB**, **MySQL**, etc.
- Ideal for building **RESTful APIs**.

📌 **Real Talk:** Express.js se backend development bohat asaan ho jata hai — especially for beginners.

---

## ✅ Installing Express.js & Running the App

Before using Express, make sure you have **Node.js** and **npm** installed.

### Step 1: Initialize a new Node project
```bash
npm init -y
```

### Step 2: Install Express.js
```bash
npm install express
```

### Step 3: Create your main file (e.g. `app.js`)
```js
// app.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

### Step 4: Run your app
```bash
node app.js
```

✅ Now open your browser and go to:  
[http://localhost:3000](http://localhost:3000)

---

## ✅ Node.js vs Express.js

| Feature         | Node.js                        | Express.js                       |
|----------------|--------------------------------|----------------------------------|
| Definition      | JavaScript runtime environment | Framework built on Node.js       |
| Usage           | Low-level (manual HTTP handling) | High-level (easy to use)       |
| Routing         | Manual                         | Built-in routing system          |
| Middleware      | No built-in support            | Full middleware support          |

🧠 **Example**: Writing server code is much shorter and cleaner in Express than raw Node.js.

---

## ✅ Routing in Express.js

**Routing** decides **how the app responds** to various requests (GET, POST, etc.).

```js
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.post('/submit', (req, res) => {
  res.send('Form Submitted');
});
```

📌 Route = **URL + HTTP Method**

---

## ✅ Middleware in Express.js

**Middleware** is a function that runs **between** the **request** and the **response**.

Used for:
- Logging
- Authentication
- Validating data
- Error handling

```js
app.use((req, res, next) => {
  console.log('Request received!');
  next(); // Pass control to the next middleware/route
});
```

📌 Socho middleware ko jaise **security checkpoint** — har request uske through guzarti hai.

---

## ✅ Request & Response Objects

- **`req`** (Request): Data coming from the client.
- **`res`** (Response): What server sends back to the client.

```js
app.get('/user', (req, res) => {
  res.send(`Hello, ${req.query.name}`);
});
```

🧠 `req.body`, `req.query`, `req.params` → Different ways to receive data.

---

## ✅ Route Parameters

Used for **dynamic URLs** like profiles or products.

```js
app.get('/user/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});
```

🧠 Example: `/user/5` → `req.params.id` = `5`

---

## ✅ Template Engine (EJS)

**EJS (Embedded JavaScript Templates)** allows rendering dynamic content in HTML using JS.

### Step 1: Install EJS
```bash
npm install ejs
```

### Step 2: Set up EJS in Express
```js
app.set('view engine', 'ejs');
```

### Step 3: Create a view and render it
```js
app.get('/', (req, res) => {
  res.render('home', { name: 'Ali' });
});
```

**home.ejs**
```html
<h1>Hello <%= name %></h1>
```

📌 EJS se HTML ke andar JS variables easily inject kar sakte hain.

---

## ✅ Serving Static Files

**Static files** = images, CSS, JS files.

```js
app.use(express.static('public'));
```

📁 Folder structure:
```
public/
  └─ style.css
```

Then you can access: `http://localhost:3000/style.css`

---

## ✅ HTTP Methods: GET vs POST

| Method | Purpose           | Example Use         |
|--------|-------------------|---------------------|
| GET    | Retrieve data     | Load page, get info |
| POST   | Send data         | Submit form, send login data |

```js
app.get('/login', (req, res) => {
  res.send('Login Page');
});

app.post('/login', (req, res) => {
  res.send('Logging in...');
});
```

---

## ✅ Error Handling in Express

Create a special middleware for catching errors:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

📌 Always define error-handling middleware at the **end of all routes**.

---

## 🗂 Example: Basic Express App

```js
// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.get('/user/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server error!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

### ✅ Run the App
```bash
node app.js
```

🖥️ Visit: [http://localhost:3000](http://localhost:3000)

---


### 🧠 🔄 **Single-Threaded Nature of JavaScript**

> JavaScript (and Node.js) is **single-threaded**, meaning it handles one operation at a time on the **main thread**.

- But thanks to **asynchronous features** (like callbacks, Promises, async/await), it can **handle multiple tasks seemingly in parallel** via the **event loop**.
  
**Example Explanation:**
```js
console.log("Start");
setTimeout(() => console.log("Async Task"), 1000);
console.log("End");
```

📌 Output:
```
Start
End
Async Task
```

🧠 Even though `setTimeout` was delayed, the code didn’t wait — that's **non-blocking, async behavior**.

---

### 🌐 **What is an HTTP Server?**

> An **HTTP server** is a program that **listens to HTTP requests** and returns responses. Node.js can create one without Express:

```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.write('Hello from Node');
  res.end();
});
server.listen(3000);
```

But doing this manually for routes, errors, etc., becomes complex — that’s where **Express.js** helps.

---

### 📥 **Taking Input in HTTP Servers**

This includes both **query parameters**, **URL params**, and **request bodies**.

✔️ You covered `req.query` and `req.params` well. What’s missing:

#### ➕ **req.body** – Used in POST requests (form/API data)

You must **parse incoming data**:

```js
app.use(express.json()); // Needed to parse JSON in POST body

app.post('/data', (req, res) => {
  console.log(req.body); // { name: "Ali" }
  res.send("Data received");
});
```

🧠 Use tools like **Postman** or **frontend forms** to send data.

---

### 🛠️ **Types of HTTP Methods** (Detail Table)

You mention `GET` and `POST`, which is great! Now complete the picture:

| Method | Purpose                 | Example |
|--------|--------------------------|---------|
| GET    | Retrieve data            | Load page, fetch items |
| POST   | Send new data            | Submit forms |
| PUT    | Update existing data     | Edit profile |
| DELETE | Remove data              | Delete user or item |

---

### 📊 **Status Codes in HTTP**

Include **common status codes** developers should return:

| Code | Meaning                | When to Use             |
|------|------------------------|--------------------------|
| 200  | OK                     | Successful response      |
| 201  | Created                | After POST creation      |
| 400  | Bad Request            | Invalid input            |
| 401  | Unauthorized           | Not logged in            |
| 404  | Not Found              | URL doesn’t exist        |
| 500  | Server Error           | App crashed / error      |

Example usage:
```js
res.status(201).send("User created");
```

---

### 🧪 **What is Postman?**

> **Postman** is a tool that helps test APIs by sending HTTP requests (GET, POST, PUT, DELETE) to your backend.

✔️ You can:

- Test your Express routes without needing a frontend
- Send custom headers or body data
- View response and status codes easily

🧠 Must-have tool for every backend dev.

📸 Sample use:
1. Create a POST request to `http://localhost:3000/data`
2. Select “Body” → raw → JSON:
```json
{
  "name": "Zara"
}
```
3. See how Express handles the input!

---





- ✅ Single-threaded nature of JS + Event loop logic
- ✅ What is an HTTP Server (manual example with `http` module)
- ✅ Taking input via `req.body` (JSON input handling)
- ✅ Full HTTP Methods table (`GET`, `POST`, `PUT`, `DELETE`)
- ✅ Status Codes table and usage
- ✅ What is Postman + practical usage

---




## 🔑 Key Points Summary

- **Express.js** makes backend development faster and easier.
- **Routing** connects URLs to server logic.
- **Middleware** acts as a processing step between request and response.
- **Request/Response** objects are the backbone of communication.
- **EJS** enables dynamic HTML rendering.
- **Static files** are served using `express.static`.
- **GET vs POST** are two core HTTP methods.
- Always use **error handling middleware** at the end.
- Run your server with: `node app.js`

---

## 💬 Quick Recall:

- Express.js → Node.js ka helper, easy backend banane ke liye.
- Middleware → Request ke darmiyan ka checkpoint.
- Routing → App ka "traffic signal", decide karta hai kya response dena hai.
- EJS → HTML + JavaScript = Dynamic pages.
- Error handling → Server ko crash hone se bachata hai.
- Server start karne ke liye: `node app.js`


### ✅ `map()` — Transform Elements
**Short Definition**:  
Creates a **new array** by applying a function to **every element**.

🧠 **Key Points**:
- Original array **unchanged**
- Always returns **new array**
- Har element par function lagta hai

🔸 Example:
```js
[1, 2, 3].map(n => n * 2); // [2, 4, 6]
```

📌Map har item ko transform karta hai aur naya array return karta hai.

---

### ✅ `filter()` — Select Some Elements
**Short Definition**:  
Returns a **new array** with elements that **pass a condition** (true).

🧠 **Key Points**:
- Sirf woh elements jo condition pass karein
- Original array **safe**
- Returns new array, can be empty

🔸 Example:
```js
[5, 10, 15].filter(n => n > 7); // [10, 15]
```

📌Filter sirf woh items rakhta hai jo condition match karein.

---

### ✅ `sort()` — Sort Array In-place
**Short Definition**:  
**Sorts** the array items **in-place** (changes original array).

🧠 **Key Points**:
- Strings by default
- For numbers: use `(a, b) => a - b`
- Changes original array (⚠️ mutates)

🔸 Example:
```js
[5, 2, 8].sort((a, b) => a - b); // [2, 5, 8]
```

📌Sort array ko inplace arrange karta hai — number ke liye compare function zaroori hota hai.

### ✅ `find()` — Find First Match  
**Short Definition**:  
Returns the **first element** that satisfies a condition.

🧠 **Key Points**:
- Stops after first match (fast)
- Returns **value**, not array
- Returns `undefined` if not found

🔸 Example:
```js
[10, 15, 20].find(n => n > 12); // 15
```

📌Find sirf **pehla item** return karta hai jo condition pass kare. Na mile to `undefined`.

---

### ✅ `reduce()` — Reduce to One Value  
**Short Definition**:  
Processes all elements and returns **single value** (like sum, total, etc.)

🧠 **Key Points**:
- Takes **accumulator** and current value
- Can be used for sum, max, flatten, etc.
- Initial value optional but recommended

`reduce()` array ke **saare elements ko mila kar** ek hi value banata hai (total, average, string join, etc.)

---

### 🔸 Simple Example 1: Sum of Numbers
```js
let numbers = [1, 2, 3, 4];

let total = numbers.reduce((acc, curr) => acc + curr, 0);

console.log(total); // 10
```

---

### 🧠 What’s Happening (Dry Run):

| Step | acc (Accumulator) | curr (Current value) | acc + curr |
|------|--------------------|----------------------|-------------|
| 1    | 0 (initial value)  | 1                    | 1           |
| 2    | 1                  | 2                    | 3           |
| 3    | 3                  | 3                    | 6           |
| 4    | 6                  | 4                    | 10          |

🔁 Final `acc` = **10**

---

### 📘
`reduce()` har element ko uthata hai, aur pehle wale result (accumulator) ke saath combine karta hai.  
Start 0 se kiya, phir 1+2+3+4 = 10 mil gaya.

---

### 🔸 Example 2: Multiply All Numbers
```js
let nums = [2, 3, 4];

let product = nums.reduce((acc, curr) => acc * curr, 1);

console.log(product); // 24
```

🧠 2 * 3 = 6 → 6 * 4 = 24

---

### 🔸 Example 3: Reduce Without Initial Value
```js
let nums = [5, 10, 15];

let total = nums.reduce((acc, curr) => acc + curr);

console.log(total); // 30
```

✅ JS automatically uses `5` as first `acc`, then starts from 10.

---

### 🔸 Real-World Example: Count Total Price
```js
let cart = [
  { item: "Book", price: 200 },
  { item: "Pen", price: 50 },
  { item: "Bag", price: 500 }
];

let total = cart.reduce((acc, product) => acc + product.price, 0);

console.log(total); // 750
```

## ✅ startsWith() — Check Beginning of Strings

### 🔹 Short Definition:
The `startsWith()` method checks if a string **starts with a specific substring**.

---

### 🧠 Key Points:
- Returns `true` or `false`
- Case-sensitive
- Often used in filtering or validation

---

### 🔸 Syntax:
```js
string.startsWith(searchString, position)
```
- `searchString`: The text to check
- `position` (optional): Where to start checking (default is 0)

---

### 🔍 Examples:

#### ✅ Basic Use:
```js
let word = "JavaScript";
console.log(word.startsWith("Java"));  // true
console.log(word.startsWith("java"));  // false (case-sensitive)
```

#### ✅ Filtering with startsWith:
```js
let fruits = ["apple", "banana", "apricot", "cherry"];
let aFruits = fruits.filter(fruit => fruit.startsWith("a"));

console.log(aFruits);  // ["apple", "apricot"]
```

📌 `startsWith()` aksar `filter()` ke sath use hota hai to find items starting with a specific letter or word.

---



---


## 📝 Summary

| Reduce | Meaning                       | Roman Urdu                                |
|--------|-------------------------------|--------------------------------------------|
| `acc`  | Accumulator (result so far)   | Ab tak ka result                           |
| `curr` | Current element in loop       | Is waqt ka item                            |
| `0`    | Starting value                | Shuruaat ka point (zaroori for safety)     |
| Output | One final value               | Aik final answer (total, string, array)    |

---

### ✅ `forEach()` — Loop Over Array  
**Short Definition**:  
Executes a function on **each element**, but does **not return anything**.

🧠 **Key Points**:
- No return (undefined)
- Only used for **side effects** (like console.log, update UI)
- Doesn't chain like `map`

🔸 Example:
```js
[1, 2, 3].forEach(n => console.log(n));
// Output: 1 2 3
```

📌ForEach sirf har element pe code chalata hai — koi naya array ya value return nahi karta.

---

## 📚 Quick Comparison Summary:

| Method     | Returns         | Changes Original? | Use For              |
|------------|------------------|--------------------|-----------------------|
| `map()`    | New array        | ❌ No              | Transform values      |
| `filter()` | New array        | ❌ No              | Select some values    |
| `find()`   | First match      | ❌ No              | Find one item         |
| `sort()`   | Same array       | ✅ Yes             | Sorting values        |
| `reduce()` | Single value     | ❌ No              | Total / combine       |
| `forEach()`| `undefined`      | ❌ No              | Loop with side effects|
| startsWith()  | String ke start ko check karta hai | `true`/`false` |

---



# ✅ Arrow Functions (`=>`) — Array Methods

## 🧠 What is an Arrow Function?
Arrow function is a **shorter syntax** to write functions in JavaScript. Introduced in ES6.

### 🔸 Syntax:
```js
const functionName = (parameters) => {
  // code
};
```

Or even shorter if only one expression:
```js
const add = (a, b) => a + b; // implicit return
```

## ✅ Differences: Arrow Function vs Regular Function

| Feature                  | Arrow Function         | Regular Function      |
|--------------------------|------------------------|------------------------|
| `this` context           | 🔒 Lexical (inherits from parent) | ✅ New `this` context |
| Syntax                   | Short & clean          | Longer                |
| Constructor (with `new`) | ❌ Not allowed          | ✅ Yes                 |
| Hoisting                | ❌ No (must be defined before use) | ✅ Yes (hoisted)    |

---

## ✅ Examples: Arrow in Action with Array Methods

---

### 🔹 Using `map()` with Arrow Function

```js
let numbers = [1, 2, 3];
let squares = numbers.map(n => n * n);
console.log(squares); // [1, 4, 9]
```

### 🔍 Dry Run:
- `n = 1` → `1 * 1 = 1`
- `n = 2` → `2 * 2 = 4`
- `n = 3` → `3 * 3 = 9`

🔁 **New array:** `[1, 4, 9]`

📝 Har element ko square kar ke new array ban gaya.

---

### 🔹 `filter()` with Arrow Function

```js
let ages = [16, 18, 20];
let adults = ages.filter(age => age >= 18);
console.log(adults); // [18, 20]
```

### 🔍 Dry Run:
- `age = 16` ❌ (skip)
- `age = 18` ✅
- `age = 20` ✅

🔁 **New array:** `[18, 20]`

---

### 🔹 `find()` with Arrow Function

```js
let users = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Sara" },
];

let user = users.find(u => u.name === "Sara");
console.log(user); // { id: 2, name: "Sara" }
```

### 🔍 Dry Run:
- First user: name is `"Ali"` ❌
- Second user: name is `"Sara"` ✅ → return that user

🔁 **Found:** `{ id: 2, name: "Sara" }`

---

### 🔹 `sort()` with Arrow Function

```js
let nums = [30, 2, 100];
nums.sort((a, b) => a - b);
console.log(nums); // [2, 30, 100]
```

### 🔍 Dry Run:
- Compare 30 and 2 → `30 - 2 = 28` → positive → swap
- Compare 2 and 100 → `2 - 100 = -98` → negative → no swap
- Keep comparing until sorted

---

## ✅ Arrow Function Examples with Parameters

### ➤ No parameter:
```js
let greet = () => console.log("Hello!");
greet();
```

### ➤ One parameter:
```js
let double = x => x * 2;
console.log(double(5)); // 10
```

### ➤ Multiple parameters:
```js
let add = (a, b) => a + b;
console.log(add(3, 4)); // 7
```

---

## 🚫 When **NOT** to Use Arrow Functions

### 1. **When you need `this` keyword:**
Arrow functions don’t have their own `this`.

```js
const obj = {
  name: "Ali",
  sayHi: function () {
    console.log(this.name); // works
  },
  sayHiArrow: () => {
    console.log(this.name); // undefined
  }
};
obj.sayHi();       // Ali
obj.sayHiArrow();  // undefined ❌
```

### 2. **As a constructor**:
```js
let Person = (name) => {
  this.name = name;
};
let p = new Person("Sara"); // ❌ TypeError
```

---

## 📌 Summary Table for Arrow Functions

| Feature             | Description                            |
|---------------------|----------------------------------------|
| Short Syntax        | Cleaner code for small functions       |
| No `this` binding   | Inherits from outer scope              |
| No `arguments` obj  | Use rest operator `(...args)` instead  |
| Best Used In        | Callbacks (map, filter, etc.), 1-liners|
| Not for             | Methods, constructors, `this`-dependent|




## 🚀 **What is Git & GitHub?**

- **Git** is a **version control system** – it tracks your code and its changes over time.
- **GitHub** is a **cloud platform** to host your Git repositories and collaborate with others.

---

## 🛠️ **Git Installation**

Install Git from: [https://git-scm.com](https://git-scm.com)

After installing, verify with:

```bash
git --version
```

---

## ⚙️ **Git Configuration (Very Important)**

Set your user info (only once):

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

View your configuration:

```bash
git config --list
```

Edit global config:

```bash
git config --global -e
```

🧠 _Tip: Ye step zaroori hai warna Git ko pata nahi chalega ke commits kisne kiye._

---

## 🗂️ **Making a Folder a Git Project**

Initialize Git in your folder:

```bash
git init
```

Now your folder is a **Git repository**.

---

## 📶 **Git File Stages Explained Simply**

### File States:

1. **Untracked (U)**  
   Git doesn't know this file exists yet.  
   _“File ko Git abhi track nahi kar raha.”_

2. **Staged (A)**  
   File is added, ready to be committed.  
   _“File Git ke pass hai, ready to save.”_

3. **Committed (C)**  
   File is saved permanently in Git history.  
   _“Ab file track ho gayi aur Git ke records me hai.”_

---

## 🔁 **Git Commands Flow**

### 1. Check status:
```bash
git status
```

### 2. Add file to staging:
```bash
git add filename
# OR add all:
git add .
```

### 3. Commit your changes:
```bash
git commit -m "Your message"
```

---

## 🧾 **Check History**

View commit logs:
```bash
git log
```

Short version:
```bash
git log --oneline
```

Graphical view:
```bash
git log --oneline --graph
```

🧠 _Tip: Ye commands help karti hain aapko track rakhne me ke aap ne kya-kya change kiya kab._

---

## 🛑 **Reset Commands (Undo Changes)**

### Reset to previous commit:
```bash
git reset --hard HEAD~1
```

_“Ek step peeche chale jao, jaise undo.”_

---

## 🌿 **Working with Branches**

Create and switch to a new branch:
```bash
git switch -C new-branch
```

Check all branches:
```bash
git branch
```

Merge branches into main:
```bash
git merge branch-name
```

🧠 **Merge Types:**
1. **Fast-forward merge** – simple merge if no conflict.
2. **3-way merge** – if both branches had different changes.
3. **Recursive merge** – for complex scenarios.

---

## 🗃️ **Stashing (Save Unfinished Work Temporarily)**

### Save your work:
```bash
git stash
```

### Bring it back:
```bash
git stash apply
```

### Delete all stashed:
```bash
git stash clear
```

_“Temporary draft samajh lo – na delete hoti na add hoti.”_

---

## 🌐 **GitHub Collaboration (Team Work)**

### Add remote GitHub repo:
```bash
git remote add origin https://github.com/user/repo.git
```

### Push code to GitHub:
```bash
git push -u origin main
```

If on a different branch:
```bash
git push -u origin branch-name
```

---

## 🤝 **Second User / Team Member Commands**

First fetch latest data:
```bash
git fetch
```

Then merge it:
```bash
git merge origin/main
```

OR just pull (fetch + merge in one):
```bash
git pull
```

---

## ✅ Summary Cheatsheet:

| Command | Use |
|--------|------|
| `git init` | Start Git in a folder |
| `git add .` | Stage all changes |
| `git commit -m ""` | Save with message |
| `git status` | Check file states |
| `git log` | Show commit history |
| `git reset --hard HEAD~1` | Undo last commit |
| `git stash` | Save draft |
| `git push origin main` | Upload code to GitHub |
| `git pull` | Download changes from GitHub |

---

## 📚 Learn Git Like a Story:

Imagine Git as a **notebook** 📒:
- You write drafts (Untracked),
- You mark it for finalization (Staged),
- Then you publish (Commit),
- You can go back in time (Reset),
- And share with friends (GitHub Push).



# 🧠 **Git & GitHub Cheatsheet**  
✨ _All essential commands with explanation_

---

## 🛠️ **Setup (One-time)**

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --list           # Show current config
git config --global -e      # Edit global config
```
🗣️ _Git ko batate ho ke commits kis user ne kiye._

---

## 🚀 **Starting a New Project**

```bash
git init                    # Initialize Git in a folder
git clone <repo-URL>       # Copy repo from GitHub
```
🗣️ _`init` local project start karta hai, `clone` GitHub se copy karta hai._

---

## 🔍 **Checking Status & History**

```bash
git status                 # See file stages (U, M, etc.)
git log                    # Full commit history
git log --oneline          # Short version
git log --oneline --graph  # Tree structure of commits
```

---

## 🔄 **Staging and Committing**

```bash
git add filename           # Stage specific file
git add .                  # Stage all files
git commit -m "Message"    # Commit with message
```
🗣️ _`add` file ko staging area me laata hai, `commit` usko Git me save karta hai._

---

## 🔄 **Reset (Undo Changes)**

```bash
git reset HEAD filename         # Unstage a file
git reset --soft HEAD~1         # Undo last commit (keep changes)
git reset --mixed HEAD~1        # Undo commit + unstage
git reset --hard HEAD~1         # Completely undo + delete changes
```

🧠 _HEAD~1 means 1 commit back._

---

## 🌿 **Branches**

```bash
git branch                    # List branches
git branch new-branch         # Create branch
git switch new-branch         # Switch to branch
git switch -C branch-name     # Create + switch
```

🗣️ _Branch: Project ka alternate version. Testing or new feature ke liye._

---

## 🔀 **Merging Branches**

```bash
git merge branch-name         # Merge branch into current one
```

🧠 **Merge Types:**
- **Fast-forward**: Straight merge
- **3-way**: Common in diverged branches

---

## 📦 **Stashing (Save Work Temporarily)**

```bash
git stash                     # Save current changes
git stash apply               # Apply stashed changes
git stash clear               # Remove all stashes
```
🗣️ _Temporary draft jese, na commit hota na delete._

---

## 📤 **Push to GitHub**

```bash
git remote add origin <URL>   # Link local repo to GitHub
git push -u origin main       # Push main branch
git push                      # Push changes
```

---

## 📥 **Pull / Fetch Changes**

```bash
git fetch                     # Fetch from GitHub (not merge)
git pull                      # Fetch + merge changes
```

🗣️ _Pull = Update project from GitHub_

---

## 🤝 **Collaborating**

### First time:

```bash
git clone <repo-url>
```

### Regular:

```bash
git pull                 # Get latest updates
git add .
git commit -m "update"
git push
```

---

### 🧠 Centralized vs Distributed VCS
| Type | Description | Apni Zuban main |
|------|-------------|------------|
| Centralized | One central server — sab log wahi se code lete hain aur wahi par save karte hain. | Aik hi jagah sab ka data hota hai |
| Distributed | Har developer ke paas apna full copy hoti hai — offline bhi kaam possible. | Har user ke paas apna version hota hai |

🔸 Git is a **distributed VCS** — so you can work **offline**, then sync later.

---

### 🔐 Authenticating with GitHub (CLI)
If you're pushing code to GitHub for the first time:

1. Generate a **personal access token (PAT)** from [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Use that token **instead of your password** when prompted during `git push`.

🔐 Example:
```
Username: your_github_username  
Password: your_token_here (paste PAT)
```

🗣️ GitHub ab passwords allow nahi karta, token se secure access hota hai.

---

### 🔁 What is a Pull Request (PR)?
Pull Request = When you request changes from your branch to be merged into another branch (usually `main`) on GitHub.

- Used in team projects
- Helps in **code review**, discussion, and approval
- Created through **GitHub UI**, not terminal

🧠 Think of PR as: *"Hey, can you check and accept my changes into the main project?"*

---

### ⚔️ What is a Merge Conflict?
Merge conflict happens when:
- Two branches **change the same part** of a file
- Git doesn’t know which change to keep

🔍 How to fix it?
1. Git shows the file with both changes:
```diff
<<<<<<< HEAD
This is your version
=======
This is their version
>>>>>>> other-branch
```
2. You edit manually to resolve.
3. Then commit again:
```bash
git add filename
git commit -m "Resolved merge conflict"
```

📌 Conflict = Jab 2 log same line ko badalte hain. Manual decision lena padta hai.

---



## 🔐 **Helpful Shortcuts**

| Command                     | Meaning |
|----------------------------|---------|
| `git init`                 | Start Git repo |
| `git status`               | Check file status |
| `git add .`                | Stage all changes |
| `git commit -m "msg"`     | Commit with message |
| `git log`                  | Show history |
| `git reset --hard HEAD~1` | Undo last commit |
| `git switch branch`        | Change branch |
| `git stash`                | Save temp work |
| `git push`                 | Upload to GitHub |
| `git pull`                 | Download updates |

---



## 📝 **Pro Tip**  
"Jab bhi commit karo, clear message likho — future me samajh aaye ke kiya kiya tha."
