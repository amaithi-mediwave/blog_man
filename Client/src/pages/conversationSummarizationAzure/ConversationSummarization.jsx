import React, { useState, useEffect } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import './conversationSummarization.css'
import AzureTextSummarization from '../../components/conversationTranscriptionAzure/ConverationTranscripter';


import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import PropagateLoader from "react-spinners/PropagateLoader";
import { BarVisualizer } from 'react-mic-visualizer';

const useStyles = makeStyles((theme) => ({
  modal:{
    position:'absolute',
    top:'10%',
    left:'10%',
    overflow:'hidden',
    height:'100%',
    maxHeight: 500,
    display:'block'},
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  transcriptionContainer: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(15),
    marginRight: theme.spacing(15),
    padding: '0, 5px'
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
  transcriptionText: {
    marginTop: theme.spacing(2),
    whiteSpace: 'pre-wrap',
    marginBottom: '10px',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
}));


export default function ConversationSummarizer() {

  const classes = useStyles();

  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const [recognizer, setRecognizer] = useState(null);
  const [canTranscribe, setcanTranscribe] = useState(false);

  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false);
  const [isStopButtonDisabled, setIsStopButtonDisabled] = useState(true);
  

  const [loading, setLoading] = useState(false);

  const [stream, setStream] = useState(MediaStream | null > (null));


  const API = process.env.REACT_APP_SPEECH_TO_TEXT_API_KEY
  const API1 = process.env.REACT_APP_DOCUMET_SUMMARIZATION_API_KEY
  const REGION = process.env.REACT_APP_AZURE_REGION
  const ENDPOINT = process.env.REACT_APP_AZURE_ENDPOINT


  console.log(API)

  useEffect(() => {
    return () => {
      if (recognizer) {
        recognizer.close();
      }
    };
  }, [recognizer]);


  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setStream(stream);
    });
  }, []);


  const startListening = async () => {
    try {
      const speechConfig = sdk.SpeechConfig.fromSubscription(API, REGION);
      const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

      const conversationTranscriber = new sdk.ConversationTranscriber(speechConfig, audioConfig);

      conversationTranscriber.sessionStarted = (s, e) => {
        console.log('Session started:', e.sessionId);
      };

      conversationTranscriber.sessionStopped = (s, e) => {
        console.log('Session stopped:', e.sessionId);
      };

      conversationTranscriber.canceled = (s, e) => {
        console.log('Canceled event:', e.errorDetails);
        setError(`Error: ${e.errorDetails}`);
        conversationTranscriber.stopTranscribingAsync();
      };

      conversationTranscriber.transcribed = (s, e) => {
        
        console.log("Speaker ID=" + e.result.speakerId + " TRANSCRIBED: Text=" + e.result.text);

        setTranscription((prevTranscription) => prevTranscription + e.result.text);
        
        let data = {
          speaker: e.result.speakerId,
          text: e.result.text
        }
      };

      conversationTranscriber.startTranscribingAsync(
        () => {
          console.log('Continuous transcription started');

          setLoading(!loading)
          setIsStopButtonDisabled(false)
          setIsStartButtonDisabled(true)

          NotificationManager.success('Started transcription', 'Transcription Started', 5000);

        },
        (err) => {
          console.error('Error starting continuous transcription:', err);
          setError(`Error starting continuous transcription: ${err}`);
        }
      );

      setRecognizer(conversationTranscriber);
    } catch (error) {
      console.error('Error initializing speech services:', error);
      setError(`Error initializing speech services: ${error.message}`);
    }
  };

  const stopListening = () => {
    if (recognizer) {
      recognizer.stopTranscribingAsync(
        () => {
          console.log('Continuous transcription stopped');
          NotificationManager.info('Transcription is Stopped');
          NotificationManager.success('Started Summarization', 'Begin Summarization', 5000);
          setcanTranscribe(true)
        },
        (err) => {

          console.error('Error stopping continuous transcription:', err);
          setError(`Error stopping continuous transcription: ${err}`);
        }
      );
    }
  };

  return (
    <div className='rootdiv'>
      
      <div className={classes.title}>
        <Typography variant="h3">
          Speech Transcripter {" "}
          <span role="img" aria-label="microphone-emoji">
            🎤
            <div className='visualizer'>
            {stream && (
            <BarVisualizer stream={stream} circle={true} />
        )}</div>
          </span>
          
        </Typography>

        <div className='button-visualizer'>
        {!isStartButtonDisabled && (
          <button onClick={startListening}>Start Listening</button>
        )}
        {!isStopButtonDisabled && (
          <button onClick={stopListening}>Stop Listening</button>
        )}
        
        </div>
        <PropagateLoader
          color={"#000000"}
          loading={loading}
          size={15}
        />
      </div>

      <div className={classes.transcriptionContainer}>

        {isStartButtonDisabled && (<h2>Transcription:</h2>)}

        {error && <p className={classes.errorMessage}>Error: {error}</p>}
        <p className={classes.transcriptionText}>{transcription}</p>
      
        {canTranscribe && (<AzureTextSummarization className={classes.transcriptionText}
          documents={[transcription]}
          apiKey={API1}
          endpoint={ENDPOINT}
          setcanTranscribe={setcanTranscribe}
          setLoading={setLoading}
          setIsStopButtonDisabled={setIsStopButtonDisabled}
          setIsStartButtonDisabled={setIsStartButtonDisabled}
        />)}

        <NotificationContainer />
      </div>
    </div>
  );
};

