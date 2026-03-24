import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { getVideo } from '../data/content';

interface RouteParams {
  videoId: string;
}

const VideoPlayer: React.FC = () => {
  const { videoId } = useParams<RouteParams>();
  const video = getVideo(videoId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{video?.title ?? 'Player'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{video?.title ?? 'Player'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {video ? (
          <div style={{ padding: 16 }}>
            <video
              controls
              playsInline
              style={{ width: '100%', maxHeight: '60vh', background: '#000' }}
              src={video.url}
            />
            {video.description ? (
              <div style={{ marginTop: 12, opacity: 0.8 }}>{video.description}</div>
            ) : null}
            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6, wordBreak: 'break-all' }}>
              {video.url}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16 }}>Video not found.</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default VideoPlayer;
