document.getElementById("searchInput").addEventListener("input", function() {
  const searchValue = this.value.toLowerCase();
  const rows = document.querySelectorAll("#productTable tr");

  rows.forEach(row => {
    const cells = row.getElementsByTagName("td");
    const name = cells[1].textContent.toLowerCase();
    const description = cells[2].textContent.toLowerCase();

    if (name.includes(searchValue) || description.includes(searchValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});