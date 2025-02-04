import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { ScreenShare, ScreenShareOff } from "lucide-react";

export const CustomScreenShareButton = () => {
  const { useScreenShareState, useHasOngoingScreenShare } = useCallStateHooks();
  const { screenShare, isMute: isScreenSharing } = useScreenShareState();

  // determine, whether somebody else is sharing their screen
  const isSomeoneScreenSharing = useHasOngoingScreenShare();
  return (
    <button
      // disable the button in case I'm not the one sharing the screen
      disabled={!isScreenSharing && isSomeoneScreenSharing}
      onClick={() => screenShare.toggle()}
    >
      {isScreenSharing ? <ScreenShare /> : <ScreenShareOff />}
    </button>
  );
};
