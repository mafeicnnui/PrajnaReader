import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { getCategory, getVideosByCategory } from '../data/content';

interface RouteParams {
  categoryId: string;
}

const CategoryVideos: React.FC = () => {
  const { categoryId } = useParams<RouteParams>();

  const category = getCategory(categoryId);
  const items = getVideosByCategory(categoryId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{category?.title ?? 'Videos'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{category?.title ?? 'Videos'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList inset>
          {items.map((v) => (
            <IonItem key={v.id} routerLink={`/player/${v.id}`} detail>
              <IonLabel>
                <div>{v.title}</div>
                {v.description ? (
                  <div style={{ fontSize: 12, opacity: 0.7 }}>{v.description}</div>
                ) : null}
              </IonLabel>
            </IonItem>
          ))}
          {items.length === 0 ? (
            <IonItem lines="none">
              <IonLabel>No videos yet.</IonLabel>
            </IonItem>
          ) : null}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CategoryVideos;
