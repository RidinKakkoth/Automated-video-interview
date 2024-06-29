import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchInterviewDetails, submitAnswers } from "../../config/userEndpoints";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import useSpeechToText from 'react-hook-speech-to-text';
import './Interview.css';

const Interview = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const[isSubmitting,setIsSubmitting]=useState(false)
  const [answers, setAnswers] = useState([]);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [hasUserInteraction, setHasUserInteraction] = useState(false);
  const [isMicrophoneAllowed, setIsMicrophoneAllowed] = useState(false);
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false);
  const [currentTranscription, setCurrentTranscription] = useState("");

  const {
    error: speechToTextError,
    isRecording: isRecordingSpeech,
    results: speechToTextResults,
    startSpeechToText,
    stopSpeechToText
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    timeout: 5000 // Adjust timeout based on your needs
  });

  useEffect(() => {
    const checkMicrophonePermission = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          setIsMicrophoneAllowed(true);
        } catch (err) {
          console.error("Error accessing microphone:", err);
        }
      }
    };

    checkMicrophonePermission();
    fetchInterviewData();
  }, [id]);

  useEffect(() => {
    // Handle speech recognition start/stop based on recording state
    if (isRecording) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }
  }, [isRecording]);

  useEffect(() => {
    // Update current transcription
    if (speechToTextResults.length > 0) {
      const latestResult = speechToTextResults[speechToTextResults.length - 1];
      setCurrentTranscription(latestResult.transcript);
    }
  }, [speechToTextResults]);

  const fetchInterviewData = async () => {
    const response = await fetchInterviewDetails(id);
    if (response.success) {
      setInterview(response.data);
    } else {
      toast.error(response.message);
    }
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const startSpeechRecognition = () => {
    if (!isSpeechRecognitionActive) {
      startSpeechToText();
      setIsSpeechRecognitionActive(true);
    }
  };

  const stopSpeechRecognition = () => {
    if (isSpeechRecognitionActive) {
      stopSpeechToText();
      setIsSpeechRecognitionActive(false);
    }
  };

  const handleUserInteraction = () => {
    if (!hasUserInteraction) {
      setHasUserInteraction(true);
      startSpeechRecognition();
    }
  };

  const startRecording = async () => {
    if (!isMicrophoneAllowed) {
      toast.error("Please allow microphone access to record your answer.");
      return;
    }

    handleUserInteraction(); // Ensure user interaction is handled
    setIsRecording(true);
    setRecordedChunks([]);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      webcamRef.current.stream = stream;
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" });
      mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorderRef.current.start();
    } catch (err) {
      console.error("Error starting recording:", err);
      setIsRecording(false);
      toast.error("Error accessing camera or microphone.");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (isRecordingSpeech) {
      stopSpeechRecognition();
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleNext = async () => {
    if (recordedChunks.length === 0) {
      toast.error("Please record your answer before proceeding.");
      return;
    }
  
    const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
    const videoUrl = URL.createObjectURL(videoBlob);
  
    const newAnswer = {
      question: interview.questions[currentQuestionIndex],
      videoBlob,
      videoUrl,
      transcription: currentTranscription 
    };
    
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    setCurrentTranscription(""); // Clear the current transcription
  
    if (currentQuestionIndex < interview.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const formData = new FormData();
      formData.append("interviewId", id);
  
      newAnswers.forEach((answer, index) => {
        formData.append(`video_${index + 1}`, answer.videoBlob, `answer_${index + 1}.webm`);
        formData.append(`question_${index + 1}`, answer.question);
        formData.append(`transcription_${index + 1}`, answer.transcription);
      });
  
      try {
        setIsSubmitting(true);
        const response = await submitAnswers(formData);
        if (response.success) {
          toast.success("All questions answered. Responses submitted.");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error submitting answers:", error);
        toast.error("Error submitting answers. Please try again later.");
      }
    }
  
    setRecordedChunks([]);
  };

  if (!interview) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4" onClick={handleUserInteraction}>
      <h1 className="text-2xl text-prime font-bold mb-4">{interview.title}</h1>
      <div className="md:flex ">
        <div className="mb-4  md:w-1/2">
          <h2 className="text-xl text-secondary font-semibold mb-2">Question {currentQuestionIndex + 1}</h2>
          <p className="text-gray-600 text-lg  mb-2">{interview.questions[currentQuestionIndex]}</p>
          <div className="video-container  md:w-[70%] bg-gray-200 p-4 rounded-lg">
            <Webcam audio={true} ref={webcamRef} className="w-full h-auto" />
            <div className="flex justify-between">
            <button disabled={isSubmitting} 
              onClick={isRecording ? stopRecording : startRecording}
              className="flex justify-center items-center gap-5 mt-5 bg-prime text-white px-4 py-2 rounded hover:bg-prime2"
            >
              {isRecording ? 'Stop Recording' : recordedChunks.length > 0 ? 'Retry Recording' : 'Start Recording'}
              {isRecording && <div className="blink-circle"></div>}
            </button>
            <button onClick={handleNext} disabled={isSubmitting} className="mt-4 bg-prime text-white px-4 flex items-center  rounded hover:bg-prime2">
            {currentQuestionIndex < interview.questions.length - 1 ? 'Next' : 'Submit'}
            {isSubmitting && (
              <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"></path>
              </svg>
            )}
          </button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-md text-gray-600">Your answer:</h3>
            <p className="transcript bg-gray-50 p-2  rounded-md">{currentTranscription}</p>
          </div>
          
        </div>
        <div className=" md:w-1/2   py-5">
          {speechToTextError && <p className="error">Speech-to-text error: {speechToTextError}</p>}
          {answers.map((answer, index) => (
            <div className="bg-gray-50 rounded-md py-2 px-3 mb-2" key={`answer_${index}`}>
              <p className="text-gray-600 mt-2 mb-2"><span className="text-red-800">Question</span> {index + 1}: {answer.question}</p>
              <p className="transcript text-wrap"><span className="text-green-700">Answer: </span> {answer.transcription}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interview;
