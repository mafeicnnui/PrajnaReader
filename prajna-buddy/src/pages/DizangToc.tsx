import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/react';
import React from 'react';
import { dizangBook } from '../data/dizangBook';

const DizangToc: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList inset>
          <IonItem routerLink="/home" detail>
            <IonLabel>返回</IonLabel>
          </IonItem>
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
