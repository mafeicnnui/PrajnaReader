import {
  IonBackButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import React, { useMemo, useState } from 'react';
import { dizangSections, dizangSutraTitle, SutraSection } from '../data/dizang';

type ReaderMode = 'text' | 'pinyin' | 'meaning';

function sectionContent(section: SutraSection, mode: ReaderMode): string {
  if (mode === 'pinyin') return section.pinyin;
  if (mode === 'meaning') return section.meaning;
  return section.text;
}

const SutraReader: React.FC = () => {
  const [mode, setMode] = useState<ReaderMode>('text');
  const [reciteMode, setReciteMode] = useState<boolean>(false);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const sections = useMemo(() => dizangSections, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{dizangSutraTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{dizangSutraTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div style={{ padding: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <IonChip color={mode === 'text' ? 'primary' : undefined} onClick={() => setMode('text')}>
            <IonLabel>经文</IonLabel>
          </IonChip>
          <IonChip color={mode === 'pinyin' ? 'primary' : undefined} onClick={() => setMode('pinyin')}>
            <IonLabel>拼音</IonLabel>
          </IonChip>
          <IonChip color={mode === 'meaning' ? 'primary' : undefined} onClick={() => setMode('meaning')}>
            <IonLabel>白话</IonLabel>
          </IonChip>

          <div style={{ marginLeft: 'auto' }}>
            <IonToggle
              checked={reciteMode}
              onIonChange={(e) => {
                const next = e.detail.checked;
                setReciteMode(next);
                if (!next) setRevealedIds({});
              }}
            >
              背诵模式
            </IonToggle>
          </div>
        </div>

        <IonList inset>
          {sections.map((s) => {
            const content = sectionContent(s, mode);
            const revealed = !reciteMode || !!revealedIds[s.id];

            return (
              <IonItem
                key={s.id}
                button={reciteMode}
                detail={false}
                onClick={() => {
                  if (!reciteMode) return;
                  setRevealedIds((prev) => ({ ...prev, [s.id]: !prev[s.id] }));
                }}
              >
                <IonLabel className="ion-text-wrap">
                  {s.title ? <div style={{ fontWeight: 600, marginBottom: 8 }}>{s.title}</div> : null}
                  <div
                    style={{
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.8,
                      fontSize: mode === 'pinyin' ? 14 : 16,
                      letterSpacing: mode === 'pinyin' ? 0.2 : undefined,
                      opacity: revealed ? 1 : 0.15,
                      userSelect: 'text',
                    }}
                  >
                    {content}
                  </div>
                  {reciteMode ? (
                    <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
                      点击此段 {revealed ? '隐藏' : '显示'}
                    </div>
                  ) : null}
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SutraReader;
