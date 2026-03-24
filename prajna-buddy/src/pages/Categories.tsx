import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { categories } from '../data/content';

const Categories: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Prajna Buddy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Prajna Buddy</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList inset>
          {categories.map((c) => (
            <IonItem
              key={c.id}
              routerLink={c.id === 'sutra' ? '/sutra/dizang' : `/category/${c.id}`}
              detail
            >
              <IonLabel>{c.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
