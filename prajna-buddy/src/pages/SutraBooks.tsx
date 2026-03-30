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

const SutraBooks: React.FC = () => {
  const books = [dizangBook];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>经典阅读</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense" style={{ background: 'var(--ion-background-color)' } as any}>
          <IonToolbar style={{ '--background': 'var(--ion-background-color)' } as any}>
            <IonTitle size="large">经典阅读</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList inset style={{ '--ion-background-color': 'var(--ion-background-color)', '--ion-item-background': 'var(--ion-item-background, var(--ion-background-color))' } as any}>
          {books.map((b) => (
            <IonItem key={b.id} routerLink={`/sutra/${b.id}`} detail>
              <IonLabel className="ion-text-wrap">{b.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SutraBooks;
