---
id: onprem-evaluation-process
title: Private deployment evaluation process
sidebar_label: Evaluation process
---

import CodePanel from '@site/src/theme/CodePanel';

Ready to deploy Vectara in your infrastructure? [Contact us](https://www.vectara.com/contact-us) to get started.

## Deployment process overview

Here's how we get Vectara running in your environment:

```mermaid
flowchart LR
    Start([Contact Vectara]) --> A[Initial Assessment]
    A --> B[Solution Design]
    B --> C{Proof of Concept<br/><em>optional</em>}
    C --> D[Full Deployment]
    D --> E[Ongoing Partnership]
    
    B -.-> D
    
    classDef start fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    classDef process fill:#f9f9f9,stroke:#333,stroke-width:2px
    classDef optional fill:#e8f5e8,stroke:#4caf50,stroke-width:2px,stroke-dasharray: 5 5
    classDef ongoing fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    
    class Start start
    class A,B,D process
    class C optional
    class E ongoing
```

### 1. Initial assessment

Quick call to understand what you need:

- What are you building?
- How much data?
- What's your stack?
- Compliance requirements?
- When do you need it?

### 2. Solution design

We size it right:

- **Architecture**: Nodes, GPUs, storage requirements
- **Integration map**: How we plug into your auth, models, monitoring
- **Deployment package**: Terraform or Helm, your choice
- **Clear timeline**: From kickoff to production

### 3. Proof of concept (optional)

For qualified organizations, we offer:

- **Limited scope deployment**: Test Vectara with a subset of your data
- **Performance validation**: Verify performance meets your requirements
- **Integration testing**: Validate compatibility with your systems
- **User acceptance testing**: Allow key stakeholders to evaluate the solution
- **ROI assessment**: Measure potential business impact

### 4. Full deployment

Once you're ready to proceed:

- **Professional installation**: Our team guides you through the deployment process
- **Configuration and setup**: Optimize settings for your specific requirements
- **Integration support**: Connect with your authentication, monitoring, and other systems
- **Testing and validation**: Comprehensive testing to ensure everything works correctly
- **Go-live support**: Assistance during the transition to production

### 5. Ongoing partnership

After deployment, we provide:

- **Regular updates**: Security patches and feature updates
- **Technical support**: Ongoing support for any issues or questions
- **Best practices guidance**: Optimization recommendations and usage patterns
- **Training**: Ensure your team can effectively manage and use the platform
