const studentId = localStorage.getItem("studentId");
const studentName = localStorage.getItem("studentName") || "-";

document.getElementById("studentId").textContent = studentId || "-";
document.getElementById("studentName").textContent = studentName || "-";

const apiBase = "https://xno3svh895.execute-api.us-east-1.amazonaws.com/prod";

async function loadAndRender() {
  try {
    const res = await fetch(`${apiBase}/activities/${studentId}`);
    const data = await res.json();
    const activities = JSON.parse(data.body || "[]");

    const count = { Education: 0, Leadership: 0, Volunteer: 0 };
    activities.forEach(act => {
      if (count[act.type] !== undefined) {
        count[act.type]++;
      }
    });

    document.getElementById("countEducation").textContent = count.Education;
    document.getElementById("countLeadership").textContent = count.Leadership;
    document.getElementById("countVolunteer").textContent = count.Volunteer;

    const total = count.Education + count.Leadership + count.Volunteer;
    const percent = total === 0 ? [0, 0, 0] : [
      (count.Education / total * 100).toFixed(1),
      (count.Leadership / total * 100).toFixed(1),
      (count.Volunteer / total * 100).toFixed(1),
    ];

    new Chart(document.getElementById("pieChart"), {
      type: "pie",
      data: {
        labels: ["Education", "Leadership", "Volunteer"],
        datasets: [{
          data: percent,
          backgroundColor: ["#5AD1D1", "#4DA6FF", "#2B7AA8"]
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.parsed}%`
            }
          }
        }
      }
    });

  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการโหลดกิจกรรม:", err);
  }
}

loadAndRender();
