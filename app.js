/* BundaCare app.js - UI interactions only*/

function tab(btn, target) { // fungsi untuk switch tab, btn adalah tombol yang diklik, target adalah id konten yang ingin ditampilkan
  const parent = btn.closest('[data-tabs]') || btn.parentElement.parentElement;
  parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const section = btn.closest('section') || document;
  section.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const el = section.getElementById ? section.getElementById(target) : document.getElementById(target);
  if (el) el.classList.add('active');
}

function tog(el) { el.classList.toggle('on'); } // fungsi untuk toggle class 'on' pada elemen

function qty(btn, d) { // fungsi untuk mengubah quantity, btn adalah tombol yang diklik, d adalah perubahan (1 atau -1)
  const v = btn.parentElement.querySelector('.qv');
  if (v) v.textContent = Math.max(1, +v.textContent + d);
}

function selSize(el) { // fungsi untuk memilih ukuran, el adalah elemen yang diklik
  el.closest('.sg').querySelectorAll('.sb').forEach(b => b.classList.remove('sel'));
  el.classList.add('sel');
}

function selPay(el) { // fungsi untuk memilih metode pembayaran, el adalah elemen yang diklik
  el.closest('.pay-group').querySelectorAll('.po').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel');
}

function like(btn) { // fungsi untuk like/unlike, btn adalah tombol like yang diklik
  btn.classList.toggle('liked');
  const n = btn.querySelector('.lc');
  if (n) n.textContent = +n.textContent + (btn.classList.contains('liked') ? 1 : -1);
  if (btn.classList.contains('liked')) btn.style.color = '#ec4899';
  else btn.style.color = '';
}

function toast(msg) { // fungsi untuk menampilkan toast message, msg adalah pesan yang ingin ditampilkan
  const t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('span').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2500);
}

function openModal(id)  { const m = document.getElementById(id); if(m) m.classList.add('show'); } // fungsi untuk membuka modal, id adalah id dari modal yang ingin dibuka
function closeModal(id) { const m = document.getElementById(id); if(m) m.classList.remove('show'); } // fungsi untuk menutup modal, id adalah id dari modal yang ingin ditutup
document.addEventListener('click', e => { // event listener untuk menutup modal saat mengklik di luar konten modal
  if (e.target.classList.contains('modal')) e.target.classList.remove('show');
});

function calcHpht(input) { // fungsi untuk menghitung HPHT, input adalah elemen input tanggal HPHT
  if (!input.value) return; // jika input kosong, tidak melakukan apa-apa
  const h = new Date(input.value); // membuat objek Date dari nilai input
  const d = Math.floor((new Date() - h) / 86400000); // menghitung selisih hari antara tanggal sekarang dan HPHT
  const w = Math.min(40, Math.max(0, Math.floor(d / 7))); // menghitung minggu keberapa kehamilan, dibatasi antara 0 dan 40
  const hpl = new Date(+h + 280 * 86400000); // menghitung HPL dengan menambahkan 280 hari ke HPHT
  const el_hw = document.getElementById('hw'); // mencari elemen dengan id 'hw' untuk menampilkan usia kehamilan
  const el_hd = document.getElementById('hd'); // mencari elemen dengan id 'hd' untuk menampilkan HPL
  const el_hr = document.getElementById('hr'); // mencari elemen dengan id 'hr' untuk menampilkan hasil perhitungan
  if (el_hw) el_hw.textContent = w + ' minggu ' + (d % 7) + ' hari'; // menampilkan usia kehamilan dalam format "X minggu Y hari"
  if (el_hd) el_hd.textContent = hpl.toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }); // menampilkan HPL dalam format tanggal Indonesia
  if (el_hr) el_hr.style.display = 'block'; // menampilkan hasil perhitungan jika elemen hasil perhitungan ada
}

let obI = 0; // variabel global untuk menyimpan indeks slide onboarding saat ini
function obNext() { // fungsi untuk melanjutkan ke slide onboarding berikutnya (tidak terpakai)
  const slides = document.querySelectorAll('.ob-slide');
  const dots   = document.querySelectorAll('.ob-dot');
  if (!slides.length) return;
  slides[obI].classList.remove('active');
  dots[obI]?.classList.remove('active');
  obI = Math.min(obI + 1, slides.length - 1);
  slides[obI].classList.add('active');
  dots[obI]?.classList.add('active');
  const btn = document.getElementById('ob-btn');
  if (obI === slides.length - 1 && btn) {
    btn.textContent = 'Mulai';
    btn.onclick = () => window.location.href = '../user/dashboard.html';
  }
}

function startTimer(elId, seconds) { // fungsi untuk memulai timer countdown, elId adalah id elemen tempat menampilkan timer, seconds adalah jumlah detik untuk countdown, terjadi di halaman login untuk menampilkan timer saat mengirim OTP (tidak terpakai)
  const el = document.getElementById(elId); // mencari elemen dengan id yang diberikan
  if (!el) return; // jika elemen tidak ditemukan, tidak melakukan apa-apa
  const tick = () => { // fungsi untuk memperbarui tampilan timer setiap detik
    const m = Math.floor(seconds / 60); // menghitung menit dari sisa detik
    const s = seconds % 60; // menghitung detik yang tersisa setelah menit dihitung
    el.textContent = m + ':' + String(s).padStart(2, '0'); // menampilkan timer dalam format "M:SS"
    if (seconds-- > 0) setTimeout(tick, 1000); // jika masih ada detik yang tersisa, panggil fungsi tick lagi setelah 1 detik
    else el.textContent = 'Waktu habis'; // jika timer habis, tampilkan pesan "Waktu habis"
  };
  tick(); // memulai timer dengan memanggil fungsi tick pertama kali
}

function showNav() { // fungsi untuk menampilkan navigasi sidebar dan bottom nav, serta menyesuaikan margin konten utama berdasarkan lebar layar
  const sidebar = document.getElementById('sidebar');
  const bnav    = document.getElementById('bottom-nav');
  const main    = document.getElementById('main');
  if (sidebar) sidebar.style.display = 'flex';
  if (bnav)    bnav.style.display    = 'flex';
  function adjustMargin() {
    const hasSidebar = sidebar !== null;
    const isDesktop  = window.innerWidth >= 768;
    if (main)    main.style.marginLeft    = (hasSidebar && isDesktop) ? '224px' : '0';
    if (bnav)    bnav.style.display       = (hasSidebar && !isDesktop) ? 'flex' : 'none';
    if (sidebar) sidebar.style.display    = (hasSidebar && isDesktop)  ? 'flex' : 'none';
    if (sidebar) {
      sidebar.style.display  = (hasSidebar && isDesktop) ? 'flex' : 'none';
      sidebar.style.position = 'fixed';
      sidebar.style.top      = '0';
      sidebar.style.left     = '0';
      sidebar.style.bottom   = '0';
      sidebar.style.height   = '100vh';
      sidebar.style.zIndex   = '100';
    }
  }
  adjustMargin();
  window.addEventListener('resize', adjustMargin);
  // Set active link — cek data-active-nav dulu, fallback ke URL matching
  const mainEl = document.getElementById('main');
  const forceNav = mainEl ? mainEl.getAttribute('data-active-nav') : null;
  const fullPath = location.pathname;

  const navKeyMap = {
    'shop':     ['index-user.html', 'shop'],
    'articles': ['index-user.html', 'articles'],
    'community':['index-user.html', 'community'],
    'tracker':  ['tracker.html'],
    'profile':  ['profile.html'],
    'dashboard':['dashboard.html'],
  };

  document.querySelectorAll('.s-link, .bn-link').forEach(el => {
    el.classList.remove('active');
    const href = el.getAttribute('href') || '';
    if (!href) return;

    if (forceNav) {
      // Force active berdasarkan data-active-nav
      const abs = new URL(href, location.href).pathname;
      if (forceNav === 'shop' && abs.includes('/shop/index-user')) el.classList.add('active');
      else if (forceNav === 'articles' && abs.includes('/articles/index-user')) el.classList.add('active');
      else if (forceNav === 'community' && abs.includes('/community/index')) el.classList.add('active');
    } else {
      // URL matching biasa
      const abs = new URL(href, location.href).pathname;
      if (abs === fullPath) el.classList.add('active');
    }
  });
}

function toggleMobileMenu() { // fungsi untuk toggle menu mobile, biasanya digunakan untuk membuka/menutup menu pada layar kecil
  const m = document.getElementById('mob-menu');
  if (m) m.classList.toggle('open');
}

function toggleMobileNav() { // fungsi untuk toggle navigasi mobile, biasanya digunakan untuk menampilkan atau menyembunyikan navigasi pada layar kecil
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
}

function showPwToggle(inputId, iconEl) { // fungsi untuk toggle visibility password, inputId adalah id dari input password, iconEl adalah elemen ikon yang menunjukkan status visibility
  const inp = document.getElementById(inputId);
  if (!inp) return;
  if (inp.type === 'password') { inp.type = 'text'; iconEl.classList.replace('fa-eye', 'fa-eye-slash'); }
  else { inp.type = 'password'; iconEl.classList.replace('fa-eye-slash', 'fa-eye'); }
}