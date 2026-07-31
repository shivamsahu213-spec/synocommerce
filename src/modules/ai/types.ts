/**
 * Enterprise AI Commerce Platform Type Definitions
 * @module modules/ai/types
 */

export type AiProviderType = 'OPENAI' | 'ANTHROPIC' | 'GEMINI' | 'AZURE_OPENAI' | 'OLLAMA';

export interface AiPromptRequest {
  provider?: AiProviderType | undefined;
  model?: string | undefined;
  prompt: string;
  temperature?: number | undefined;
  maxTokens?: number | undefined;
}

export interface AiPromptResponse {
  provider: AiProviderType;
  model: string;
  content: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUsd: number;
}

export interface RecommendationRequest {
  sku: string;
  category?: string | undefined;
  limit?: number | undefined;
}

export interface RecommendationResult {
  sku: string;
  recommendedSku: string;
  score: number;
  reason: string;
}

export interface VectorSearchQuery {
  term: string;
  embeddingVector?: number[] | undefined;
  topK?: number | undefined;
}
