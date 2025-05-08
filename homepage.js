const studentId = localStorage.getItem("studentId");
const studentName = localStorage.getItem("studentName") || "";

document.getElementById("studentId").textContent = studentId || "-";
document.getElementById("studentName").textContent = studentName || "-";

if (!studentId) {
  alert("กรุณาเข้าสู่ระบบใหม่");
  window.location.href = "login.html";
}

const apiBase = "https://xno3svh895.execute-api.us-east-1.amazonaws.com/prod";

async function loadActivities() {
  try {
    const res = await fetch(`${apiBase}/activities/${studentId}`);
    const activities = await res.json();

    const categories = {
      "Education": document.getElementById("Education"),
      "Leadership": document.getElementById("Leadership"),
      "Volunteer": document.getElementById("Volunteer")
    };

    Object.values(categories).forEach(container => container.innerHTML = "");

    activities.forEach(act => {
      const container = categories[act.type];
      if (container) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="https://via.placeholder.com/80" alt="activity" />
          <div>
            <div><strong>name:</strong> ${act.name}</div>
            <div><strong>description:</strong> ${act.description || "-"}</div>
            <div><strong>date:</strong> ${act.date}</div>
          </div>
        `;
        container.appendChild(card);
      }
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
  }
}

loadActivities();

function toggleForm() {
    const form = document.getElementById("formContainer");
    form.style.display = form.style.display === "none" ? "block" : "none";
  }
  
  async function submitActivity() {
    const name = document.getElementById("actName").value.trim();
    const description = document.getElementById("actDesc").value.trim();
    const type = document.getElementById("actType").value;
    const date = document.getElementById("actDate").value;
  
    if (!name || !type || !date) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
  
    const payload = {
      studentId,
      name,
      description,
      type,
      date
    };
  
    try {
      const res = await fetch(`${apiBase}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
  
      if (res.ok) {
        alert("เพิ่มกิจกรรมสำเร็จ!");
        document.getElementById("formContainer").style.display = "none";
        loadActivities(); // โหลดใหม่
      } else {
        const data = await res.json();
        alert(data.message || "เกิดข้อผิดพลาดในการบันทึกกิจกรรม");
      }
    } catch (err) {
      console.error(err);
      alert("ไม่สามารถเชื่อมต่อกับระบบได้");
    }
  }
