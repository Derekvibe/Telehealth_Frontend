import React from 'react';
import {
  useCall,
  useCallStateHooks,
  CallingState,
} from '@stream-io/video-react-sdk';

export function MyUILayout() {
  const call = useCall();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return <div>Joining call...</div>;
  }

  return (
    <div style={{ padding: '1rem', fontSize: '1.2rem' }}>
      ✅ Call "<strong>{call?.id}</strong>" has <strong>{participantCount}</strong> participants.
    </div>
  );
}
