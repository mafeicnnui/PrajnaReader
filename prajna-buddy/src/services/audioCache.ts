import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

const PREF_NAMESPACE = 'audio_cache_v1:';

function prefKey(key: string): string {
  return `${PREF_NAMESPACE}${key}`;
}

function isNative(): boolean {
  return Capacitor.isNativePlatform();
}

async function arrayBufferToBase64(buf: ArrayBuffer): Promise<string> {
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export async function getCachedAudioSrc(cacheKey: string): Promise<string | undefined> {
  if (!isNative()) return undefined;

  const { value } = await Preferences.get({ key: prefKey(cacheKey) });
  if (!value) return undefined;

  try {
    const uri = await Filesystem.getUri({ directory: Directory.Cache, path: value });
    return Capacitor.convertFileSrc(uri.uri);
  } catch {
    await Preferences.remove({ key: prefKey(cacheKey) });
    return undefined;
  }
}

export async function cacheAudio(cacheKey: string, remoteUrl: string): Promise<string> {
  if (!isNative()) return remoteUrl;

  const existing = await getCachedAudioSrc(cacheKey);
  if (existing) return existing;

  const res = await fetch(remoteUrl);
  if (!res.ok) {
    throw new Error(`Failed to download audio: ${res.status} ${res.statusText}`);
  }

  const buf = await res.arrayBuffer();
  const base64 = await arrayBufferToBase64(buf);

  const safeKey = cacheKey.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filename = `${safeKey}.mp3`;
  const path = `prajna-audio/${filename}`;

  await Filesystem.writeFile({
    directory: Directory.Cache,
    path,
    data: base64,
    recursive: true,
  });

  await Preferences.set({ key: prefKey(cacheKey), value: path });

  const uri = await Filesystem.getUri({ directory: Directory.Cache, path });
  return Capacitor.convertFileSrc(uri.uri);
}

export async function clearCachedAudio(cacheKey: string): Promise<void> {
  if (!isNative()) return;
  const { value } = await Preferences.get({ key: prefKey(cacheKey) });
  if (value) {
    try {
      await Filesystem.deleteFile({ directory: Directory.Cache, path: value });
    } catch {
      // ignore
    }
  }
  await Preferences.remove({ key: prefKey(cacheKey) });
}
