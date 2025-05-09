const apiBase = "https://xno3svh895.execute-api.us-east-1.amazonaws.com/prod"; // Replace with your actual endpoint

async function loadAdvisorSummary() {
  const studentListDiv = document.getElementById("studentList");
  studentListDiv.innerHTML = "กำลังโหลดข้อมูล...";

  try {
    const res = await fetch(`${apiBase}/advisor/summary`);
    const raw = await res.json();

    const data = typeof raw.body === "string" ? JSON.parse(raw.body) : raw;

    if (!Array.isArray(data)) {
      studentListDiv.innerHTML = "<p>ไม่พบข้อมูล</p>";
      return;
    }

    studentListDiv.innerHTML = "";

    data.forEach(student => {
      const div = document.createElement("div");
      div.className = "student-card";
      div.innerHTML = `
        <h3>${student.name} (${student.studentId})</h3>
        <p>จำนวนกิจกรรมทั้งหมด: ${student.totalActivities || 0}</p>
        <ul class="activity-list">
          ${(student.activities || []).map(act => `<li>${act.name} (${act.type} - ${act.date})</li>`).join("")}
        </ul>
      `;
      studentListDiv.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading advisor data:", err);
    studentListDiv.innerHTML = "<p>เกิดข้อผิดพลาดจากระบบ</p>";
  }
}

// Load immediately
loadAdvisorSummary();