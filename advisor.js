const apiBase = "https://xno3svh895.execute-api.us-east-1.amazonaws.com/prod";

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
      const countByType = { Education: 0, Leadership: 0, Volunteer: 0 };

      (student.activities || []).forEach(act => {
        if (countByType[act.type] !== undefined) {
          countByType[act.type]++;
        }
      });

      const div = document.createElement("div");
      div.className = "student-card";
      div.innerHTML = `
        <h3>${student.name} (${student.studentId})</h3>
        <p>กิจกรรมทั้งหมด: <strong>${student.totalActivities || 0}</strong></p>
        <p>
          📘 Education: ${countByType.Education} |
          🧠 Leadership: ${countByType.Leadership} |
          ❤️ Volunteer: ${countByType.Volunteer}
        </p>
      `;
      studentListDiv.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading advisor data:", err);
    studentListDiv.innerHTML = "<p>เกิดข้อผิดพลาดจากระบบ</p>";
  }
}

loadAdvisorSummary();
