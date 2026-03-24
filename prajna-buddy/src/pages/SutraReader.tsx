import {
  IonBackButton,
  IonButtons,
  IonButton,
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

type ReaderMode = 'text' | 'meaning';

function sectionContent(section: SutraSection, mode: ReaderMode): string {
  if (mode === 'meaning') return section.meaning;
  return section.text;
}

function tokenizePinyin(pinyin: string): string[] {
  return pinyin
    .replace(/\n/g, ' ')
    .replace(/[，。！？、；：：,!.?;:“”"'（）()]/g, ' ')
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function renderRubyText(text: string, pinyin: string) {
  const syllables = tokenizePinyin(pinyin);
  let i = 0;

  const nodes: React.ReactNode[] = [];
  for (let idx = 0; idx < text.length; idx++) {
    const ch = text[idx];
    if (ch === '\n') {
      nodes.push(<br key={`br-${idx}`} />);
      continue;
    }

    const isHan = /[\u4e00-\u9fff]/.test(ch);
    const rt = isHan ? syllables[i++] : '';

    if (isHan) {
      nodes.push(
        <ruby key={`r-${idx}`} style={{ rubyPosition: 'over' }}>
          {ch}
          <rt style={{ fontSize: '0.6em', lineHeight: 1.1 }}>{rt}</rt>
        </ruby>
      );
    } else {
      nodes.push(
        <span key={`s-${idx}`}>
          {ch}
        </span>
      );
    }
  }

  return nodes;
}

function renderStackedPinyin(text: string, pinyin: string, baseFontSize: number) {
  const syllables = tokenizePinyin(pinyin);
  let i = 0;

  const cellWidthEm = 1.6;
  const pyColor = 'var(--ion-color-medium)';

  const nodes: React.ReactNode[] = [];
  for (let idx = 0; idx < text.length; idx++) {
    const ch = text[idx];

    if (ch === '\n') {
      nodes.push(<br key={`br-${idx}`} />);
      continue;
    }

    const isHan = /[\u4e00-\u9fff]/.test(ch);
    if (!isHan) {
      nodes.push(
        <span key={`n-${idx}`}>
          {ch}
        </span>
      );
      continue;
    }

    const rt = syllables[i++] ?? '';
    nodes.push(
      <span
        key={`c-${idx}`}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: `${cellWidthEm}em`,
          verticalAlign: 'bottom',
        }}
      >
        <span
          style={{
            fontSize: Math.max(11, Math.round(baseFontSize * 0.6)),
            lineHeight: 1.1,
            color: pyColor,
            whiteSpace: 'nowrap',
            maxWidth: `${cellWidthEm}em`,
            overflow: 'hidden',
            textOverflow: 'clip',
          }}
        >
          {rt}
        </span>
        <span style={{ lineHeight: 1.3 }}>{ch}</span>
      </span>
    );
  }

  return nodes;
}

const SutraReader: React.FC = () => {
  const [mode, setMode] = useState<ReaderMode>('text');
  const [reciteMode, setReciteMode] = useState<boolean>(false);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [showPinyinAbove, setShowPinyinAbove] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(16);

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

        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => setFontSize((s) => Math.max(14, s - 1))}
            >
              A-
            </IonButton>
            <IonButton
              onClick={() => setFontSize((s) => Math.min(24, s + 1))}
            >
              A+
            </IonButton>
          </IonButtons>

          <div
            slot="end"
            style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'nowrap' }}
          >
            <IonToggle
              checked={showPinyinAbove}
              onIonChange={(e) => setShowPinyinAbove(e.detail.checked)}
            >
              显示拼音
            </IonToggle>
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
        </IonToolbar>

        <div style={{ padding: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <IonChip color={mode === 'text' ? 'primary' : undefined} onClick={() => setMode('text')}>
            <IonLabel>经文</IonLabel>
          </IonChip>
          <IonChip color={mode === 'meaning' ? 'primary' : undefined} onClick={() => setMode('meaning')}>
            <IonLabel>白话</IonLabel>
          </IonChip>
        </div>

        <IonList inset>
          {sections.map((s) => {
            const content = sectionContent(s, mode);
            const revealed = !reciteMode || !!revealedIds[s.id];
            const showPinyin = mode === 'text' && showPinyinAbove;

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
                      fontSize,
                      opacity: revealed ? 1 : 0.15,
                      userSelect: 'text',
                    }}
                  >
                    {showPinyin ? renderStackedPinyin(s.text, s.pinyin, fontSize) : content}
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
