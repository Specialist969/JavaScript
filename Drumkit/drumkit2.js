document.addEventListener('DOMContentLoaded', function () {
  const drumKit = document.getElementById('drumkit');
  const recordBtns = [document.getElementById('recordBtn1'), document.getElementById('recordBtn2'), document.getElementById('recordBtn3'), document.getElementById('recordBtn4')];
  const playBtn = document.getElementById('playBtn');
  let isRecording = false;
  let recordedSounds = JSON.parse(localStorage.getItem('recordedSounds')) || [null, null, null, null];
  let currentTrack = 0;

  drumKit.addEventListener('click', function (event) {
      const sound = event.target.dataset.sound;
      if (sound) {
          playSound(sound);
          if (isRecording) {
              recordedSounds[currentTrack] = recordedSounds[currentTrack] || {};
              recordedSounds[currentTrack][sound] = recordedSounds[currentTrack][sound] || [];
              recordedSounds[currentTrack][sound].push(Date.now());
              localStorage.setItem('recordedSounds', JSON.stringify(recordedSounds));
          }
      }
  });

  document.addEventListener("keypress", function(event) { 
      sound(event.key); 
  }); 
  
  function sound(key) { 
      switch (key) { 
          case "q": 
              playSound("boom"); 
              break; 
          case "w": 
              playSound("clap"); 
              break; 
          case "e": 
              playSound("hihat"); 
              break;
          case "r": 
              playSound("kick"); 
              break; 
          case "t": 
              playSound("openhat"); 
              break; 
          case "y": 
              playSound("ride"); 
              break; 
          case "u": 
              playSound("snare"); 
              break; 
          case "i": 
              playSound("tink"); 
              break; 
          case "o": 
              playSound("tom"); 
              break; 
          // Dodatkowe klawisze dla kolejnych ścieżek utworów
          case "1":
              currentTrack = 0; // Pierwsza ścieżka utworu
              break;
          case "2":
              currentTrack = 1; // Druga ścieżka utworu
              break;
          case "3":
              currentTrack = 2; // Trzecia ścieżka utworu
              break;
          case "4":
              currentTrack = 3; // Czwarta ścieżka utworu
              break;
          default: 
              console.log(key); 
      } 
  } 

  recordBtns.forEach(function(recordBtn, index) {
      recordBtn.addEventListener('click', function () {
          isRecording = !isRecording;
          if (isRecording) {
              currentTrack = index;
              recordedSounds[currentTrack] = {};
              localStorage.setItem('recordedSounds', JSON.stringify(recordedSounds));
          }
      });
  });

  playBtn.addEventListener('click', function () {
      playRecordedSounds();
  });

  function playSound(sound) {
      console.log(`Playing sound: ${sound}`);
      const audio = new Audio(`sounds/${sound}.wav`);
      audio.play();
  }

  function playRecordedSounds() {
      // Iteracja przez wszystkie ścieżki utworów i odtwarzanie nagranych dźwięków
      for (let i = 0; i < recordedSounds.length; i++) {
          const track = recordedSounds[i];
          if (track) {
              Object.keys(track).forEach(function (sound) {
                  track[sound].forEach(function (timestamp, index) {
                      setTimeout(function () {
                          playSound(sound);
                      }, timestamp - track[sound][0]);
                  });
              });
          }
      }
  }
});
