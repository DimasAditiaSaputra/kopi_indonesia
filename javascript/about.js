let coffeeData = [];

// Fungsi untuk mengambil data
async function getData(url) {
  try {
    const response = await fetch(url.trim());
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    coffeeData = await response.json();
    console.log(coffeeData);
    cardKopi(coffeeData);
    setupSearch();
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

// Fungsi untuk membuat kartu kopi
function cardKopi(data) {
  const sectionAbout = document.getElementById("about");

  if (!sectionAbout) {
    console.error("Element with id 'about' not found.");
    return;
  }

  sectionAbout.innerHTML = data
    .map(
      (item) => `
        <div class="card-coffee" data-name="${item.name.toLowerCase()}">
          <h1>${item.name}</h1>
          <div class="img-class">
            <img src="${item.image_kopi}" alt="Image of ${item.name}" />
          </div>
          <div class="description">
            <p>${item.describe_singkat || "Deskripsi tidak tersedia."}</p>
          </div>
          <div class="button">
            <a href="${item.path_page_kopi}" class="detail">Detail</a>
          </div> 
        </div>
      `
    )
    .join("");
}

// Fungsi untuk menyiapkan pencarian
function setupSearch() {
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase().trim();

    // Filter data berdasarkan input pencarian
    const filteredData = coffeeData.filter((coffee) =>
      coffee.name.toLowerCase().includes(searchTerm)
    );

    // Tampilkan hasil pencarian
    cardKopi(filteredData);

    // Tampilkan pesan jika tidak ada hasil
    const sectionAbout = document.getElementById("about");
    if (filteredData.length === 0) {
      sectionAbout.innerHTML = `
        <div class="no-results">
          <p>Tidak ada kopi yang cocok dengan pencarian Anda.</p>
        </div>
      `;
    }
  });
}

// Panggil fungsi getData
getData("../dataKopiJson/dataKopiJson.json");
