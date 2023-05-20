import React, { useState } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import "./App.css";

const TTS = () => {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("en-US-AriaNeural");
  const [tone, setTone] = useState("Default");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const speechConfig = sdk.SpeechConfig.fromSubscription(
    "2c8c7295fa894a06b78f2326d4c41d74",
    "eastus"
  );
  speechConfig.speechSynthesisVoiceName = voice;

  const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setVoice(event.target.value);
  };
  const handleToneChange = (event) => {
    setTone(event.target.value);
  };

  const handleSpeak = () => {
    setLoading(true);
    const ssml = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="${voice}"><voice name="${voice}"><s /><mstts:express-as style="${tone}">${text}</mstts:express-as><s /></voice></speak>`;
    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
    speechSynthesizer.speakSsmlAsync(ssml, audioConfig, () =>
      setLoading(false)
    );
    speechSynthesizer.audioOutputEnded = () => setLoading(false);
  };

  const handleGenerate = () => {
    const stories = [
      "Once upon a time, there was a brave knight who lived in a kingdom far, far away.",
      "In a small village nestled in the hills, there lived a young girl named Lily who dreamed of adventure.",
      "In the heart of the enchanted forest, there stood a tower made of pure crystal that shone like the stars at night.",
      "بعد سنوات من العمل في وظيفة بلا مستقبل، يستقيل جاك ويقرر متابعة حلمه بأن يصبح كاتبًا.",
      " ماريا عالمة بارعة تكتشف علاجًا لمرض قاتل، لكن عندما تحاول نشر نتائج أبحاثها، تدرك أن زملاءها غيورون ويحاولون سرقة عملها.",
      " عندما ينقطع التيار الكهربائي في المدينة، يضطر مجموعة من الغرباء للتعاون للبقاء على قيد الحياة.",
      " جين، امرأة أعمال ناجحة، تكتشف أن صديقتها المقربة عاشت على الشوارع لسنوات، وتقرر مساعدتها",
    ];
    const randomIndex = Math.floor(Math.random() * stories.length);
    setText(stories[randomIndex]);
  };

  return (
    <div className="tts-container">
      <h1>Text-to-Speech Demo</h1>
      <textarea
        className="tts-input"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to speak"
      ></textarea>
      <select className="tts-select" value={voice} onChange={handleVoiceChange}>
        <option value="en-US-AriaNeural">en-US-AriaNeural (Female)</option>
        <option value="en-US-NancyNeural">en-US-NancyNeural (Female)</option>
        <option value="en-US-SaraNeural">en-US-SaraNeural (Female)</option>
        <option value="en-US-TonyNeural">en-US-TonyNeural (Male)</option>
        <option value="ar-EG-ShakirNeural">ar-EG-ShakirNeural (Male)</option>
        <option value="ar-SA-HamedNeural">ar-SA-HamedNeural (Male)</option>
      </select>
      <select className="tts-select" value={tone} onChange={handleToneChange}>
        <option selected value="Default">
          Default
        </option>
        <option value="shouting">Shouting</option>
        <option value="unfriendly">Unfriendly</option>
        <option value="sad">Sad</option>
        <option value="friendly">Friendly</option>
        <option value="angry">Angry</option>
        <option value="whispering">Whispering</option>
        <option value="excited">Excited</option>
        <option value="terrified">Terrified</option>
      </select>
      <button
        className={`tts-button ${loading ? "tts-anim" : ""}`}
        onClick={handleSpeak}
        disabled={!text}
      >
        {loading ? "Speaking..." : "Speak"}
      </button>
      <button
        className={`tts-button ${generating ? "tts-anim" : ""}`}
        onClick={handleGenerate}
      >
        {generating ? "Generating..." : "Generate Story"}
      </button>
    </div>
  );
};

export default TTS;
