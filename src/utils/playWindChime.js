let audioContext = null;
let reverbBuffer = null;
let lastChimeAt = 0;

const CHIME_FREQS = [523, 659, 784, 1047, 880];
const CHIME_THROTTLE_MS = 180;

const getAudioContext = () => {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextConstructor) return null;
  if (!audioContext) audioContext = new AudioContextConstructor();

  return audioContext;
};

const getReverbBuffer = (audioCtx) => {
  if (reverbBuffer) return reverbBuffer;

  const length = audioCtx.sampleRate * 1.5;
  const buffer = audioCtx.createBuffer(2, length, audioCtx.sampleRate);

  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);

    for (let index = 0; index < length; index += 1) {
      data[index] =
        (Math.random() * 2 - 1) * Math.pow(1 - index / length, 4);
    }
  }

  reverbBuffer = buffer;
  return buffer;
};

export const playWindChime = (freq = 784) => {
  const nowMs = Date.now();
  if (nowMs - lastChimeAt < CHIME_THROTTLE_MS) return;
  lastChimeAt = nowMs;

  const audioCtx = getAudioContext();
  if (!audioCtx) return;

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const gain2 = audioCtx.createGain();
  const master = audioCtx.createGain();
  const convolver = audioCtx.createConvolver();
  const wetGain = audioCtx.createGain();
  const dryGain = audioCtx.createGain();
  const now = audioCtx.currentTime;

  osc.type = "sine";
  osc2.type = "sine";
  osc.frequency.value = freq;
  osc2.frequency.value = freq * 0.6;

  gain.gain.setValueAtTime(0.5, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);
  gain2.gain.setValueAtTime(0.15, now);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 2.3);

  convolver.buffer = getReverbBuffer(audioCtx);
  wetGain.gain.value = 0.5;
  dryGain.gain.value = 0.75;

  osc.connect(gain);
  gain.connect(master);
  osc2.connect(gain2);
  gain2.connect(master);
  master.connect(dryGain);
  dryGain.connect(audioCtx.destination);
  master.connect(convolver);
  convolver.connect(wetGain);
  wetGain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 3.9);
  osc2.start(now);
  osc2.stop(now + 2.4);

  osc.onended = () => {
    osc.disconnect();
    osc2.disconnect();
    gain.disconnect();
    gain2.disconnect();
    master.disconnect();
    convolver.disconnect();
    wetGain.disconnect();
    dryGain.disconnect();
  };
};

export const playRandomWindChime = () => {
  const freq = CHIME_FREQS[Math.floor(Math.random() * CHIME_FREQS.length)];
  playWindChime(freq);
};
