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
import React from 'react';
import { dizangBook } from '../data/dizangBook';

const DizangToc: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/sutra" />
          </IonButtons>
          <IonTitle>{dizangBook.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{dizangBook.title}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {dizangBook.chapters.map((c) => (
            <IonItem key={c.id} routerLink={`/sutra/dizang/${c.id}`} detail>
              <IonLabel className="ion-text-wrap">{c.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DizangToc;
