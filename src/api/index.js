import settings from '../settings';

/**
 * speechText
 * @param {string} text 
 * @param {string} speechVoiceType  NEUTRAL FEMALE MALE
 * @param {number} speed 1 ~ 5
 */
const audio = new Audio();

const speechText = (text = "", speechVoiceType = "NEUTRAL", speed = 1, callback) => {
  fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${settings.google_api_key}`, {
    method: "POST",
    body: JSON.stringify({
      input: {
        text
      },
      voice: {
        languageCode: "en-US",
        ssmlGender: speechVoiceType
      },
      audioConfig: {
        audioEncoding: "MP3"
      }
    })
  }).then(res => res.json()).then(data => {
    audio.src = "data:audio/mpeg;base64," + data.audioContent;
    audio.playbackRate = speed;
    audio.play();
    audio.addEventListener('ended', callback);
  }).catch(err => console.error(err))
};
const speechStop = () => {
  audio.pause();
}
export { speechText, speechStop };