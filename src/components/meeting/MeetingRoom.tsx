// "use client";
// import { useState, useEffect } from "react";
// import {
//   // CallControls,
//   CallParticipantsList,
//   CallStatsButton,
//   CallingState,
//   PaginatedGridLayout,
//   SpeakerLayout,
//   useCall,
//   useCallStateHooks,
// } from "@stream-io/video-react-sdk";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Users, LayoutList } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import EndCallButton from "./EndCallButton";
// import { LoaderSpinnerScreen } from "../ui/loader";
// import { apiPatch } from "@/utils/api";
// import { CallControls } from "./CallControls";

// type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

// const MeetingRoom = () => {
//   const searchParams = useSearchParams();
//   const isPersonalRoom = !!searchParams.get("personal");
//   const router = useRouter();
//   const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
//   const [showParticipants, setShowParticipants] = useState(false);
//   const { useCallCallingState, useLocalParticipant } = useCallStateHooks();
//   const call = useCall();
//   const callingState = useCallCallingState();
//   const localParticipant = useLocalParticipant();
//   const sessionId = searchParams.get("sessionId");

//   const isInstructor =
//     localParticipant &&
//     call?.state.createdBy &&
//     localParticipant.userId === call?.state.createdBy.id;

//   const updateSessionStatus = async () => {
//     if (!sessionId) return;

//     const response = await apiPatch(`/api/sessions/status/${sessionId}`, {
//       status: "completed",
//     });

//     let fetchedListingId = null;
//     if (response?.data) {
//       fetchedListingId = response.data.updatedSession?.listingId;
//     }

//     if (response.error) {
//       console.error("Failed to update session status:", response.error);
//     }

//     return fetchedListingId;
//   };

//   const handleCallEnded = async () => {
//     // Get listingId before redirecting
//     const listingId = await updateSessionStatus();

//     if (isInstructor) {
//       router.push("/"); // Redirect instructor to home
//     } else {
//       // Only add listingId to URL if it's not null
//       const feedbackUrl = listingId
//         ? `/feedback?listingId=${listingId}`
//         : "/feedback";
//       router.push(feedbackUrl);
//     }
//   };

//   useEffect(() => {
//     if (!call) return;

//     call.on("call.ended", handleCallEnded);

//     return () => {
//       call.off("call.ended", handleCallEnded);
//     };
//   }, [call, router, localParticipant]);

//   if (callingState !== CallingState.JOINED) return <LoaderSpinnerScreen />;

//   const CallLayout = () => {
//     switch (layout) {
//       case "grid":
//         return <PaginatedGridLayout />;
//       case "speaker-right":
//         return <SpeakerLayout participantsBarPosition="left" />;
//       default:
//         return <SpeakerLayout participantsBarPosition="right" />;
//     }
//   };

//   return (
//     <section className="relative w-full h-screen pt-4 overflow-hidden bg-black text-white">
//       <div className="relative flex items-center justify-center size-full">
//         <div className="flex size-full max-w-[1000px] items-center">
//           <CallLayout />
//         </div>
//         {showParticipants && (
//           <div className="w-[300px] h-[calc(100vh-86px)] ml-2 bg-[#19232d] py-6 px-4 rounded-2xl">
//             <CallParticipantsList onClose={() => setShowParticipants(false)} />
//           </div>
//         )}
//       </div>
//       <div className="fixed bottom-0 flex flex-wrap items-center justify-center w-full gap-5">
//         <CallControls onLeave={handleCallEnded} />
//         <DropdownMenu>
//           <div className="flex items-center">
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//               <LayoutList size={20} className="text-white" />
//             </DropdownMenuTrigger>
//           </div>
//           <DropdownMenuContent className="text-white border-dark-1 bg-dark-1">
//             {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
//               <div key={index}>
//                 <DropdownMenuItem
//                   onClick={() =>
//                     setLayout(item.toLowerCase() as CallLayoutType)
//                   }
//                 >
//                   {item}
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator className="border-dark-1" />
//               </div>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//         <div className="relative">
//           <CallStatsButton />
//         </div>
//         <button onClick={() => setShowParticipants((prev) => !prev)}>
//           <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//             <Users size={20} className="text-white" />
//           </div>
//         </button>
//         {!isPersonalRoom && <EndCallButton />}
//       </div>
//     </section>
//   );
// };

// export default MeetingRoom;

// "use client";
// import { useState, useEffect } from "react";
// import {
//   CallControls,
//   CallParticipantsList,
//   CallStatsButton,
//   CallingState,
//   PaginatedGridLayout,
//   SpeakerLayout,
//   useCall,
//   useCallStateHooks,
// } from "@stream-io/video-react-sdk";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Users, LayoutList } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import EndCallButton from "./EndCallButton";
// import { LoaderSpinnerScreen } from "../ui/loader";

// type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

// const MeetingRoom = () => {
//   const searchParams = useSearchParams();
//   const isPersonalRoom = !!searchParams.get("personal");
//   const router = useRouter();
//   const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
//   const [showParticipants, setShowParticipants] = useState(false);
//   const { useCallCallingState } = useCallStateHooks();
//   const call = useCall();
//   const callingState = useCallCallingState();

//   useEffect(() => {
//     if (!call) return;

//     const handleCallEnded = () => {
//       router.push("/");
//     };

//     call.on("call.ended", handleCallEnded);

//     return () => {
//       call.off("call.ended", handleCallEnded);
//     };
//   }, [call, router]);

//   if (callingState !== CallingState.JOINED) return <LoaderSpinnerScreen />;

//   const CallLayout = () => {
//     switch (layout) {
//       case "grid":
//         return <PaginatedGridLayout />;
//       case "speaker-right":
//         return <SpeakerLayout participantsBarPosition="left" />;
//       default:
//         return <SpeakerLayout participantsBarPosition="right" />;
//     }
//   };

//   return (
//     <section className="relative w-full h-screen pt-4 overflow-hidden bg-black text-white">
//       <div className="relative flex items-center justify-center size-full">
//         <div className="flex size-full max-w-[1000px] items-center">
//           <CallLayout />
//         </div>
//         {showParticipants && (
//           <div className="w-[300px] h-[calc(100vh-86px)] ml-2 bg-[#19232d] py-6 px-4 rounded-2xl">
//             <CallParticipantsList onClose={() => setShowParticipants(false)} />
//           </div>
//         )}
//       </div>
//       <div className="fixed bottom-0 flex flex-wrap items-center justify-center w-full gap-5">
//         <CallControls onLeave={() => router.push("/")} />
//         <DropdownMenu>
//           <div className="flex items-center">
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//               <LayoutList size={20} className="text-white" />
//             </DropdownMenuTrigger>
//           </div>
//           <DropdownMenuContent className="text-white border-dark-1 bg-dark-1">
//             {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
//               <div key={index}>
//                 <DropdownMenuItem
//                   onClick={() =>
//                     setLayout(item.toLowerCase() as CallLayoutType)
//                   }
//                 >
//                   {item}
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator className="border-dark-1" />
//               </div>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//         <div className="relative">
//           <CallStatsButton />
//         </div>
//         <button onClick={() => setShowParticipants((prev) => !prev)}>
//           <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//             <Users size={20} className="text-white" />
//           </div>
//         </button>
//         {!isPersonalRoom && <EndCallButton />}
//       </div>
//     </section>
//   );
// };

// export default MeetingRoom;

"use client";
import { useState, useEffect } from "react";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import { Users, LayoutList } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import EndCallButton from "./EndCallButton";
import { LoaderSpinnerScreen } from "../ui/loader";
import { apiPatch } from "@/utils/api";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const call = useCall();
  const callingState = useCallCallingState();
  const sessionId = searchParams.get("sessionId");

  // Check if current user is the instructor (call creator) using call state directly
  const isInstructor =
    call?.state.createdBy && call?.currentUserId === call?.state.createdBy.id;

  const updateSessionStatus = async () => {
    if (!sessionId) return;

    try {
      const response = await apiPatch(`/api/sessions/status/${sessionId}`, {
        status: "completed",
      });

      let fetchedListingId = null;
      if (response?.data) {
        fetchedListingId = response.data.updatedSession?.listingId;
      }

      if (response.error) {
        console.error("Failed to update session status:", response.error);
      }

      return fetchedListingId;
    } catch (error) {
      console.error("Error updating session status:", error);
      return null;
    }
  };

  const handleCallEnded = async () => {
    // Get listingId before redirecting
    const listingId = await updateSessionStatus();

    if (isInstructor) {
      router.push("/"); // Redirect instructor to home
    } else {
      // Only add listingId to URL if it's not null
      const feedbackUrl = listingId
        ? `/feedback?listingId=${listingId}`
        : "/feedback";
      router.push(feedbackUrl);
    }
  };

  useEffect(() => {
    if (!call) return;

    call.on("call.ended", handleCallEnded);

    return () => {
      call.off("call.ended", handleCallEnded);
    };
  }, [call, router, isInstructor, sessionId]);

  if (callingState !== CallingState.JOINED) return <LoaderSpinnerScreen />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative w-full h-screen pt-4 overflow-hidden bg-black text-white">
      <div className="relative flex items-center justify-center size-full">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        {showParticipants && (
          <div className="w-[300px] h-[calc(100vh-86px)] ml-2 bg-[#19232d] py-6 px-4 rounded-2xl">
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        )}
      </div>
      <div className="fixed bottom-0 flex flex-wrap items-center justify-center w-full gap-5">
        <CallControls onLeave={handleCallEnded} />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="text-white border-dark-1 bg-dark-1">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative">
          <CallStatsButton />
        </div>
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
