console.log("Bismillah Kita Belajar Javascript DOM");

// Aktivitas DOM SELECTION
// Penjelasan kita harus menyeleksi atau "meangkap"
// Mengambil Elemen HTML berdasarkan ID/Class


// 1. Mengambil Elemen Judul & Sub judul
// getElementById > seleksi berdasarkan Id
const judulUtama = document.getElementById("judul-utama");

// 1.1 Mengambil Eelemen Sub judul
// querySelector(#...)
const subJudul = document.querySelector("#sub-judul");

// 2. Mengambil elemen padan kartu 1 (Kartu Manipulasi Teks & Style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi= document.getElementById("card-manipulasi");

// 3. Mengambil Elemen Tombol-Tombol Aksi pada kartu 1
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. Mengambil Elemen papa kartu 2 (fitur catatan dinamis / totolist sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumalahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");



// Aktivitas 2 manipulasi teks & style
// addEventListener("click", function(...){...})
btnUbahTeks.addEventListener("click", function() {
    // .innerText = mengganti atau mengisi tulisan teks yang ada di HTML
    teksPreview.innerText = "Hebat Text ini berhasil diubah melalui DOM!";

    // .style.color = Mengubah warna teks secara langsung  melalui Javascipt
    teksPreview.style.color = "#1f1d97"

    // console.log mencetak pesan di console
    console.log("DOM Text Preview telah diperbaharui");
});


// B -- Manipulasi Class Css Menggunakan ClassListTogg()
btnToggleWarna.addEventListener("click", function() {
// .classList.toggle = Fitur untuk saklar otomatis
boxPreview.classList.toggle("active-mode");
cardManipulasi.classList.toggle("highlight");

console.log("DOM Class Highlight berhasil di switch");
});


// Mengembalikan (Reset) Teks & Style ke kondisi semula
btnReset.addEventListener("click", function() {
// 1. Kembalikan tulisan teks ke aslinya
teksPreview.innerText = "Halo! Teks ini siap di ubah oleh Javascript";

// 2. Kosongkan Warna inline style (style.color = "") agar balik ke css bawaan
teksPreview.classList.remove("active-mode");
cardManipulasi.classList.remove("highlight");

console.log("DOM Tampilan direset");
});

// Aktivitas 3 & 4; elemen dinamis & even handling (TO DO LIST)
// Penjelasan 
// bagian ini kita bakal belajar buat elemen HTML LI secara otomatis
// mengisi teks nya, memberi tombol hapus lalu menenpelkan kedalam layar <ul>

// Langkah 1: Variabel Penampung Angka jumlah catatan
// 'let' digunakan karena nilai variabel yang akan berubah ubah
let totalCatatan = 0;


// Langkah 2: Membuat Function supaya update Angka Counter & pesan status
// Fungsi ini kumpulan perintah yang diberi nama. kita bisa panggil kapan saja
function perbaruiJumlah() {
    // Masukan angka total  catatan terbaru ke dalam tag < sapan id="jumlah-catatan">
    jumalahCatatan.innerText = totalCatatan;

    // Periksa kondisi: apakah catatan 0?
    if (totalCatatan === 0) {
        // Jika 0: hapus class "hidden" supaya teks "belum ada catatan" muncul ke layar
        pesanKosong.classList.remove("hidden");
    } else {
        // jika > 0 : tambahkan class "hidden" agar teks "belum ada catatan" sembunyi/hilang
        pesanKosong.classList.add("hidden");
    }
}

// Langkah 3: Function tambah catatan utama logika
function tambahCatatan() {
    // 3.1 input catatan value = mengambil teks yang diketik oleh user di kolom input
    // .trim() = untuk menghapus spasi diawal dan spasi di akhir
    const isiText = inputCatatan.value.trim();

    // 3.2 Validasi input :  Jika isi teks kosong tampilkan peringatan berupa alert
    if (isiText === "") {
        alert("Catatan tidak boleh kosong!");
    }

    // 3.3 documen .create.Element("li") = membuat tag html <li> baru secara  dinamis pakai Javascript
    const liBaru = document.createElement("li");
    liBaru.className = "note-item";


    // 3.4 .innerHTML = mengisi struktur didalam <li> dengan teks catatan & tombol "hapus"
    // tanda backtick
    liBaru.innerHTML= `<span>${isiText}</span> <button class="btn-hapus">Hapus</button>`;

// 3.5 Menambahkan event Listener khusus tombol "hapus" pada item <li>
// liBaru.querySelector(".btn-hapus") mengambil berdasarkan class 'btn-hapus'
const btnHapus = liBaru.querySelector(".btn-hapus");
btnHapus.addEventListener("click", function(){
    liBaru.remove();
    totalCatatan--;
    perbaruiJumlah();
    console.log(`[DOM] Catatan "$(isiText)" dihapus`);

});

// 3.6 .appendChild (libaru) = menempelkan elemen ,li> dalam wadah <ul id="daftar=catatan">
daftarCatatan.appendChild(liBaru);

//3.7 mengosongkan kembali isi kolom inpu  agar siap diketik lagi
  inputCatatan.value = "";

 //3.8 TotalCatatan++ increment total catatan ditambah 1x
  totalCatatan++;
  perbaruiJumlah();
  console.log(`[DOM] Catatan Baru ditambahkan : ${isiText}`);
}

// langkah 4: event listener klik tombol +tambah
// ketika klik tombol + tambah jalnankan fungsi tambahCatatan()
    btnTambah.addEventListener("click", function(){
    tambahCatatan();
});

// langkah 5: ebent listener tombol "Enter" (menggunakan keyboard)
// ketika user mengetik dikolom input dan melepas tombol > (event : keyup)
inputCatatan.addEventListener("keyup", function(event) {
    //periksa apakah tombol keyboard yang ditekan adalah tombol enter?
    if(event.key === "Enter") {
        tambahCatatan();
    }
});