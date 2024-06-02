// Ngambil elemen form
const formulir = document.querySelector("form");

// // Bikin trigger event submit pada elemen form
formulir.addEventListener("submit", (e) => {
  e.preventDefault();
  kirim();
});

function kirim() {
  // Ngambil elemen input
  const elemen_nama = document.querySelector("#nama");
  const elemen_nidn = document.querySelector("#nidn");

  // Ngambil value (nidn) dari elemen input
  const id = elemen_nama.dataset.id;
  const nama = elemen_nama.value;
  const nidn = elemen_nidn.value;

  // Ngecek apakah harus POST atau PUT
  if (id == "") {
    // Tambah catatan
    axios
      .post("https://dosen-jmw7ojw7cq-et.a.run.app/dosen", {
        nama,
        nidn,
      })
      .then(() => {
        // bersihin formnya
        elemen_nama.dataset.id = "";
        elemen_nama.value = "";
        elemen_nidn.value = "";

        // manggil fungsi get catatan biar datanya di-refresh
        getCatatan();
      })
      .catch((error) => console.log(error.message));
  } else {
    axios
      .put(`https://dosen-jmw7ojw7cq-et.a.run.app/dosen/${id}`, {
        nama,
        nidn,
      })
      .then(() => {
        // bersihin formnya
        elemen_nama.dataset.id = "";
        elemen_nama.value = "";
        elemen_nidn.value = "";

        // manggil fungsi get catatan biar datanya direfresh
        getCatatan();
      })
      .catch((error) => console.log(error));
  }
}

// Ngambil catatan
function getCatatan() {
  axios
    .get("https://dosen-jmw7ojw7cq-et.a.run.app/dosen")
    .then(({ data }) => {
      const table = document.querySelector("#table-dosen");
      const { data: dosen } = data;
      let tampilan = "";
      let no = 1;

      for (const dos of dosen) {
        tampilan += tampilkanCatatan(no, dos);
        no++;
      }
      table.innerHTML = tampilan;

      hapusCatatan();
      editCatatan();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function tampilkanCatatan(no, dosen) {
  return `
    <tr>
      <td>${no}</td>
      <td class="nama">${dosen.nama}</td>
      <td class="nidn">${dosen.nidn}</td>
      <td><button data-id=${dosen.id} class='btn-edit'>Edit</button></td>
      <td><button data-id=${dosen.id} class='btn-hapus'>Hapus</button></td>
    </tr>
  `;
}

function hapusCatatan() {
  const kumpulan_tombol_hapus = document.querySelectorAll(".btn-hapus");

  kumpulan_tombol_hapus.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      axios
        .delete(`https://dosen-jmw7ojw7cq-et.a.run.app/dosen/${id}`)
        .then(() => getCatatan())
        .catch((error) => console.log(error));
    });
  });
}

function editCatatan() {
  const kumpulan_tombol_edit = document.querySelectorAll(".btn-edit");

  kumpulan_tombol_edit.forEach((tombol_edit) => {
    tombol_edit.addEventListener("click", () => {
      const id = tombol_edit.dataset.id;
      const nama =
        tombol_edit.parentElement.parentElement.querySelector(
          ".nama"
        ).innerText;
      const nidn =
        tombol_edit.parentElement.parentElement.querySelector(
          ".nidn"
        ).innerText;

      // Ngambil elemen input
      const elemen_nama = document.querySelector("#nama");
      const elemen_nidn = document.querySelector("#nidn");

      elemen_nama.dataset.id = id;
      elemen_nama.value = nama;
      elemen_nidn.value = nidn;
    });
  });
}

getCatatan();
