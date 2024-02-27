let recordedTracks = [];
let isRecording = false;
let currentRecord = [];

const allowedKeys = new Map();
allowedKeys.set('q', "boom");
allowedKeys.set('w', "tom");
allowedKeys.set('e', "hihat");
allowedKeys.set('r', "kick");
allowedKeys.set('t', "openhat");
allowedKeys.set('y', "ride");
allowedKeys.set('u', "snare");
allowedKeys.set('i', "clap");
allowedKeys.set('o', "tink");

document.addEventListener('keypress', (e) => {
  const key = e.key;
  const sound = allowedKeys.get(key);

  if (!sound) {
    alert('Allowed keys: q,w,e,r,t,y,u,i,o');
    return;
  }

  isRecording && currentRecord.push({
    key: sound,
    timestamp: Date.now()
  });
  playSound(sound);
});

function playSound(sound) {
  const audioTag = document.getElementById(sound);
  audioTag.currentTime = 0;
  audioTag.play();
}

function playRecord(record) {
  record.forEach(({ key, timestamp }) => {
    setTimeout(() => {
      playSound(key);
    }, timestamp - record[0].timestamp);
  });
}

function showRecords() {
  const recordsList = document.querySelector('.records');
  recordsList.innerHTML = '';

  recordedTracks.forEach((record, index) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    li.className = 'records';
    li.textContent = `Record ${index + 1}`;

    btn.textContent = 'Play';
    btn.className = 'play';
    btn.addEventListener('click', () => {
      playRecord(record);
    });

    li.appendChild(btn);
    recordsList.appendChild(li);
  });
}

const recordButton = document.querySelector('#record');
recordButton.addEventListener('click', () => {
  isRecording = !isRecording;

  const notRecording = () => {
    recordButton.textContent = 'Record';
    recordedTracks.push(currentRecord);
    currentRecord = [];
    showRecords();
  }

  isRecording
    ? recordButton.textContent = 'Stop Recording'
    : notRecording()
});