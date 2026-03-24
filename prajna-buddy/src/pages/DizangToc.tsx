import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { dizangBook, getChapter, resolveAudioUrl, VoiceId } from '../data/dizangBook';
import { cacheAudio, getCachedAudioSrc } from '../services/audioCache';

type LanguageId = 'mandarin';

const DizangToc: React.FC = () => {
  const [language, setLanguage] = useState<LanguageId>('mandarin');
  const [voice, setVoice] = useState<VoiceId>('male');
  const [selectedChapterId, setSelectedChapterId] = useState<string | undefined>(undefined);
  const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined);
  const [audioError, setAudioError] = useState<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem('sutra:toc:language');
      if (v === 'mandarin') setLanguage('mandarin');
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sutra:toc:language', language);
    } catch {
      // ignore
    }
  }, [language]);

  const audioUrl = useMemo(() => {
    if (!selectedChapterId) return undefined;
    const chapter = getChapter(selectedChapterId);
    if (!chapter?.audio) return undefined;
    const a = voice === 'male' ? chapter.audio.male : chapter.audio.female;
    return resolveAudioUrl(a);
  }, [selectedChapterId, voice]);

  const audioCacheKey = useMemo(() => {
    if (!selectedChapterId) return undefined;
    return `dizang:${selectedChapterId}:${voice}`;
  }, [selectedChapterId, voice]);

  useEffect(() => {
    let canceled = false;
    async function prepare() {
      setAudioError(undefined);
      if (!audioUrl || !audioCacheKey) {
        setAudioSrc(undefined);
        return;
      }
      const cached = await getCachedAudioSrc(audioCacheKey);
      if (canceled) return;
      setAudioSrc(cached ?? audioUrl);
    }
    void prepare();
    return () => {
      canceled = true;
    };
  }, [audioUrl, audioCacheKey]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => setAudioError('音频加载失败（资源不可用或格式不受支持）。');
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onPause);
    el.addEventListener('error', onError);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onPause);
      el.removeEventListener('error', onError);
    };
  }, []);

  const playChapter = async (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setAudioError(undefined);

    const url = (() => {
      const chapter = getChapter(chapterId);
      if (!chapter?.audio) return undefined;
      return resolveAudioUrl(voice === 'male' ? chapter.audio.male : chapter.audio.female);
    })();
    if (!url) {
      setAudioError('本章未配置音频。');
      return;
    }

    const key = `dizang:${chapterId}:${voice}`;
    const el = audioRef.current;
    if (!el) return;

    try {
      const src = await cacheAudio(key, url);
      if (el.src !== src) el.src = src;
    } catch {
      if (el.src !== url) el.src = url;
    }

    try {
      await el.play();
    } catch {
      setAudioError('播放失败。');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{dizangBook.title}</IonTitle>
        </IonToolbar>

        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              disabled={!audioUrl}
              onClick={() => {
                const el = audioRef.current;
                if (!el) return;
                if (el.paused) void el.play();
                else el.pause();
              }}
            >
              {isPlaying ? '暂停' : '播放'}
            </IonButton>
          </IonButtons>

          <div slot="end" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <IonLabel style={{ fontSize: 12, opacity: 0.8 }}>普通话</IonLabel>
            <IonSelect
              value={language}
              interface="popover"
              onIonChange={(e) => setLanguage(e.detail.value as LanguageId)}
            >
              <IonSelectOption value="mandarin">普通话</IonSelectOption>
            </IonSelect>

            <IonSelect value={voice} interface="popover" onIonChange={(e) => setVoice(e.detail.value as VoiceId)}>
              <IonSelectOption value="male">男声</IonSelectOption>
              <IonSelectOption value="female">女声</IonSelectOption>
            </IonSelect>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{dizangBook.title}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <audio ref={audioRef} src={audioSrc ?? audioUrl} preload="none" />
        {audioError ? (
          <div style={{ padding: '8px 12px' }}>
            <IonText color="danger">
              <div style={{ fontSize: 12 }}>{audioError}</div>
            </IonText>
          </div>
        ) : null}

        <IonList inset>
          {dizangBook.chapters.map((c) => (
            <IonItem key={c.id} routerLink={`/sutra/dizang/${c.id}`} detail>
              <IonLabel className="ion-text-wrap">{c.title}</IonLabel>
              <IonButton
                slot="end"
                fill="clear"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void playChapter(c.id);
                }}
              >
                播放
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DizangToc;
