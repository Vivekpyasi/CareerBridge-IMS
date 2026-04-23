let currentRole = "student";
let generatedOTP = "";

// ===== ROLE SWITCH =====
function setRole(role) {
  currentRole = role;

  let input = document.getElementById("inputField");
  let password = document.getElementById("adminPassword");
  let otpField = document.getElementById("otpField");
  let verifyBtn = document.getElementById("verifyBtn");

  let buttons = document.querySelectorAll(".tabs button");

  buttons.forEach((btn) => btn.classList.remove("active"));

  if (role === "student") {
    buttons[0].classList.add("active");
    input.placeholder = "Student Email or Mobile";

    password.style.display = "none";
    otpField.style.display = "none";
    verifyBtn.style.display = "none";
  } else {
    buttons[1].classList.add("active");
    input.placeholder = "Admin Email";

    password.style.display = "block";
    otpField.style.display = "none";
    verifyBtn.style.display = "none";
  }
}

// ===== SEND OTP / LOGIN =====
function sendOTP() {
  let input = document.getElementById("inputField").value;
  let password = document.getElementById("adminPassword").value;
  let status = document.getElementById("statusBox");

  let otpField = document.getElementById("otpField");
  let verifyBtn = document.getElementById("verifyBtn");

  if (input === "") {
    status.innerHTML = "❌ Enter details";
    status.style.color = "red";
    return;
  }

  // ===== STUDENT OTP =====
  if (currentRole === "student") {
    generatedOTP = Math.floor(1000 + Math.random() * 9000);

    status.innerHTML = "📩 OTP Sent: " + generatedOTP; // demo ke liye
    status.style.color = "green";

    otpField.style.display = "block";
    verifyBtn.style.display = "block";
  }

  // ===== ADMIN LOGIN =====
  else {
    if (password === "") {
      status.innerHTML = "❌ Enter Password";
      status.style.color = "red";
      return;
    }

    if (input === "admin@gmail.com" && password === "1234") {
      status.innerHTML = "✅ Admin Login Success!";
      status.style.color = "green";

      localStorage.setItem("user", input);
      localStorage.setItem("role", "admin");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      status.innerHTML = "❌ Invalid Credentials";
      status.style.color = "red";
    }
  }
}

// ===== otp ko verify krne ke liye =====
function verifyOTP() {
  let enteredOTP = document.getElementById("otpField").value;
  let status = document.getElementById("statusBox");
  let input = document.getElementById("inputField").value;

  if (enteredOTP == generatedOTP) {
    status.innerHTML = "✅ OTP Verified!";
    status.style.color = "green";

    localStorage.setItem("user", input);
    localStorage.setItem("role", "student");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    status.innerHTML = "❌ Wrong OTP";
    status.style.color = "red";
  }
}

// ===== Dashboard ko check krne ke liye =====
if (window.location.pathname.includes("dashboard.html")) {
  let user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "index.html";
  } else {
    let username = document.getElementById("username");
    let welcome = document.getElementById("welcome");

    if (username) username.innerText = user;
    if (welcome) welcome.innerText = "Welcome, " + user + " 👋";
  }
}

// ===== PROFILE PAGE DATA =====
// ===== PROFILE DATA LOAD =====
if (window.location.pathname.includes("profile.html")) {
  window.onload = function () {
    let user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "index.html";
    } else {
      document.getElementById("userEmail").innerText = user;
      document.getElementById("userEmail2").innerText = user;

      let username = user.split("@")[0];
      document.getElementById("userName").innerText = username.toUpperCase();
    }
  };
}

// ===== TAB SWITCH =====
function showTab(tab) {
  document.querySelectorAll(".tab-content").forEach((el) => {
    el.classList.remove("active-tab");
  });

  document.getElementById(tab + "Section").classList.add("active-tab");

  document.querySelectorAll(".tabs span").forEach((btn) => {
    btn.classList.remove("active");
  });

  event.target.classList.add("active");
}

// ===== NAVIGATION =====
function goToDashboard() {
  window.location.href = "dashboard.html";
}

// ===== GO TO PROFILE =====
function goToProfile() {
  window.location.href = "profile.html";
}

// ===== LOGOUT =====
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
// ===== CARDS DETAILS =====
function openDetails(id){
  window.location.href = "details.html?course=" + id;
}
// const courses = {

//   aws: {
//     title:"AWS Gen AI",
//     tagline:"Accelerate your Career",
//     desc:"Learn machine learning, NLP and generative AI using AWS.",
//     modules:"Multiple Modules",
//     duration:"8 Weeks",
//     rating:"5 Ratings",
//     language:"English",
//     learners:"9.1k+"
//   },

//   google: {
//     title:"Google Gen AI",
//     tagline:"Build with Google AI",
//     desc:"Explore generative AI tools and models from Google.",
//     modules:"10 Modules",
//     duration:"10 Weeks",
//     rating:"4.5 Ratings",
//     language:"English",
//     learners:"7k+"
//   }

// };

// // 🔥 URL se id lo
// const params = new URLSearchParams(window.location.search);
// const id = params.get("course");

// // 🔥 data set karo
// const data = courses[id];

// document.getElementById("title").innerText = data.title;
// document.getElementById("tagline").innerText = data.tagline;
// document.getElementById("desc").innerText = data.desc;
// document.getElementById("modules").innerText = data.modules;
// document.getElementById("duration").innerText = data.duration;
// document.getElementById("rating").innerText = data.rating;
// document.getElementById("language").innerText = data.language;
// document.getElementById("learners").innerText = data.learners;

