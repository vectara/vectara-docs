---
id: vectara-and-speechmatics
title: Vectara and Speechmatics
sidebar_label: Vectara and Speechmatics
---

Speechmatics provides real-time speech-to-text transcription with low latency 
in more than 55 languages. By combining Vectara's RAG capabilities and the 
LiveKit voice agent framework, you can build conversational AI assistants with 
enterprise-grade accuracy.

## Integration benefits

* Enables real-time voice interactions with your Vectara corpora.
* Provides low latency (less than 1 second) speech-to-text transcription 
  in 55+ languages.
* Leverages LiveKit's open-source agent framework for seamless voice 
  agent orchestration.
* Supports flexible deployment options: cloud, on-premises, or on-device.

## Architecture

The integration combines three key components:

1. **Speechmatics** - Real-time speech-to-text transcription and 
   text-to-speech (TTS) for agent response.
2. **Vectara** - Knowledge retrieval and RAG-powered responses.
3. **LiveKit** - Voice agent orchestration and audio streaming.

## Getting started

To build your own voice agent with Vectara and Speechmatics:

1. **Set up LiveKit** - Follow the [LiveKit Agents quickstart](https://docs.livekit.io/agents/quickstart/).
2. **Configure Speechmatics** - Add your Speechmatics API key for real-time STT.
3. **Connect Vectara** - Integrate Vectara's query API for knowledge retrieval.
4. **Add text-to-speech (TTS)** - Choose a text-to-speech provider such as Speechmatics or 
   ElevenLabs.

