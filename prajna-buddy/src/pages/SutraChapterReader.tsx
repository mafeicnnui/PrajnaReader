import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  add,
  list,
  play,
  pause,
  playSkipBack,
  playSkipForward,
  repeat,
  remove,
  star,
  starOutline,
  eye,
  school,
} from 'ionicons/icons';
import { SutraSection } from '../data/dizang';
import {
  dizangBook,
  getChapter,
  getSectionsByIds,
  VoiceId,
} from '../data/dizangBook';

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

const SutraChapterReader: React.FC = () => {
  const { chapterId } = useParams<RouteParams>();
  const chapter = getChapter(chapterId);

  // 调试：显示环境变量配置
  useEffect(() => {
    console.log('=== 音频配置信息 ===');
    console.log('TTS API URL:', import.meta.env.VITE_TTS_API_URL || '未配置');
    console.log('Audio Base URL:', import.meta.env.VITE_AUDIO_BASE_URL || '未配置');
    console.log('==================');
  }, []);

  const [showChapterPicker, setShowChapterPicker] = useState<boolean>(false);
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
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | undefined>(undefined);
  const [audioDuration, setAudioDuration] = useState<number | undefined>(undefined);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [loopAudio, setLoopAudio] = useState<boolean>(false);
  const [continuousPlay, setContinuousPlay] = useState<boolean>(true);

  const [presentToast] = useIonToast();

  const sections = useMemo(() => {
    if (!chapter) return [];
    return getSectionsByIds(chapter.sectionIds);
  }, [chapter]);

  // 检测是否是 iOS PWA 模式
  const isIOSPWA = (): boolean => {
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isStandalone = (window.navigator as any).standalone === true || 
                        window.matchMedia('(display-mode: standalone)').matches;
    return isIOS && isStandalone;
  };

  // 构建小段音频URL
  const getSectionAudioUrl = (sectionId: string, voiceType: VoiceId): string => {
    // 支持从远程服务器或本地加载音频
    // 优先级：TTS API > 远程静态文件 > 本地静态文件
    
    // 临时硬编码用于测试（正式环境请使用环境变量）
    const ttsApiUrl = import.meta.env.VITE_TTS_API_URL || 'https://tts.zhdnpx.cn';
    const audioBaseUrl = import.meta.env.VITE_AUDIO_BASE_URL || '';
    
    let url: string;
    
    // 如果配置了TTS API，使用实时生成
    if (ttsApiUrl) {
      url = `${ttsApiUrl}/tts/section/mp3?section_id=${sectionId}&voice=${voiceType}`;
      
      // iOS PWA 模式下添加时间戳避免缓存问题
      if (isIOSPWA()) {
        url += `&t=${Date.now()}`;
        console.log('[iOS PWA] 音频URL (带时间戳):', url);
      } else {
        console.log('[TTS API] 音频URL:', url);
      }
    } else {
      // 否则使用静态文件
      url = `${audioBaseUrl}/audio/sutras/dizang/sections/${sectionId}_${voiceType}.mp3`;
      console.log('[静态文件] 音频URL:', url);
    }
    
    return url;
  };

  // 当前播放的section索引
  const currentSectionIndex = useMemo(() => {
    if (!currentSectionId) return -1;
    return sections.findIndex(s => s.id === currentSectionId);
  }, [currentSectionId, sections]);

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
      const v = localStorage.getItem('sutra:chapterReader:loopAudio');
      if (v === '1') setLoopAudio(true);
      if (v === '0') setLoopAudio(false);
    } catch {
      // ignore
    }
  }, []);

  // 监听音色切换，重新加载当前播放的音频
  useEffect(() => {
    if (currentSectionId && isPlaying) {
      console.log('[音色切换] 重新加载音频，新音色:', voice);
      playSection(currentSectionId);
    }
  }, [voice]);

  useEffect(() => {
    try {
      localStorage.setItem('sutra:chapterReader:loopAudio', loopAudio ? '1' : '0');
    } catch {
      // ignore
    }
  }, [loopAudio]);

  useEffect(() => {
    try {
      localStorage.setItem('sutra:bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      // keep for backward compatibility
      localStorage.removeItem('sutra:chapterReader:showMenu');
    } catch {
      // ignore
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (!el) {
      console.warn('[滚动] 未找到元素:', sectionId);
      return;
    }

    // 获取元素当前位置
    const rect = el.getBoundingClientRect();
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 工具栏高度 + 安全边距
    const toolbarHeight = 56; // Ionic toolbar 默认高度
    const safePadding = 16; // 安全边距，确保内容不被遮挡
    const targetOffset = toolbarHeight + safePadding;
    
    // 计算目标滚动位置：元素顶部应该在工具栏下方
    const targetPosition = rect.top + currentScrollTop - targetOffset;
    
    console.log('[滚动] 段落:', sectionId);
    console.log('[滚动] 当前位置:', currentScrollTop);
    console.log('[滚动] 元素距顶部:', rect.top);
    console.log('[滚动] 目标位置:', targetPosition);
    
    // 执行滚动（确保不会滚动到负数位置）
    const finalPosition = Math.max(0, targetPosition);
    
    // 只有当目标位置与当前位置差异超过 10px 时才滚动
    if (Math.abs(finalPosition - currentScrollTop) > 10) {
      window.scrollTo({
        top: finalPosition,
        behavior: 'smooth'
      });
      console.log('[滚动] 执行滚动到:', finalPosition);
    } else {
      console.log('[滚动] 已在目标位置，无需滚动');
    }
  };

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  // 播放指定section的音频
  const playSection = async (sectionId: string) => {
    const audioUrl = getSectionAudioUrl(sectionId, voice);
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setCurrentSectionId(sectionId);
      setAudioError(undefined);
      
      console.log('[播放音频] 段落:', sectionId, '音色:', voice);
      console.log('[播放音频] URL:', audioUrl);
      
      // 立即滚动到段落（在音频加载之前）
      scrollToSection(sectionId);
      
      // 设置音频源
      audio.src = audioUrl;
      
      // 显式加载音频
      audio.load();
      
      // 等待音频可以播放
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('音频加载超时（10秒）'));
        }, 10000); // 10秒超时
        
        const onCanPlay = () => {
          clearTimeout(timeout);
          audio.removeEventListener('canplay', onCanPlay);
          audio.removeEventListener('error', onError);
          console.log('[播放音频] 加载成功，时长:', audio.duration, '秒');
          resolve();
        };
        
        const onError = () => {
          clearTimeout(timeout);
          audio.removeEventListener('canplay', onCanPlay);
          audio.removeEventListener('error', onError);
          const error = audio.error;
          const errorMsg = error 
            ? `错误代码 ${error.code}: ${error.message}` 
            : '未知错误';
          console.error('[播放音频] 加载失败:', errorMsg);
          reject(new Error(`音频加载失败: ${errorMsg}`));
        };
        
        audio.addEventListener('canplay', onCanPlay, { once: true });
        audio.addEventListener('error', onError, { once: true });
      });
      
      // 播放音频
      await audio.play();
      console.log('[播放音频] 开始播放');
    } catch (error) {
      console.error('[播放音频] 失败:', error);
      
      let errorMessage = '音频加载失败';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setAudioError(errorMessage);
      
      presentToast({
        message: `${errorMessage}\n段落: ${sectionId}`,
        duration: 3000,
        position: 'top',
        color: 'danger',
      });
    }
  };

  // 播放下一段
  const playNext = () => {
    if (currentSectionIndex < 0 || currentSectionIndex >= sections.length - 1) return;
    const nextSection = sections[currentSectionIndex + 1];
    if (nextSection) {
      playSection(nextSection.id);
    }
  };

  // 播放上一段
  const playPrevious = () => {
    if (currentSectionIndex <= 0) return;
    const prevSection = sections[currentSectionIndex - 1];
    if (prevSection) {
      playSection(prevSection.id);
    }
  };

  // 切换播放/暂停
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      if (currentSectionId) {
        audio.play();
      } else if (sections.length > 0) {
        // 如果没有当前section，从第一个开始播放
        playSection(sections[0].id);
      }
    } else {
      audio.pause();
    }
  };

  const renderMiniPlayer = () => {
    const hasAudio = sections.length > 0;
    const currentSection = currentSectionId ? sections.find(s => s.id === currentSectionId) : null;
    
    return (
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 5,
          paddingBottom: 8,
          background: 'var(--ion-background-color)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 8px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          {/* 播放/暂停按钮 */}
          <IonButton
            size="small"
            fill="clear"
            disabled={!hasAudio}
            style={{ width: 34, height: 34, minWidth: 34, '--padding-start': '0px', '--padding-end': '0px' } as any}
            onClick={togglePlayPause}
          >
            <img
              alt={voice === 'male' ? '男声' : '女声'}
              src={getVoiceAvatarSrc(voice)}
              style={{ width: 26, height: 26, borderRadius: 999, display: 'block' }}
            />
          </IonButton>

          {/* 上一段 */}
          <IonButton
            size="small"
            fill="clear"
            disabled={!hasAudio || currentSectionIndex <= 0}
            style={{ '--padding-start': '4px', '--padding-end': '4px' } as any}
            onClick={playPrevious}
          >
            <IonIcon slot="icon-only" icon={playSkipBack} />
          </IonButton>

          {/* 下一段 */}
          <IonButton
            size="small"
            fill="clear"
            disabled={!hasAudio || currentSectionIndex >= sections.length - 1}
            style={{ '--padding-start': '4px', '--padding-end': '4px' } as any}
            onClick={playNext}
          >
            <IonIcon slot="icon-only" icon={playSkipForward} />
          </IonButton>

          {/* 单段循环 */}
          <IonButton
            size="small"
            fill={loopAudio ? 'solid' : 'clear'}
            disabled={!hasAudio}
            color={loopAudio ? 'primary' : 'medium'}
            style={{ '--padding-start': '4px', '--padding-end': '4px' } as any}
            onClick={() => {
              setLoopAudio((v) => {
                const next = !v;
                if (next) setContinuousPlay(false); // 单段循环时关闭连续播放
                presentToast({
                  message: next ? '单段循环：已开启' : '单段循环：已关闭',
                  duration: 900,
                  position: 'top',
                });
                return next;
              });
            }}
          >
            <IonIcon slot="icon-only" icon={repeat} />
          </IonButton>

          {/* 当前播放信息 */}
          <div style={{ fontSize: 11, opacity: 0.7, whiteSpace: 'nowrap', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentSection ? currentSection.title || `段落 ${currentSectionIndex + 1}` : '未播放'}
          </div>

          <div style={{ fontSize: 12, opacity: 0.85, whiteSpace: 'nowrap' }}>
            {formatTime(audioCurrentTime)}
          </div>

          {/* 进度条 */}
          <div style={{ flex: 1, minWidth: 60, maxWidth: 120, paddingLeft: 8 }}>
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

          <div style={{ fontSize: 12, opacity: 0.85, whiteSpace: 'nowrap' }}>
            {formatTime(audioDuration)}
          </div>
        </div>
      </div>
    );
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
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      // 如果开启连续播放且不是循环模式，播放下一段
      if (continuousPlay && !loopAudio && currentSectionIndex >= 0 && currentSectionIndex < sections.length - 1) {
        playNext();
      }
    };
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
    el.addEventListener('ended', onEnded);
    el.addEventListener('error', onError);
    el.addEventListener('loadedmetadata', onLoadedMetadata);
    el.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('error', onError);
      el.removeEventListener('loadedmetadata', onLoadedMetadata);
      el.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [isSeeking, continuousPlay, loopAudio, currentSectionIndex, sections.length]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.loop = loopAudio;
  }, [loopAudio]);

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
        <IonHeader collapse="condense" style={{ background: 'var(--ion-background-color)' } as any}>
          <IonToolbar style={{ '--background': 'var(--ion-background-color)' } as any}>
            <IonTitle size="large">{chapter?.title ?? '章节阅读'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonToolbar style={{ 
          '--min-height': '48px', 
          '--background': 'var(--ion-background-color)',
          fontSize: 14 
        } as any}>
          <IonButtons slot="start">
            <IonButton size="small" fill="clear" onClick={() => setFontSize((s) => Math.max(14, s - 1))}>
              <IonIcon slot="icon-only" icon={remove} />
            </IonButton>
            <IonButton size="small" fill="clear" onClick={() => setFontSize((s) => Math.min(24, s + 1))}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
            <IonButton size="small" fill="clear" onClick={() => setShowChapterPicker(true)}>
              <IonIcon slot="icon-only" icon={list} />
            </IonButton>
          </IonButtons>

          <div
            slot="end"
            style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap', fontSize: 14 }}
          >
            <IonButton
              size="small"
              fill="clear"
              color={showPinyinAbove ? 'primary' : undefined}
              onClick={() => setShowPinyinAbove((v) => !v)}
            >
              <IonIcon slot="icon-only" icon={eye} />
            </IonButton>
            <IonButton
              size="small"
              fill="clear"
              color={reciteMode ? 'primary' : undefined}
              onClick={() => {
                setReciteMode((v) => {
                  const next = !v;
                  if (!next) setRevealedIds({});
                  return next;
                });
              }}
            >
              <IonIcon slot="icon-only" icon={school} />
            </IonButton>
            <IonSelect value={voice} interface="popover" style={{ fontSize: 14, minWidth: 74 } as any} onIonChange={(e) => setVoice(e.detail.value as VoiceId)}>
              <IonSelectOption value="male">男声</IonSelectOption>
              <IonSelectOption value="female">女声</IonSelectOption>
            </IonSelect>
          </div>
        </IonToolbar>

        <audio ref={audioRef} preload="none" />

        <div style={{ 
          padding: 12, 
          display: 'flex', 
          gap: 8, 
          flexWrap: 'wrap',
          background: 'var(--ion-background-color)',
        }}>
          <IonChip color={showText ? 'primary' : undefined} onClick={() => setShowText((v) => !v)}>
            <IonLabel>经文</IonLabel>
          </IonChip>
          <IonChip color={showMeaning ? 'primary' : undefined} onClick={() => setShowMeaning((v) => !v)}>
            <IonLabel>白话</IonLabel>
          </IonChip>
          <IonChip color={continuousPlay ? 'primary' : undefined} onClick={() => {
            setContinuousPlay((v) => {
              const next = !v;
              if (next && loopAudio) setLoopAudio(false); // 连续播放时关闭单段循环
              presentToast({
                message: next ? '连续播放：已开启' : '连续播放：已关闭',
                duration: 900,
                position: 'top',
              });
              return next;
            });
          }}>
            <IonLabel>连续播放</IonLabel>
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
              <>
                {renderMiniPlayer()}
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
                        <div style={{ position: 'absolute', top: 6, right: 6, zIndex: 2, display: 'flex', gap: 4 }}>
                          {/* 播放按钮 */}
                          <IonButton
                            fill={currentSectionId === s.id && isPlaying ? 'solid' : 'clear'}
                            color={currentSectionId === s.id ? 'primary' : 'medium'}
                            size="small"
                            style={{ '--padding-start': '6px', '--padding-end': '6px' } as any}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (currentSectionId === s.id && isPlaying) {
                                audioRef.current?.pause();
                              } else {
                                playSection(s.id);
                              }
                            }}
                          >
                            <IonIcon slot="icon-only" icon={currentSectionId === s.id && isPlaying ? pause : play} />
                          </IonButton>
                          {/* 收藏按钮 */}
                          <IonButton
                            fill="clear"
                            size="small"
                            style={{ '--padding-start': '6px', '--padding-end': '6px' } as any}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleBookmark(s.id, s.title);
                            }}
                          >
                            <IonIcon slot="icon-only" icon={isBookmarked(s.id) ? star : starOutline} />
                          </IonButton>
                        </div>
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
              </>
            )}
          </div>
        </div>

        <IonModal isOpen={showChapterPicker} onDidDismiss={() => setShowChapterPicker(false)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowChapterPicker(false)}>关闭</IonButton>
              </IonButtons>
              <IonTitle>切换章节</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList inset>
              {chapters.map((c) => (
                <IonItem
                  key={`pick-${c.id}`}
                  routerLink={`/sutra/dizang/${c.id}`}
                  detail={false}
                  color={c.id === chapterId ? 'primary' : undefined}
                  onClick={() => setShowChapterPicker(false)}
                >
                  <IonLabel className="ion-text-wrap">{c.title}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default SutraChapterReader;
