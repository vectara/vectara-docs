---
id: open-eval-framework
title: Vectara Open Eval Framework
sidebar_label: Open Eval Framework
---

import {vars} from '@site/static/variables.json';
import CodePanel from '@site/src/theme/CodePanel';

The [Vectara Open RAG Eval framework](https://github.com/vectara/open-rag-eval) is an open-source Python 
toolkit that helps developers evaluate and optimize their Retrieval-Augmented 
Generation (RAG) pipelines. This framework addresses a critical need for 
systematic RAG evaluation and optimization, enabling you to find the best 
model configurations and settings for your specific use cases.

## Why RAG evaluation is important

Traditional approaches to RAG optimization leave developers 
guessing about which models, parameters, and configurations work best for 
their applications. The Open Eval framework provides data-driven insights to 
help you:

- **Optimize model selection** for specific use cases and datasets
- **Fine-tune RAG parameters** based on measurable performance metrics  
- **Compare different configurations** systematically
- **Validate improvements** before deploying to production

Here are the key features of the Vectara Open RAG Eval framework:

### Flexible evaluation metrics

- Standard metrics from TREC-RAG benchmark
- No requirement for "golden chunks" or "golden answers"
- Research-backed techniques from University of Waterloo
- Support for custom metric integration

### Multi-platform support

- **Vectara** integration (native support)
- **LlamaIndex** compatibility
- **LangChain** compatibility
- Extensible architecture for other RAG platforms

### Comprehensive analysis

- Per-query scoring and detailed analysis
- Multiple evaluation metrics including:
  - UMBRELA
  - AutoNuggetizer  
  - BERT Score
  - ROUGE-L
  - Consistency evaluation across generations

### Visualization tools

- Web-based evaluation viewer at [openevaluation.ai](https://openevaluation.ai)
- Command-line plotting capabilities
- Streamlit local viewer for interactive analysis

## Solve model selection challenges

The framework directly addresses the question: `"How do I know which model 
and settings work best for my use case?"`

### Before Open Eval: trial and error

- Guessing optimal model configurations
- No systematic comparison method
- Difficulty validating improvements
- Black box optimization

### With Open Eval: data-driven optimization

- Systematic evaluation across models and parameters
- Quantifiable performance metrics
- Clear comparison between configurations
- Evidence-based decision making

## Best Practices

### Dataset creation
- Include representative queries from your actual use case
- Cover edge cases and common scenarios  
- Ensure diversity in query complexity and topics
- Validate dataset quality before evaluation

### Configuration testing
- Test systematically, changing one parameter at a time
- Include baseline configurations for comparison
- Document all tested configurations
- Consider cost vs. performance trade-offs

### Results analysis
- Look beyond single metrics - use multiple evaluation criteria
- Consider statistical significance of results
- Validate findings with real user feedback when possible
- Monitor production performance after optimization

### Continuous improvement
- Re-evaluate periodically as your dataset evolves
- Test new models and presets as they become available
- Update evaluation queries based on user feedback
- Maintain evaluation history for trend analysis

## Related resources

- **[GitHub repository](https://github.com/vectara/open-rag-eval)**: Complete source code and documentation
- **[OpenEvaluation.ai](https://openevaluation.ai)**: Interactive evaluation results viewer  
- **[Model selection guide](/docs/learn/grounded-generation/model-selection)**: Use evaluation results to inform model choices
- **[Query observability](/docs/hallucination-and-evaluation/query-observability)**: Monitor production performance of optimized configurations

The Open Eval framework transforms RAG optimization from guesswork into a 
systematic, data-driven process. By providing quantifiable metrics and 
comparison capabilities, it enables you to confidently select the best model 
configurations for your specific applications and use cases.
