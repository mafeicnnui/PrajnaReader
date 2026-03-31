import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: '般若阅读',
  webDir: 'dist',
  server: {
    // 允许访问外部URL
    allowNavigation: [
      'https://tts.zhdnpx.cn',
      'https://app.zhdnpx.cn'
    ],
    // iOS需要明确允许HTTP请求（如果有的话）
    cleartext: true
  },
  ios: {
    // 配置内容安全策略
    contentInset: 'always',
    // 允许内联播放
    allowsInlineMediaPlayback: true,
    // 配置scheme
    scheme: 'https'
  }
};

export default config;
