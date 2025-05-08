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
  console.log("✅ Login API response:", result);  // 🟡 จุดสำคัญ

  if (res.ok && result.studentId) {
    localStorage.setItem("studentId", result.studentId);
    localStorage.setItem("studentName", result.name || "");
    window.location.href = result.studentId === "advisor" ? "advisor.html" : "homepage.html";
  } else {
    console.warn("⚠️ Failed login:", result);
    errorMsg.textContent = result.message || "เข้าสู่ระบบไม่สำเร็จ";
  }

} catch (err) {
  console.error("🔥 Fetch error:", err);
  errorMsg.textContent = "เกิดข้อผิดพลาดจากระบบ";
}
