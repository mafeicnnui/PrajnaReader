import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { playSkipBack, playSkipForward } from 'ionicons/icons';
import { SutraSection } from '../data/dizang';
import {
  dizangBook,
  getChapter,
  getSectionsByIds,
  resolveAudioUrl,
  VoiceId,
} from '../data/dizangBook';
import { cacheAudio, getCachedAudioSrc } from '../services/audioCache';

type ReaderMode = 'text' | 'meaning';

type RouteParams = {
  chapterId: string;
};

type Bookmark = {
  bookId: 'dizang';
  chapterId: string;
  sectionId: string;
  title?: string;
};

function formatTime(seconds: number | undefined): string {
  if (!seconds || !Number.isFinite(seconds) || seconds < 0) return '0:00';
  const s = Math.floor(seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

function svgDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml,${encoded}`;
}

function getVoiceAvatarSrc(voice: VoiceId): string {
  const maleSvg =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
    "<stop offset='0' stop-color='#4F8CFF'/><stop offset='1' stop-color='#2DD4BF'/>" +
    "</linearGradient></defs>" +
    "<rect width='128' height='128' rx='64' fill='url(#g)'/>" +
    "<path d='M28 56c6-22 20-34 36-34s30 12 36 34v12c0 26-18 44-36 44S28 94 28 68V56z' fill='#FFD7B3'/>" +
    "<path d='M24 60c4-26 22-44 40-44s36 18 40 44c-10-8-22-12-40-12s-30 4-40 12z' fill='#1F2937'/>" +
    "<circle cx='48' cy='68' r='5' fill='#111827'/><circle cx='80' cy='68' r='5' fill='#111827'/>" +
    "<path d='M52 88c8 8 16 8 24 0' stroke='#B45309' stroke-width='6' stroke-linecap='round' fill='none'/>" +
    "</svg>";

  const femaleSvg =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
    "<stop offset='0' stop-color='#F472B6'/><stop offset='1' stop-color='#A78BFA'/>" +
    "</linearGradient></defs>" +
    "<rect width='128' height='128' rx='64' fill='url(#g)'/>" +
    "<path d='M28 56c6-22 20-34 36-34s30 12 36 34v12c0 26-18 44-36 44S28 94 28 68V56z' fill='#FFD7B3'/>" +
    "<path d='M22 64c2-30 20-50 42-50s40 20 42 50c-6-10-16-20-26-24-5 8-14 14-24 14s-19-6-24-14c-10 4-20 14-26 24z' fill='#374151'/>" +
    "<circle cx='48' cy='68' r='5' fill='#111827'/><circle cx='80' cy='68' r='5' fill='#111827'/>" +
    "<path d='M52 90c8 6 16 6 24 0' stroke='#BE185D' stroke-width='6' stroke-linecap='round' fill='none'/>" +
    "<circle cx='44' cy='82' r='6' fill='#FB7185' opacity='0.6'/>" +
    "<circle cx='84' cy='82' r='6' fill='#FB7185' opacity='0.6'/>" +
    "</svg>";

  return svgDataUrl(voice === 'male' ? maleSvg : femaleSvg);
}

function tokenizePinyin(pinyin: string): string[] {
  return pinyin
    .replace(/\n/g, ' ')
    .replace(/[，。！？、；：：,!.?;:“”"'（）()]/g, ' ')
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function renderStackedPinyin(text: string, pinyin: string, baseFontSize: number) {
  const syllables = tokenizePinyin(pinyin);
  let i = 0;

  const cellWidthEm = 2.0;
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
      nodes.push(<span key={`n-${idx}`}>{ch}</span>);
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
            overflow: 'visible',
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

function sectionContent(section: SutraSection, mode: ReaderMode): string {
  if (mode === 'meaning') return section.meaning;
  return section.text;
}

const SutraChapterReader: React.FC = () => {
  const { chapterId } = useParams<RouteParams>();
  const chapter = getChapter(chapterId);

  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [showBookmarks, setShowBookmarks] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const [showText, setShowText] = useState<boolean>(true);
  const [showMeaning, setShowMeaning] = useState<boolean>(false);
  const [reciteMode, setReciteMode] = useState<boolean>(false);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [showPinyinAbove, setShowPinyinAbove] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(16);

  const [voice, setVoice] = useState<VoiceId>('male');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined);
  const [audioError, setAudioError] = useState<string | undefined>(undefined);
  const [audioDuration, setAudioDuration] = useState<number | undefined>(undefined);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  const sections = useMemo(() => {
    if (!chapter) return [];
    return getSectionsByIds(chapter.sectionIds);
  }, [chapter]);

  const audioUrl = useMemo(() => {
    if (!chapter?.audio) return undefined;
    return resolveAudioUrl(voice === 'male' ? chapter.audio.male : chapter.audio.female);
  }, [chapter, voice]);

  const audioCacheKey = useMemo(() => {
    if (!chapterId) return undefined;
    return `dizang:${chapterId}:${voice}`;
  }, [chapterId, voice]);

  useEffect(() => {
    setReciteMode(false);
    setRevealedIds({});
    setShowText(true);
    setShowMeaning(false);
    setAudioError(undefined);
    setAudioDuration(undefined);
    setAudioCurrentTime(0);
    setShowBookmarks(false);
  }, [chapterId]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('sutra:bookmarks');
      if (!raw) return;
      const parsed = JSON.parse(raw) as Bookmark[];
      if (Array.isArray(parsed)) setBookmarks(parsed);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sutra:bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      const v = localStorage.getItem('sutra:chapterReader:showMenu');
      if (v === '0') setShowMenu(false);
      if (v === '1') setShowMenu(true);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sutra:chapterReader:showMenu', showMenu ? '1' : '0');
    } catch {
      // ignore
    }
  }, [showMenu]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(`section-${sectionId}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  const isBookmarked = (sectionId: string) => {
    return bookmarks.some((b) => b.bookId === 'dizang' && b.chapterId === chapterId && b.sectionId === sectionId);
  };

  const toggleBookmark = (sectionId: string, title?: string) => {
    if (!chapterId) return;
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.bookId === 'dizang' && b.chapterId === chapterId && b.sectionId === sectionId);
      if (exists) {
        return prev.filter((b) => !(b.bookId === 'dizang' && b.chapterId === chapterId && b.sectionId === sectionId));
      }
      return [...prev, { bookId: 'dizang', chapterId, sectionId, title }];
    });
  };

  const chapterBookmarks = useMemo(() => {
    if (!chapterId) return [];
    return bookmarks.filter((b) => b.bookId === 'dizang' && b.chapterId === chapterId);
  }, [bookmarks, chapterId]);

  const chapters = dizangBook.chapters;

  useEffect(() => {
    let canceled = false;

    async function prepareAudio() {
      if (!audioUrl || !audioCacheKey) {
        setAudioSrc(undefined);
        setAudioError(undefined);
        setAudioDuration(undefined);
        return;
      }

      const cached = await getCachedAudioSrc(audioCacheKey);
      if (canceled) return;

      if (cached) {
        setAudioSrc(cached);
        setAudioError(undefined);
        return;
      }

      setAudioSrc(audioUrl);
      setAudioError(undefined);
    }

    void prepareAudio();

    return () => {
      canceled = true;
    };
  }, [audioUrl, audioCacheKey]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      const mediaError = el.error;
      if (!mediaError) {
        setAudioError('音频加载失败（未知原因）。');
        return;
      }
      const code = mediaError.code;
      const msg =
        code === 1
          ? '音频加载被中止。'
          : code === 2
            ? '网络错误导致音频加载失败（可能是 404 或网络不可达）。'
            : code === 3
              ? '音频解码失败（格式不支持或文件损坏）。'
              : code === 4
                ? '音频资源不可用或格式不受支持。'
                : '音频加载失败。';
      setAudioError(msg);
    };
    const onLoadedMetadata = () => {
      if (Number.isFinite(el.duration)) setAudioDuration(el.duration);
    };
    const onTimeUpdate = () => {
      if (isSeeking) return;
      setAudioCurrentTime(el.currentTime || 0);
    };
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onPause);
    el.addEventListener('error', onError);
    el.addEventListener('loadedmetadata', onLoadedMetadata);
    el.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onPause);
      el.removeEventListener('error', onError);
      el.removeEventListener('loadedmetadata', onLoadedMetadata);
      el.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [isSeeking]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = playbackRate;
  }, [playbackRate]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/sutra/dizang" />
          </IonButtons>
          <IonTitle>{chapter?.title ?? '章节阅读'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{chapter?.title ?? '章节阅读'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonToolbar style={{ '--min-height': '48px', fontSize: 14 } as any}>
          <IonButtons slot="start">
            <IonButton size="small" onClick={() => setFontSize((s) => Math.max(14, s - 1))}>
              A-
            </IonButton>
            <IonButton size="small" onClick={() => setFontSize((s) => Math.min(24, s + 1))}>
              A+
            </IonButton>
            <IonButton size="small" onClick={() => setShowMenu((v) => !v)}>
              {showMenu ? '隐藏目录' : '目录'}
            </IonButton>
          </IonButtons>

          <div
            slot="end"
            style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'nowrap', fontSize: 14 }}
          >
            <IonToggle
              style={{ fontSize: 14 } as any}
              checked={showPinyinAbove}
              onIonChange={(e) => setShowPinyinAbove(e.detail.checked)}
            >
              显示拼音
            </IonToggle>
            <IonToggle
              style={{ fontSize: 14 } as any}
              checked={reciteMode}
              onIonChange={(e) => {
                const next = e.detail.checked;
                setReciteMode(next);
                if (!next) setRevealedIds({});
              }}
            >
              背诵模式
            </IonToggle>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, opacity: 0.8, whiteSpace: 'nowrap' }}>普通话</span>
              <IonSelect
                value={voice}
                interface="popover"
                style={{ fontSize: 14 } as any}
                onIonChange={(e) => setVoice(e.detail.value as VoiceId)}
              >
                <IonSelectOption value="male">男声</IonSelectOption>
                <IonSelectOption value="female">女声</IonSelectOption>
              </IonSelect>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 4 }}>
              <IonButton
                size="small"
                fill="clear"
                disabled={!audioUrl}
                style={{ width: 34, height: 34, minWidth: 34, '--padding-start': '0px', '--padding-end': '0px' } as any}
                onClick={async () => {
                  const el = audioRef.current;
                  if (!el) return;
                  if (el.paused) {
                    if (audioUrl && audioCacheKey) {
                      try {
                        const src = await cacheAudio(audioCacheKey, audioUrl);
                        if (el.src !== src) el.src = src;
                      } catch {
                        if (el.src !== (audioSrc ?? audioUrl)) el.src = audioSrc ?? audioUrl;
                      }
                    }
                    void el.play();
                  } else {
                    el.pause();
                  }
                }}
              >
                <img
                  alt={voice === 'male' ? '男声' : '女声'}
                  src={getVoiceAvatarSrc(voice)}
                  style={{ width: 26, height: 26, borderRadius: 999, display: 'block' }}
                />
              </IonButton>

              <IonButton
                size="small"
                fill="clear"
                disabled={!audioUrl}
                onClick={() => {
                  const el = audioRef.current;
                  if (!el) return;
                  el.currentTime = Math.max(0, (el.currentTime || 0) - 15);
                }}
              >
                <IonIcon slot="icon-only" icon={playSkipBack} />
              </IonButton>

              <IonButton
                size="small"
                fill="clear"
                disabled={!audioUrl}
                onClick={() => {
                  const el = audioRef.current;
                  if (!el) return;
                  const d = Number.isFinite(el.duration) ? el.duration : 0;
                  el.currentTime = Math.min(d || 0, (el.currentTime || 0) + 15);
                }}
              >
                <IonIcon slot="icon-only" icon={playSkipForward} />
              </IonButton>

              <div style={{ fontSize: 12, opacity: 0.8, whiteSpace: 'nowrap' }}>
                {formatTime(audioCurrentTime)} / {formatTime(audioDuration)}
              </div>

              <div style={{ width: 160, maxWidth: '18vw', minWidth: 120 }}>
                <IonRange
                  min={0}
                  max={audioDuration && Number.isFinite(audioDuration) ? audioDuration : 0}
                  value={audioCurrentTime}
                  disabled={!audioDuration || !Number.isFinite(audioDuration) || audioDuration <= 0}
                  onIonKnobMoveStart={() => setIsSeeking(true)}
                  onIonKnobMoveEnd={(e) => {
                    const el = audioRef.current;
                    if (el) {
                      const v = typeof e.detail.value === 'number' ? e.detail.value : 0;
                      el.currentTime = v;
                      setAudioCurrentTime(v);
                    }
                    setIsSeeking(false);
                  }}
                  onIonChange={(e) => {
                    if (!isSeeking) return;
                    const v = typeof e.detail.value === 'number' ? e.detail.value : 0;
                    setAudioCurrentTime(v);
                  }}
                />
              </div>

              <IonSelect
                value={playbackRate}
                interface="popover"
                style={{ fontSize: 14, minWidth: 74 } as any}
                onIonChange={(e) => setPlaybackRate(Number(e.detail.value))}
              >
                <IonSelectOption value={0.75}>0.75x</IonSelectOption>
                <IonSelectOption value={1}>1.0x</IonSelectOption>
                <IonSelectOption value={1.25}>1.25x</IonSelectOption>
                <IonSelectOption value={1.5}>1.5x</IonSelectOption>
              </IonSelect>
            </div>
          </div>
        </IonToolbar>

        <audio ref={audioRef} src={audioSrc ?? audioUrl} preload="none" />

        <div style={{ padding: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <IonChip color={showText ? 'primary' : undefined} onClick={() => setShowText((v) => !v)}>
            <IonLabel>经文</IonLabel>
          </IonChip>
          <IonChip color={showMeaning ? 'primary' : undefined} onClick={() => setShowMeaning((v) => !v)}>
            <IonLabel>白话</IonLabel>
          </IonChip>
          <IonChip
            color={showBookmarks ? 'primary' : undefined}
            onClick={() => {
              setShowBookmarks((v) => {
                const next = !v;
                if (next) scrollToTop();
                return next;
              });
            }}
          >
            <IonLabel>收藏{chapterBookmarks.length ? `(${chapterBookmarks.length})` : ''}</IonLabel>
          </IonChip>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 12,
            padding: '0 12px 12px 12px',
            minHeight: 'calc(100vh - 260px)',
          }}
        >
          {showMenu ? (
            <div
              style={{
                width: 260,
                maxWidth: '45vw',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                paddingRight: 12,
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 320px)',
              }}
            >
              <IonList inset>
                {chapters.map((c) => (
                  <IonItem
                    key={`ch-${c.id}`}
                    routerLink={`/sutra/dizang/${c.id}`}
                    detail={false}
                    color={c.id === chapterId ? 'primary' : undefined}
                  >
                    <IonLabel className="ion-text-wrap">{c.title}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </div>
          ) : null}

          <div style={{ flex: 1, minWidth: 0 }}>
            {showBookmarks ? (
              <IonList inset>
                <IonItem lines="none">
                  <IonLabel style={{ fontWeight: 600 }}>收藏</IonLabel>
                  <IonButton slot="end" size="small" fill="clear" onClick={() => setShowBookmarks(false)}>
                    关闭
                  </IonButton>
                </IonItem>
                {chapterBookmarks.length ? (
                  chapterBookmarks
                    .slice()
                    .reverse()
                    .map((b) => (
                      <IonItem
                        key={`bm-${b.chapterId}-${b.sectionId}`}
                        button
                        detail={false}
                        onClick={() => {
                          setShowBookmarks(false);
                          scrollToSection(b.sectionId);
                        }}
                      >
                        <IonLabel className="ion-text-wrap">{b.title || b.sectionId}</IonLabel>
                        <IonButton
                          slot="end"
                          fill="clear"
                          size="small"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleBookmark(b.sectionId);
                          }}
                        >
                          取消
                        </IonButton>
                      </IonItem>
                    ))
                ) : (
                  <IonItem lines="none">
                    <IonLabel>本章暂无收藏。</IonLabel>
                  </IonItem>
                )}
              </IonList>
            ) : (
              <IonList inset>
                {sections.map((s) => {
                  const revealed = !reciteMode || !!revealedIds[s.id];
                  const showPinyin = showText && showPinyinAbove;

                  return (
                    <IonItem
                      key={s.id}
                      id={`section-${s.id}`}
                      button={reciteMode}
                      detail={false}
                      onClick={() => {
                        if (!reciteMode) return;
                        setRevealedIds((prev) => ({ ...prev, [s.id]: !prev[s.id] }));
                      }}
                    >
                      <IonLabel className="ion-text-wrap">
                        {s.title ? <div style={{ fontWeight: 600, marginBottom: 8 }}>{s.title}</div> : null}

                        {showText ? (
                          <div
                            style={{
                              whiteSpace: 'pre-wrap',
                              lineHeight: 1.8,
                              fontSize,
                              opacity: revealed ? 1 : 0.15,
                              userSelect: 'text',
                            }}
                          >
                            {showPinyin ? renderStackedPinyin(s.text, s.pinyin, fontSize) : s.text}
                          </div>
                        ) : null}

                        {showMeaning ? (
                          <div
                            style={{
                              whiteSpace: 'pre-wrap',
                              lineHeight: 1.8,
                              fontSize,
                              opacity: 0.9,
                              userSelect: 'text',
                              marginTop: showText ? 10 : 0,
                            }}
                          >
                            {s.meaning}
                          </div>
                        ) : null}

                        {!showText && !showMeaning ? (
                          <div style={{ fontSize: 12, opacity: 0.6 }}>未选择显示内容。</div>
                        ) : null}
                        {reciteMode ? (
                          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
                            点击此段 {revealed ? '隐藏' : '显示'}
                          </div>
                        ) : null}
                      </IonLabel>
                      <IonButton
                        slot="end"
                        fill="clear"
                        size="small"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleBookmark(s.id, s.title);
                        }}
                      >
                        {isBookmarked(s.id) ? '已收藏' : '收藏'}
                      </IonButton>
                    </IonItem>
                  );
                })}
                {!chapter ? (
                  <IonItem lines="none">
                    <IonLabel>章节不存在。</IonLabel>
                  </IonItem>
                ) : null}
                {chapter && sections.length === 0 ? (
                  <IonItem lines="none">
                    <IonLabel>本章内容待补充。</IonLabel>
                  </IonItem>
                ) : null}
              </IonList>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SutraChapterReader;
