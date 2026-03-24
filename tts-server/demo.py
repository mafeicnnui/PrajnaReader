import asyncio
import edge_tts

async def tts_demo():
    # 要转换的文本
    text = "你好，这是一个使用 edge_tts 合成的普通男声示例。"

    # 选择一个普通男声（以中文为例）
    # 常用男声示例：zh-CN-YunxiNeural / zh-CN-YunjianNeural / zh-CN-YunyangNeural
    voice = "zh-CN-YunxiNeural"

    # 输出文件名
    output_file = "demo_male_voice.mp3"

    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_file)
    print(f"已生成语音文件：{output_file}")

if __name__ == "__main__":
    asyncio.run(tts_demo())
