// ======== RESPONSIVE NAVBAR ========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Toggle menu saat hamburger diklik
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('show');
});

// Tutup menu saat salah satu link diklik
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// Tutup menu saat klik di luar area menu
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove('show');
  }
});

// ======== SCROLL BEHAVIOR UNTUK LAPTOP ========
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  // Jika scroll ke bawah → sembunyikan navbar
  if (currentScroll > lastScrollTop && window.innerWidth > 768) {
    navbar.classList.add('hidden');
  } else {
    // Scroll ke atas → tampilkan navbar
    navbar.classList.remove('hidden');
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ======== KLIK DIMANA SAJA DI LAPTOP → TAMPILKAN NAVBAR ========
document.addEventListener('click', () => {
  if (window.innerWidth > 768) {
    navbar.classList.remove('hidden');
  }
});



// SLIDER
const slider = document.getElementById('smallProjects');
const manualScroll = document.getElementById('manualScroll');
const mainImage = document.getElementById('mainImage');
const mainTitle = document.getElementById('mainTitle');
const mainDesc = document.getElementById('mainDesc');
const mainPoints = document.getElementById('mainPoints');

slider.innerHTML += slider.innerHTML; // duplikasi konten untuk loop
const totalWidth = slider.scrollWidth / 2;
let offset = 0, autoScroll = true;

function animateSlider(){
  if(autoScroll){
    offset += 0.6;
    if(offset >= totalWidth) offset = 0;
    slider.style.transform = `translateX(${-offset}px)`;
    manualScroll.value = (offset / totalWidth) * 100;
  }
  requestAnimationFrame(animateSlider);
}
animateSlider();

// Manual scroll
manualScroll.addEventListener('input', () => {
  autoScroll = false;
  offset = totalWidth * (manualScroll.value / 100);
  slider.style.transform = `translateX(${-offset}px)`;
});
manualScroll.addEventListener('change', () => autoScroll = true);

// Small card click -> update main
// slider.querySelectorAll('.small-card').forEach(card => {
//   card.addEventListener('click', () => {
//     mainImage.src = card.dataset.img;
//     mainTitle.textContent = card.dataset.title;
//     mainDesc.textContent = card.dataset.desc;
//     mainPoints.innerHTML = '';
//     card.dataset.points.split(',').forEach(p => {
//       const li = document.createElement('li');
//       li.textContent = p.trim();
//       mainPoints.appendChild(li);
//     });
//     autoScroll = true;
//   });
// });

const modal = document.getElementById('modalDetail');
const closeModal = document.getElementById('closeModal');
const detailTitle = document.getElementById('detailTitle');
const detailText = document.getElementById('detailText');
const extraImages = document.getElementById('extraImages');

// MAIN PROJECT — tetap seperti sebelumnya
document.getElementById('mainProject').addEventListener('click', () => {
  detailTitle.textContent = document.getElementById('mainTitle').textContent;
  detailText.textContent = document.getElementById('mainDesc').textContent + 
    " - Saya adalah seorang Desainer Grafis, Fotografer, dan Web Developer dengan keahlian di bidang desain visual, editing multimedia, dan pembuatan website interaktif.";
  
  extraImages.innerHTML = "";
  const urls = [
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
  ];
  urls.forEach(u => {
    const img = document.createElement('img');
    img.src = u;
    img.alt = "Gambar tambahan";
    extraImages.appendChild(img);
  });

  modal.classList.add('active');
});

// DETAIL UNTUK SMALL CARD
const projectDetails = {
  a: {
    title: "Fotografi Outdoor",
    desc: "Di Moments Beyond Time, saya percaya setiap foto memiliki cerita — tentang senyum, sentuhan, mimpi, atau perayaan. Mulai dari prewedding yang penuh cinta, wisuda yang membanggakan, hingga event yang berkesan, mengabadikan setiap momen dengan kehangatan dan sentuhan seni. Baik di cahaya alami luar ruangan maupun suasana nyaman dalam ruangan, mengubah detik singkat menjadi kenangan abadi — karena setiap kisahmu pantas untuk dikenang selamanya.",
    images: ['ITEM/8.jpg', 'ITEM/9.jpg','ITEM/10.jpg', ' ITEM/11.jpg']
  },
  b: {
    title: "Desain Grafis",
    desc: "Setiap foto memiliki ceritanya sendiri — dan melalui editing Lightroom, cerita itu kembali hidup. Fokus utama ada pada peningkatan tone alami, keseimbangan cahaya dan bayangan, serta penciptaan suasana yang selaras dengan setiap adegan. Mulai dari senja hangat di luar ruangan, potret elegan di dalam ruangan, prewedding penuh cinta, hingga momen wisuda dan event yang meriah, setiap detail disempurnakan dengan ketelitian dan rasa. Tujuannya sederhana: mengubah setiap momen menjadi karya seni abadi tanpa kehilangan keindahan dan emosi aslinya.",
    images: ['']
  },
  c: {
    title: "Projek C - Website Interaktif",
    desc: "Website portofolio dengan HTML, CSS, dan JavaScript yang responsif dan interaktif.",
    images: ['/img/c1.jpg', '/img/c2.jpg', '/img/c3.jpg']
  }
};

// EVENT UNTUK SETIAP SMALL CARD
document.querySelectorAll('.small-card').forEach(card => {
  card.addEventListener('click', e => {
    e.stopPropagation(); // supaya gak ikut buka main project
    const id = card.getAttribute('data-project');
    const project = projectDetails[id];

    if (project) {
      detailTitle.textContent = project.title;
      detailText.textContent = project.desc;
      extraImages.innerHTML = "";

      project.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = project.title;
        extraImages.appendChild(img);
      });

      modal.classList.add('active');
    }
  });
});

// Tutup modal
closeModal.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });





// VIDEO GRID
const videoGrid = document.getElementById('videoGrid');
const links = [

];

function getThumb(link){
  if(link.includes("youtube.com")){
    const id = link.split("v=")[1].split("&")[0];
    return `https://img.youtube.com/vi/${id}/0.jpg`;
  } else if(link.includes("instagram.com")){
    return "https://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-png-transparent-background.png";
  } else return "https://via.placeholder.com/200x120?text=Preview";
}

links.forEach(link => {
  const div = document.createElement("div");
  div.className = "video-thumb";
  div.innerHTML = `<img src="${getThumb(link)}" alt="video">`;
  div.addEventListener("click", () => window.open(link,"_blank"));
  videoGrid.appendChild(div);
});

// SKILL BAR ANIMATION
document.querySelectorAll('.progress span').forEach(bar => {
  const skill = bar.dataset.skill;
  bar.style.width = skill + "%";
});

// Buat modal dan overlay
const skillModal = document.createElement('div');
skillModal.className = 'skill-desc';
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(skillModal);
document.body.appendChild(overlay);

// Klik skill bar -> tampilkan deskripsi
document.querySelectorAll('.bar').forEach(bar => {
  bar.addEventListener('click', () => {
    const title = bar.querySelector('.info p').textContent;
    const desc = bar.dataset.desc;
    skillModal.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
    skillModal.style.display = 'block';
    overlay.style.display = 'block';
  });
});

// Tutup modal klik overlay
overlay.addEventListener('click', () => {
  skillModal.style.display = 'none';
  overlay.style.display = 'none';
});

