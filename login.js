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
    window.location.href = "advisor.html";
    return;
  }

  try {
    const res = await fetch("https://xno3svh895.execute-api.us-east-1.amazonaws.com/prod/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const result = await res.json();
    const data = typeof result.body === "string" ? JSON.parse(result.body) : result.body;
    console.log("✅ Login data:", data);
    
    if (res.ok && data.studentId) {
      localStorage.setItem("studentId", data.studentId);
      localStorage.setItem("studentName", data.name || "");
      window.location.href = data.studentId === "advisor" ? "advisor.html" : "homepage.html";
    } else {
      console.warn("⚠️ Failed login:", result);
      errorMsg.textContent = result.message || "เข้าสู่ระบบไม่สำเร็จ";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    errorMsg.textContent = "เกิดข้อผิดพลาดจากระบบ";
  }
}

window.login = login;
