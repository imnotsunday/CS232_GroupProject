const softSelect = document.getElementById("softSkillSelect");
    const hardSelect = document.getElementById("hardSkillSelect");
    const softTags = document.getElementById("softSkillTags");
    const hardTags = document.getElementById("hardSkillTags");

    function addTag(select, container) {
      const value = select.value;
      if (!value) return;

      const exists = Array.from(container.children).some(tag => tag.dataset.value === value);
      if (exists) return;

      const tag = document.createElement("div");
      tag.className = "tag";
      tag.dataset.value = value;
      tag.innerHTML = `${value} <span onclick="this.parentElement.remove()">×</span>`;
      container.appendChild(tag);

      select.value = "";
    }

    softSelect.addEventListener("change", () => addTag(softSelect, softTags));
    hardSelect.addEventListener("change", () => addTag(hardSelect, hardTags));

    document.getElementById("activityForm").addEventListener("submit", function(e) {
      e.preventDefault();
      // ส่งข้อมูลที่จำเป็นต่อไป เช่น บันทึกลงฐานข้อมูล
      alert("ข้อมูลกิจกรรมถูกบันทึก (ตัวอย่าง)");
    });

function previewImages(event) {
  const files = event.target.files;
  const container = document.getElementById('preview-container');
  
  Array.from(files).forEach(file => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.maxWidth = '400px';
    img.style.maxHeight = '400px';
    img.style.border = '1px solid #ccc';
    img.style.borderRadius = '8px';
    img.style.objectFit = 'cover';
    container.appendChild(img);
  });
}