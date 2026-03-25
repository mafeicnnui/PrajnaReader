import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { categories } from '../data/content';
import { book, film, flask, library, tv } from 'ionicons/icons';
import './Categories.css';

const categoryIcon: Record<string, string> = {
  sutra: book,
  cartoon: tv,
  culture: library,
  science: flask,
  movie: film,
};

const Categories: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>般若伴读</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="pb-home-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">般若伴读</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList inset className="pb-home-list">
          {categories.map((c) => (
            <IonItem
              key={c.id}
              routerLink={c.id === 'sutra' ? '/sutra' : `/category/${c.id}`}
              detail
              className="pb-home-item"
            >
              <IonIcon className="pb-home-icon" icon={categoryIcon[c.id] ?? book} slot="start" />
              <IonLabel className="pb-home-label">{c.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
