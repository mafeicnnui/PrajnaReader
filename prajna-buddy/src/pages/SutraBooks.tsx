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
        <IonList style={{ background: 'transparent', margin: 0, padding: 0 }}>
          {books.map((b) => (
            <IonItem 
              key={b.id} 
              routerLink={`/sutra/${b.id}`} 
              detail
              lines="full"
              button={false}
              className="ion-no-padding"
            >
              <IonLabel className="ion-text-wrap">{b.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SutraBooks;
