const weeks = {
  w1: {
    number: "01", label: "第 1 周", title: "球", english: "Let's Play with Balls", theme: "BALL",
    intro: "通过滚球、投球和篮子游戏，让宝宝自然接触英语。",
    art: "assets/illustrations/week-1-ball.png", artAlt: "一个陶土橙色纸艺球",
    words: [["ball", "球"], ["roll", "滚"], ["big", "大"], ["small", "小"], ["in", "里"]],
    phrases: ["Look!", "Roll the ball.", "Give it to Mommy.", "Put it in.", "More?"],
    songs: ["The Wheels on the Bus", "If You're Happy", "Walking Walking"],
    activities: ["Roll the Ball · 宝宝和家长面对面滚球。", "In & Out · 把球放进篮子，再拿出来。", "Big & Small · 观察不同大小的球。"],
    story: "Ball / Sports themed board book（球类或运动主题的纸板书）",
    homeIntro: "每天找一个球，边玩边说：", homeLines: ["Roll the ball.", "Give it to Mommy.", "Put it in.", "Take it out."], homeNote: "不用“教”，边玩边说就好。",
    prev: null, next: "w2"
  },
  w2: {
    number: "02", label: "第 2 周", title: "动物", english: "Let's Find Animals", theme: "ANIMALS",
    intro: "寻找动物、模仿叫声，用身体动作理解语言。",
    art: "assets/illustrations/week-2-bird.png", artAlt: "一只纸艺小鸟和枝叶",
    words: [["dog", "狗"], ["cat", "猫"], ["cow", "牛"], ["pig", "猪"], ["go", "走 / 去"]],
    phrases: ["Where's the dog?", "There it is!", "Can you find it?", "Let's go!", "You found it!"],
    songs: ["Bingo", "Walking Walking", "If You're Happy"],
    activities: ["Find the Animals · 在房间里寻找动物玩偶。", "Animal Sounds · Woof woof! Meow! Moo! Oink!", "Move Like Animals · 爬、走、模仿动物。"],
    story: "Farm Animals / Animal Sounds board book（农场动物 / 动物叫声纸板书）",
    homeIntro: "藏一个宝宝熟悉的玩具，问：", homeLines: ["Where's Teddy?", "There it is!", "You found it!"], homeNote: "找到时一起开心地回应。",
    prev: "w1", next: "w3"
  },
  w3: {
    number: "03", label: "第 3 周", title: "泡泡", english: "Bubbles, Bubbles!", theme: "BUBBLES",
    intro: "吹泡泡、追泡泡，用动作表达“还要”。",
    art: "assets/illustrations/week-3-bubbles.png", artAlt: "三个纸艺泡泡",
    words: [["bubble", "泡泡"], ["pop", "破 / 戳"], ["up", "上"], ["down", "下"], ["more", "更多"]],
    phrases: ["Look!", "More bubbles?", "Pop it!", "Up, up, up!", "All done!"],
    songs: ["Pop the Bubbles", "If You're Happy", "Walking Walking"],
    activities: ["Watch the Bubbles · Look!", "Pop the Bubbles · Pop!", "Ask for More · 停下来问：More bubbles? 宝宝用动作表示想继续。", "All Done · 活动结束：All done!"],
    story: "Bubble / Bath / Water themed board book（泡泡 / 洗澡 / 水主题纸板书）",
    homeIntro: "洗澡时，也可以自然地说：", homeLines: ["More water?", "Up!", "Down!", "All done!"], homeNote: "重复几次就很好，不需要宝宝回答。",
    prev: "w2", next: "w4"
  },
  w4: {
    number: "04", label: "第 4 周", title: "身体", english: "My Body", theme: "BODY PARTS",
    intro: "认识身体部位、动作指令，并配合音乐动起来。",
    art: "assets/illustrations/week-4-hands.png", artAlt: "一双纸艺小手",
    words: [["head", "头"], ["eyes", "眼睛"], ["nose", "鼻子"], ["hands", "手"], ["feet", "脚"]],
    phrases: ["Touch your nose.", "Where are your eyes?", "Clap your hands.", "Stomp your feet.", "Where are your feet?"],
    songs: ["Head, Shoulders, Knees & Toes", "One Little Finger", "If You're Happy"],
    activities: ["Mirror Play · 照镜子认识自己。", "Touch & Point · Touch your nose.", "Clap & Stomp · Clap your hands! Stomp your feet!"],
    story: "Body Parts / Baby's Body board book（身体部位 / 宝宝身体纸板书）",
    homeIntro: "照镜子、洗澡或穿衣服时，可以说：", homeLines: ["Where's your nose?", "Where are your feet?"], homeNote: "边照镜子边说，保持轻松。",
    prev: "w3", next: null
  }
};

const icon = name => `<img src="assets/icons/${name}.svg" alt="" aria-hidden="true">`;

function weekName(id) {
  if (!id) return "";
  return `${weeks[id].label} · ${weeks[id].title}`;
}

function renderWeek(id, week) {
  const wordButtons = week.words.map(([word, hint]) => `
    <button class="vocab" type="button" data-word="${word}" aria-label="播放 ${word} 的发音">
      <strong>${word}</strong><span>${hint}</span>
    </button>`).join("");

  const phrases = week.phrases.map(phrase => `
    <div class="phrase"><span>${phrase}</span>
      <button class="speak-button" type="button" data-speak-text="${phrase.replaceAll('"', '&quot;')}" aria-label="播放 ${phrase} 的发音">
        ${icon("speaker-high")}
      </button>
    </div>`).join("");

  const songs = week.songs.map(song => `<span class="song">${song}</span>`).join("");
  const activities = week.activities.map((activity, index) => `<li data-step="${index + 1}">${activity}</li>`).join("");
  const homeLines = week.homeLines.map(line => `<div class="home-line">${line}</div>`).join("");

  const prevButton = week.prev
    ? `<button type="button" data-target="${week.prev}">${icon("arrow-left")}<span>${weekName(week.prev)}</span></button>`
    : `<button type="button" disabled>${icon("arrow-left")}<span>上一周</span></button>`;
  const nextButton = week.next
    ? `<button type="button" data-target="${week.next}"><span>${weekName(week.next)}</span>${icon("arrow-right")}</button>`
    : `<button type="button" data-target="intro"><span>回到家长介绍</span>${icon("check-circle")}</button>`;

  document.getElementById(id).innerHTML = `
    <div class="week-shell">
      <header class="week-hero">
        <div><span class="week-number">${week.label} · WEEK ${week.number}</span><h1>${week.title}<span>${week.english}</span></h1><p>${week.intro}</p></div>
        <img class="week-hero__art" src="${week.art}" alt="${week.artAlt}">
      </header>
      <div class="week-summary" aria-label="本周内容摘要">
        <div class="summary-item"><span>Words</span><strong>5 个核心词汇</strong></div>
        <div class="summary-item"><span>Phrases</span><strong>5 个常用短语</strong></div>
        <div class="summary-item"><span>Home Play</span><strong>5 分钟家庭小游戏</strong></div>
      </div>
      <div class="week-content">
        <div>
          <section class="detail-section"><h2>Today's 5 Words</h2><p>点击词汇卡可听发音。</p><div class="vocab-grid">${wordButtons}</div></section>
          <section class="detail-section"><h2>Today's 5 Phrases</h2><p>点击喇叭按钮听整句发音。</p><div class="phrase-list">${phrases}</div></section>
          <section class="detail-section"><h2>5-Minute Home Play</h2><div class="home-play"><p>${week.homeIntro}</p>${homeLines}<p>${week.homeNote}</p></div></section>
        </div>
        <aside>
          <section class="detail-section"><h2>Songs</h2><div class="song-list">${songs}</div></section>
          <section class="detail-section"><h2>Main Activities</h2><ol class="plain-list">${activities}</ol></section>
          <section class="detail-section"><h2>Story</h2><p>${week.story}</p></section>
        </aside>
      </div>
      <nav class="week-nav" aria-label="周次切换">${prevButton}${nextButton}</nav>
    </div>`;
}

Object.entries(weeks).forEach(([id, week]) => renderWeek(id, week));

const tabs = [...document.querySelectorAll(".tab")];
const panels = [...document.querySelectorAll(".panel")];
const header = document.querySelector(".site-header");

function showPanel(id, updateHash = true) {
  if (!document.getElementById(id)) return;
  tabs.forEach(tab => {
    const active = tab.dataset.target === id;
    tab.classList.toggle("active", active);
    if (active) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  });
  panels.forEach(panel => panel.classList.toggle("active", panel.id === id));
  if (updateHash) history.replaceState(null, "", id === "intro" ? "#intro" : `#${id}`);
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

document.addEventListener("click", event => {
  const target = event.target.closest("[data-target]");
  if (!target || target.disabled) return;
  showPanel(target.dataset.target);
});

function speak(text, control) {
  if (!("speechSynthesis" in window)) {
    document.querySelector(".pronunciation-note span").textContent = "当前浏览器暂不支持语音播放";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.84;
  utterance.pitch = 1.05;
  if (control) {
    control.classList.add("speaking", "spoken");
    utterance.onend = () => control.classList.remove("speaking", "spoken");
    utterance.onerror = () => control.classList.remove("speaking", "spoken");
  }
  window.speechSynthesis.speak(utterance);
}

document.addEventListener("click", event => {
  const vocab = event.target.closest(".vocab[data-word]");
  if (vocab) speak(vocab.dataset.word, vocab);
  const phrase = event.target.closest("[data-speak-text]");
  if (phrase) speak(phrase.dataset.speakText, phrase);
});

window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 8), { passive: true });
const initialPanel = location.hash.slice(1);
showPanel(document.getElementById(initialPanel) ? initialPanel : "intro", false);
