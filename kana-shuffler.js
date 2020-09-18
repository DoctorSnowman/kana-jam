const KANA_BASIC = ['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'shi', 'su', 'se', 'so', 'ta', 'chi', 'tsu', 'te', 'to', 'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'fu', 'he', 'ho', 'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 'ru', 're', 'ro', 'wa', '(w)o', 'n'];
const KANA_DIACRITIC = ['ga', 'gi', 'gu', 'ge', 'go', 'za', 'ji', 'zu', 'ze', 'zo', 'da', 'ji', 'zu', 'de', 'do', 'ba', 'bi', 'bu', 'be', 'bo', 'pa', 'pi', 'pu', 'pe', 'po'];
const KANA_COMBO = ['kya', 'kyu', 'kyo', 'gya', 'gyu', 'gyo', 'sha', 'shu', 'sho', 'ja', 'ju', 'jo', 'cha', 'chu', 'cho', 'hya', 'hyu', 'hyo', 'bya', 'byu', 'byo', 'mya', 'myu', 'myo', 'pya', 'pyu', 'pyo', 'rya', 'ryu', 'ryo'];
const KANA_FOREIGN = ['ui', 'ue', 'uo', 'she', 'je', 'che', 'ti', 'di', 'dyu', 'hua', 'hui', 'hue', 'huo', 'vi'];

const victoryClip = new Audio('./FF7 AC Victory Fanfare Ringtone.mp3');
const nextButton = document.getElementById("next-button");
const shuffleButton = document.getElementById("shuffle-button");
const kanaDisplay = document.getElementById("kana-display");
const kanaOptions = document.getElementById("options");

nextButton.addEventListener("click", nextKana);


shuffleButton.addEventListener("click", beginTest);
let kanaList = [], pos = 0;

init();

function init() {
  kanaDisplay.style.display = 'none';
  nextButton.style.display = 'none';
}

function nextKana() {
  if (pos < kanaList.length - 1) {
    kanaDisplay.innerHTML = kanaList[++pos];
  } else {
    finishTest();
  }
}

function setKanaSelections() {
  kanaList = [];
  if (document.getElementById("kana-basic").checked) kanaList.push(...KANA_BASIC);
  if (document.getElementById("kana-diacritic").checked) kanaList.push(...KANA_DIACRITIC);
  if (document.getElementById("kana-combo").checked) kanaList.push(...KANA_COMBO);
  if (document.getElementById("kana-foreign").checked) kanaList.push(...KANA_FOREIGN);
}

function beginTest() {
  pos = 0;
  setKanaSelections();

  if (kanaList.length > 0) {
    fisherYatesShuffle(kanaList);
    kanaDisplay.innerHTML = kanaList[pos];
    shuffleButton.style.display = 'none';
    kanaOptions.style.display = 'none';
    nextButton.style.display = 'block';
    kanaDisplay.style.display = 'block';
  }
}

function finishTest() {
  kanaDisplay.innerHTML = "Otsukare!!"
  victoryClip.play();
  shuffleButton.style.display = 'block';
  nextButton.style.display = 'none';
}

// Obtained at: https://bost.ocks.org/mike/shuffle/compare.html
function fisherYatesShuffle(array) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
}