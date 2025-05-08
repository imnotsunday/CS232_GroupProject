async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");
  
    if (!username || !password) {
      errorMsg.textContent = "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน";
      return;
    }
  

    if (username === "advisor" && password === "advisor") {
      localStorage.setItem("studentId", "advisor");
      localStorage.setItem("studentName", "advisor");
      window.location.href = "../HTML/advisor.html";
      return; 
    }
  
  
    try {
      const res = await fetch("https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
  
      const result = await res.json();
  
      if (res.ok && result.studentId) {
        localStorage.setItem("studentId", result.studentId);
        localStorage.setItem("studentName", result.name || "");
        window.location.href = "homepage.html";
      } else {
        errorMsg.textContent = result.message || "เข้าสู่ระบบไม่สำเร็จ";
      }
  
    } catch (err) {
      console.error(err);
      errorMsg.textContent = "เกิดข้อผิดพลาดจากระบบ";
    }
  }
  