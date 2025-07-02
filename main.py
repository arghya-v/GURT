from voice.voice_assistant import speak, listen
from vision.motion_detector import start_motion_detection

def main():
    speak("Hello. I am GURT.")
    command = listen()

    if "analyze" in command or "camera" in command:
        speak("Activating visual analysis.")
        start_motion_detection()
    elif "stop" in command or "exit" in command:
        speak("Shutting down.")
    else:
        speak(f"I heard: {command}, but I don't know what to do with that.")

if __name__ == "__main__":
    main()
