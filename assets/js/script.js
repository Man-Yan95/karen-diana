

(function(){
  const year = 2025;
  const monthIndex = 9; // October
  const targetSpecialDay = 10;
  const targetDate = new Date(year, monthIndex, targetSpecialDay, 0, 0, 0); // Oct 10, 2025 midnight

  const firstOfMonth = new Date(year, monthIndex, 1);
  const offsetFromMonday = (firstOfMonth.getDay() + 6) % 7;
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  const grid = document.getElementById('calendarGrid');

  for(let i=0; i<offsetFromMonday; i++){
    const empty = document.createElement('div');
    empty.className = 'day empty';
    grid.appendChild(empty);
  }

  for(let d=1; d<=totalDays; d++){
    const cell = document.createElement('div');
    cell.className = 'day';
    if(d === targetSpecialDay) cell.classList.add('day-10');

    const num = document.createElement('div');
    num.className = 'num';
    num.textContent = d;

    const label = document.createElement('div');
    label.className = 'label';

    cell.appendChild(num);
    cell.appendChild(label);
    grid.appendChild(cell);
  }

  const totalCells = offsetFromMonday + totalDays;
  const trailing = (7 - (totalCells % 7)) % 7;
  for(let i=0; i<trailing; i++){
    const empty = document.createElement('div');
    empty.className = 'day empty';
    grid.appendChild(empty);
  }

  const todayBox = document.getElementById('todayText');
  const countdownBox = document.getElementById('daysLeft');

  function updateCountdown(){
    const now = new Date();
    todayBox.textContent = now.toLocaleString('hy-AM', { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' });

    let diff = targetDate - now;

    if (diff < 0) {
      countdownBox.textContent = "Ժամկետն անցել է";
      return;
    }

    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * 1000*60*60*24;

    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * 1000*60*60;

    const minutes = Math.floor(diff / (1000*60));
    diff -= minutes * 1000*60;

    const seconds = Math.floor(diff / 1000);

    countdownBox.textContent = `${days} օր, ${hours} ժամ, ${minutes} րոպե, ${seconds} վայրկյան`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

 










  // Սկզբի վիճակ — երևում են միայն վերնագիրն ու 2 կոճակները
  const choosePhone   = document.getElementById('choosePhone');
  const chooseEmail   = document.getElementById('chooseEmail');
  const phoneSection  = document.getElementById('phoneSection');
  const rsvpForm      = document.getElementById('rsvpForm');
  const phoneSelect   = document.getElementById('phoneSelect');
  const callBtn       = document.getElementById('callBtn');

  // Զանգի տարբերակ
  choosePhone.addEventListener('click', () => {
    // բացենք միայն Զանգի բաժինը, մնացածը փակ
    phoneSection.classList.remove('hidden');
    rsvpForm.classList.add('hidden');
    callBtn.classList.add('hidden');
    phoneSelect.value = "";
  });

  // Մեյլի տարբերակ
  chooseEmail.addEventListener('click', () => {
    rsvpForm.classList.remove('hidden');
    phoneSection.classList.add('hidden');
  });

  // Հեռախոսահամար ընտրելուց ակտիվանա "Զանգել"
  phoneSelect.addEventListener('change', () => {
    const num = phoneSelect.value;
    if (num) {
      callBtn.href = `tel:${num}`;
      callBtn.classList.remove('hidden');
    } else {
      callBtn.classList.add('hidden');
      callBtn.removeAttribute('href');
    }
  });

  // Email ուղարկում (AJAX → send.php)
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(rsvpForm);
    try {
      const res = await fetch('send.php', { method: 'POST', body: formData });
      const text = await res.text();
      if (res.ok && text.trim().toLowerCase().includes('success')) {
        alert('Շնորհակալություն։ Ձեր հաղորդագրությունն ուղարկվեց։');
        rsvpForm.reset();
        // վերադառնանք սկզբնական վիճակին
        rsvpForm.classList.add('hidden');
      } else {
        alert('Չստացվեց ուղարկել։ Խնդրում ենք փորձել ավելի ուշ։');
      }
    } catch (err) {
      alert('Ցանցային սխալ։ Խնդրում ենք փորձել կրկին։');
    }
  });






// nkarneri popoxutyun opasiti

const wrapper = document.querySelector('.image-wrapper');
const fgImage = wrapper.querySelector('.img-fg');

wrapper.addEventListener('mousemove', (e) => {
  // մկնիկի դիրքը բաժանում ենք բլոկի լայնությանը, ստանում ենք արժեք 0-1
  let xPos = e.offsetX / wrapper.offsetWidth;
  
  // թափանցիկությունը կփոխվի 0.3-ից մինչև 1
  fgImage.style.opacity = 0.3 + xPos * 0.7;
});

wrapper.addEventListener('mouseleave', () => {
  // դուրս գալուց վերադառնում է սկզբնական վիճակին
  fgImage.style.opacity = 0.9;
});
















(function(){
  // Ընտրում ենք .programa բլոկի բոլոր տողերը, բացի վերնագրից
  const rows = document.querySelectorAll('.programa > p:not(:first-child)');

  rows.forEach(row => {
    const spans = row.querySelectorAll('span');
    if(spans.length < 3) return;

    const addressSpan = spans[2]; // 3-րդ span-ը հասցեն է
    const addressText = addressSpan.textContent.trim();
    if(!addressText) return;

    // Ստեղծում ենք կոճակ՝ տեղանիշի նշանով
    const btn = document.createElement('button');
    btn.className = 'address-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Բացել նավիգացիան Google Maps-ում');

    // SVG pin
    const pin = document.createElementNS('http://www.w3.org/2000/svg','svg');
    pin.setAttribute('viewBox','0 0 24 24');
    pin.setAttribute('class','pin');
    pin.setAttribute('aria-hidden','true');
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('fill','currentColor');
    path.setAttribute('d','M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z');
    pin.appendChild(path);

    const text = document.createElement('span');
    text.className = 'addr-text';
    text.textContent = addressText;

    btn.appendChild(pin);
    btn.appendChild(text);

    // Փոխարինում ենք span-ը մեր կոճակով
    addressSpan.replaceWith(btn);

    // Սեղմելու գործողություն՝ բացել Google Maps Navigation
    btn.addEventListener('click', () => {
      try{
        btn.classList.add('loading');
        const destination = encodeURIComponent(addressText);

        // Եթե սարքը ունի Google Maps app, սա կբացի app-ը, հակառակ դեպքում՝ բրաուզերում քարտեզը։
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

        // Բացում ենք նույն էջում (mobile-ում դա ավելի բնական է նավիգացիայի համար)
        window.location.href = mapsUrl;
      }catch(e){
        btn.classList.remove('loading');
      }
    });
  });
})();




const audioUrl = "https://raw.githubusercontent.com/USERNAME/REPO_NAME/main/assets/audio/PerfectSongbyEdSheeran.mp3";

const player = document.createElement("audio");
player.src = audioUrl;
player.controls = true;
document.body.appendChild(player);

// Օգտագործողի interaction–ի վրա նվագել
player.addEventListener("canplaythrough", () => {
  player.play().catch(() => {
    // Autoplay restricted, սպասել user interaction
  });
});

const trigger = document.getElementById("music-trigger");
trigger.addEventListener("mouseenter", () => player.play());
trigger.addEventListener("touchstart", () => player.play());




